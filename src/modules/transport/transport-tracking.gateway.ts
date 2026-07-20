import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from '../../common/types/jwt-payload.interface';
import { TransportGpsPing } from './entities/transport-gps-ping.entity';

function tripRoom(tripId: string): string {
  return `trip:${tripId}`;
}

/** Tracking en tiempo real (§4.4.5 "Tracking GPS", §6.6 paso 6 "Ejecutar viaje y tracking"). */
@Injectable()
@WebSocketGateway({ namespace: '/tracking', cors: { origin: '*' } })
export class TransportTrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(TransportTrackingGateway.name);

  @WebSocketServer()
  private readonly server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  handleConnection(client: Socket): void {
    const token = this.extractToken(client);
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>('jwt.accessSecret'),
      });
      const tripId = client.handshake.query.tripId as string | undefined;
      if (tripId) {
        void client.join(tripRoom(tripId));
      }
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    this.logger.debug(`Cliente desconectado: ${client.id}`);
  }

  emitPing(ping: TransportGpsPing): void {
    this.server?.to(tripRoom(ping.tripId)).emit('gps-ping', ping);
  }

  emitMilestone(tripId: string, payload: unknown): void {
    this.server?.to(tripRoom(tripId)).emit('milestone', payload);
  }

  private extractToken(client: Socket): string | undefined {
    const authToken = client.handshake.auth?.token as string | undefined;
    if (authToken) {
      return authToken;
    }
    const header = client.handshake.headers.authorization;
    return header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  }
}

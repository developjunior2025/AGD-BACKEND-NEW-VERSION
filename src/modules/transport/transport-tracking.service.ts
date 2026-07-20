import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportGpsPing } from './entities/transport-gps-ping.entity';
import { TransportGeofence } from './entities/transport-geofence.entity';
import { TransportTrip } from './entities/transport-trip.entity';
import { TransportTrackingGateway } from './transport-tracking.gateway';
import { CreateGeofenceDto, RecordGpsPingDto } from './dto/tracking.dto';

@Injectable()
export class TransportTrackingService {
  constructor(
    @InjectRepository(TransportGpsPing)
    private readonly gpsPingRepository: Repository<TransportGpsPing>,
    @InjectRepository(TransportGeofence)
    private readonly geofenceRepository: Repository<TransportGeofence>,
    @InjectRepository(TransportTrip)
    private readonly tripRepository: Repository<TransportTrip>,
    private readonly trackingGateway: TransportTrackingGateway,
  ) {}

  async recordPing(
    tripId: string,
    dto: RecordGpsPingDto,
  ): Promise<TransportGpsPing> {
    const trip = await this.tripRepository.findOne({ where: { id: tripId } });
    if (!trip) {
      throw new NotFoundException(`Viaje ${tripId} no encontrado.`);
    }

    const ping = await this.gpsPingRepository.save(
      this.gpsPingRepository.create({ ...dto, tripId, recordedAt: new Date() }),
    );

    this.trackingGateway.emitPing(ping);

    return ping;
  }

  listPingsForTrip(tripId: string): Promise<TransportGpsPing[]> {
    return this.gpsPingRepository.find({
      where: { tripId },
      order: { recordedAt: 'ASC' },
    });
  }

  createGeofence(dto: CreateGeofenceDto): Promise<TransportGeofence> {
    return this.geofenceRepository.save(this.geofenceRepository.create(dto));
  }

  findAllGeofences(): Promise<TransportGeofence[]> {
    return this.geofenceRepository.find();
  }
}

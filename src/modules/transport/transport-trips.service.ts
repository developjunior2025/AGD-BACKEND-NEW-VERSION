import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportOrder } from './entities/transport-order.entity';
import { TransportTrip } from './entities/transport-trip.entity';
import { TransportTripAssignment } from './entities/transport-trip-assignment.entity';
import { TransportRoute } from './entities/transport-route.entity';
import { TransportRouteStop } from './entities/transport-route-stop.entity';
import { TransportMilestone } from './entities/transport-milestone.entity';
import { TransportVehicle } from './entities/transport-vehicle.entity';
import {
  TripMilestoneStatus,
  TripStatus,
  TransportOrderStatus,
  VehicleStatus,
} from './enums/transport.enums';
import { CreateTransportOrderDto } from './dto/order.dto';
import {
  AddRouteStopDto,
  AddTripMilestoneDto,
  AssignTripDto,
  CreateRouteDto,
} from './dto/trip.dto';

const DETAIL_RELATIONS = {
  route: { stops: true },
  milestones: true,
  incidents: true,
  proofOfDelivery: true,
  settlement: true,
  closure: true,
} as const;

@Injectable()
export class TransportTripsService {
  constructor(
    @InjectRepository(TransportOrder)
    private readonly orderRepository: Repository<TransportOrder>,
    @InjectRepository(TransportTrip)
    private readonly tripRepository: Repository<TransportTrip>,
    @InjectRepository(TransportTripAssignment)
    private readonly assignmentRepository: Repository<TransportTripAssignment>,
    @InjectRepository(TransportRoute)
    private readonly routeRepository: Repository<TransportRoute>,
    @InjectRepository(TransportRouteStop)
    private readonly routeStopRepository: Repository<TransportRouteStop>,
    @InjectRepository(TransportMilestone)
    private readonly milestoneRepository: Repository<TransportMilestone>,
    @InjectRepository(TransportVehicle)
    private readonly vehicleRepository: Repository<TransportVehicle>,
  ) {}

  createOrder(
    clientId: string,
    dto: CreateTransportOrderDto,
  ): Promise<TransportOrder> {
    return this.orderRepository.save(
      this.orderRepository.create({ ...dto, clientId }),
    );
  }

  listOrdersForClient(clientId: string): Promise<TransportOrder[]> {
    return this.orderRepository.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOrder(id: string): Promise<TransportOrder> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { trips: true },
    });
    if (!order) {
      throw new NotFoundException(`Orden de transporte ${id} no encontrada.`);
    }
    return order;
  }

  async createTrip(orderId: string): Promise<TransportTrip> {
    await this.findOrder(orderId);
    return this.tripRepository.save(this.tripRepository.create({ orderId }));
  }

  async findTrip(id: string): Promise<TransportTrip> {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: DETAIL_RELATIONS,
    });
    if (!trip) {
      throw new NotFoundException(`Viaje ${id} no encontrado.`);
    }
    return trip;
  }

  /** Asigna unidad y conductor al viaje (§6.6 pasos 2-3) y marca la orden como asignada. */
  async assignTrip(
    tripId: string,
    assignedBy: string,
    dto: AssignTripDto,
  ): Promise<TransportTrip> {
    const trip = await this.findTrip(tripId);
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: dto.vehicleId },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehículo ${dto.vehicleId} no encontrado.`);
    }
    if (vehicle.status !== VehicleStatus.DISPONIBLE) {
      throw new BadRequestException('El vehículo no está disponible.');
    }

    trip.vehicleId = dto.vehicleId;
    trip.driverId = dto.driverId;
    const saved = await this.tripRepository.save(trip);

    await this.assignmentRepository.save(
      this.assignmentRepository.create({
        tripId,
        vehicleId: dto.vehicleId,
        driverId: dto.driverId,
        assignedBy,
        assignedAt: new Date(),
      }),
    );

    vehicle.status = VehicleStatus.EN_USO;
    await this.vehicleRepository.save(vehicle);

    await this.orderRepository.update(
      { id: trip.orderId },
      { status: TransportOrderStatus.ASIGNADA },
    );

    return saved;
  }

  async startTrip(id: string): Promise<TransportTrip> {
    const trip = await this.findTrip(id);
    if (!trip.vehicleId || !trip.driverId) {
      throw new BadRequestException(
        'El viaje necesita unidad y conductor asignados para iniciar.',
      );
    }
    trip.status = TripStatus.EN_CURSO;
    trip.startedAt = new Date();
    const saved = await this.tripRepository.save(trip);
    await this.orderRepository.update(
      { id: trip.orderId },
      { status: TransportOrderStatus.EN_EJECUCION },
    );
    return saved;
  }

  async endTrip(id: string): Promise<TransportTrip> {
    const trip = await this.findTrip(id);
    trip.status = TripStatus.COMPLETADO;
    trip.endedAt = new Date();
    const saved = await this.tripRepository.save(trip);

    if (trip.vehicleId) {
      await this.vehicleRepository.update(
        { id: trip.vehicleId },
        { status: VehicleStatus.DISPONIBLE },
      );
    }
    await this.orderRepository.update(
      { id: trip.orderId },
      { status: TransportOrderStatus.COMPLETADA },
    );

    return saved;
  }

  async createRoute(
    tripId: string,
    dto: CreateRouteDto,
  ): Promise<TransportRoute> {
    await this.findTrip(tripId);
    return this.routeRepository.save(
      this.routeRepository.create({ ...dto, tripId }),
    );
  }

  async addRouteStop(
    routeId: string,
    dto: AddRouteStopDto,
  ): Promise<TransportRouteStop> {
    const route = await this.routeRepository.findOne({
      where: { id: routeId },
    });
    if (!route) {
      throw new NotFoundException(`Hoja de ruta ${routeId} no encontrada.`);
    }
    return this.routeStopRepository.save(
      this.routeStopRepository.create({ ...dto, routeId }),
    );
  }

  async completeRouteStop(id: string): Promise<TransportRouteStop> {
    const stop = await this.routeStopRepository.findOne({ where: { id } });
    if (!stop) {
      throw new NotFoundException(`Parada de ruta ${id} no encontrada.`);
    }
    stop.actualAt = new Date();
    return this.routeStopRepository.save(stop);
  }

  async addMilestone(
    tripId: string,
    dto: AddTripMilestoneDto,
  ): Promise<TransportMilestone> {
    await this.findTrip(tripId);
    return this.milestoneRepository.save(
      this.milestoneRepository.create({ ...dto, tripId }),
    );
  }

  async completeMilestone(id: string): Promise<TransportMilestone> {
    const milestone = await this.milestoneRepository.findOne({ where: { id } });
    if (!milestone) {
      throw new NotFoundException(`Hito ${id} no encontrado.`);
    }
    milestone.status = TripMilestoneStatus.CUMPLIDO;
    milestone.occurredAt = new Date();
    return this.milestoneRepository.save(milestone);
  }
}

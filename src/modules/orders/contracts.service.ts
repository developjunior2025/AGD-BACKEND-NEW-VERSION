import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketplaceContract } from './entities/marketplace-contract.entity';
import { ContractMilestone } from './entities/contract-milestone.entity';
import { ContractGuarantee } from './entities/contract-guarantee.entity';
import { LogisticsOrder } from './entities/logistics-order.entity';
import { ContractStatus, MilestoneStatus } from './enums/order.enums';
import { CreateContractDto } from './dto/create-contract.dto';
import {
  AddGuaranteeDto,
  AddMilestoneDto,
} from './dto/milestone-guarantee.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(MarketplaceContract)
    private readonly contractRepository: Repository<MarketplaceContract>,
    @InjectRepository(ContractMilestone)
    private readonly milestoneRepository: Repository<ContractMilestone>,
    @InjectRepository(ContractGuarantee)
    private readonly guaranteeRepository: Repository<ContractGuarantee>,
    @InjectRepository(LogisticsOrder)
    private readonly orderRepository: Repository<LogisticsOrder>,
  ) {}

  async create(
    logisticsOrderId: string,
    dto: CreateContractDto,
  ): Promise<MarketplaceContract> {
    const order = await this.orderRepository.findOne({
      where: { id: logisticsOrderId },
    });
    if (!order) {
      throw new NotFoundException(`Orden ${logisticsOrderId} no encontrada.`);
    }
    return this.contractRepository.save(
      this.contractRepository.create({ ...dto, logisticsOrderId }),
    );
  }

  async findOne(id: string): Promise<MarketplaceContract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: { milestones: true, guarantees: true },
    });
    if (!contract) {
      throw new NotFoundException(`Contrato ${id} no encontrado.`);
    }
    return contract;
  }

  async activate(id: string): Promise<MarketplaceContract> {
    const contract = await this.findOne(id);
    if (contract.status !== ContractStatus.BORRADOR) {
      throw new BadRequestException(
        'Solo se puede activar un contrato en borrador.',
      );
    }
    contract.status = ContractStatus.VIGENTE;
    return this.contractRepository.save(contract);
  }

  async finalize(id: string): Promise<MarketplaceContract> {
    const contract = await this.findOne(id);
    if (contract.status !== ContractStatus.VIGENTE) {
      throw new BadRequestException(
        'Solo se puede finalizar un contrato vigente.',
      );
    }
    contract.status = ContractStatus.FINALIZADO;
    return this.contractRepository.save(contract);
  }

  async rescind(id: string): Promise<MarketplaceContract> {
    const contract = await this.findOne(id);
    if (contract.status !== ContractStatus.VIGENTE) {
      throw new BadRequestException(
        'Solo se puede rescindir un contrato vigente.',
      );
    }
    contract.status = ContractStatus.RESCINDIDO;
    return this.contractRepository.save(contract);
  }

  async addMilestone(
    contractId: string,
    dto: AddMilestoneDto,
  ): Promise<ContractMilestone> {
    await this.findOne(contractId);
    return this.milestoneRepository.save(
      this.milestoneRepository.create({ ...dto, contractId }),
    );
  }

  async completeMilestone(milestoneId: string): Promise<ContractMilestone> {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: milestoneId },
    });
    if (!milestone) {
      throw new NotFoundException(`Hito ${milestoneId} no encontrado.`);
    }
    milestone.status = MilestoneStatus.COMPLETADO;
    milestone.completedAt = new Date();
    return this.milestoneRepository.save(milestone);
  }

  async addGuarantee(
    contractId: string,
    dto: AddGuaranteeDto,
  ): Promise<ContractGuarantee> {
    await this.findOne(contractId);
    return this.guaranteeRepository.save(
      this.guaranteeRepository.create({ ...dto, contractId }),
    );
  }
}

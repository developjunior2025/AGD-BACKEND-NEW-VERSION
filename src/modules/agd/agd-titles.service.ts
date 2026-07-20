import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgdDepositCertificate } from './entities/agd-deposit-certificate.entity';
import { AgdPledgeBond } from './entities/agd-pledge-bond.entity';
import { AgdTitleEndorsement } from './entities/agd-title-endorsement.entity';
import { AgdTitleValidity } from './entities/agd-title-validity.entity';
import { TitleStatus, TitleType } from './enums/agd.enums';
import {
  AddEndorsementDto,
  IssueCertificateDto,
  IssuePledgeBondDto,
  SetValidityDto,
} from './dto/title.dto';

@Injectable()
export class AgdTitlesService {
  constructor(
    @InjectRepository(AgdDepositCertificate)
    private readonly certificateRepository: Repository<AgdDepositCertificate>,
    @InjectRepository(AgdPledgeBond)
    private readonly bondRepository: Repository<AgdPledgeBond>,
    @InjectRepository(AgdTitleEndorsement)
    private readonly endorsementRepository: Repository<AgdTitleEndorsement>,
    @InjectRepository(AgdTitleValidity)
    private readonly validityRepository: Repository<AgdTitleValidity>,
  ) {}

  issueCertificate(
    lotId: string,
    dto: IssueCertificateDto,
  ): Promise<AgdDepositCertificate> {
    return this.certificateRepository.save(
      this.certificateRepository.create({
        ...dto,
        lotId,
        issuedAt: new Date(),
      }),
    );
  }

  findCertificate(id: string): Promise<AgdDepositCertificate | null> {
    return this.certificateRepository.findOne({ where: { id } });
  }

  listCertificatesForLot(lotId: string): Promise<AgdDepositCertificate[]> {
    return this.certificateRepository.find({ where: { lotId } });
  }

  issuePledgeBond(
    lotId: string,
    dto: IssuePledgeBondDto,
  ): Promise<AgdPledgeBond> {
    return this.bondRepository.save(
      this.bondRepository.create({ ...dto, lotId, issuedAt: new Date() }),
    );
  }

  listBondsForLot(lotId: string): Promise<AgdPledgeBond[]> {
    return this.bondRepository.find({ where: { lotId } });
  }

  async addEndorsement(
    endorsedBy: string,
    dto: AddEndorsementDto,
  ): Promise<AgdTitleEndorsement> {
    const endorsement = await this.endorsementRepository.save(
      this.endorsementRepository.create({
        ...dto,
        endorsedBy,
        endorsedAt: new Date(),
      }),
    );

    await this.markTitleStatus(
      dto.titleType,
      dto.titleId,
      TitleStatus.ENDOSADO,
    );

    return endorsement;
  }

  listEndorsements(titleId: string): Promise<AgdTitleEndorsement[]> {
    return this.endorsementRepository.find({
      where: { titleId },
      order: { endorsedAt: 'DESC' },
    });
  }

  setValidity(dto: SetValidityDto): Promise<AgdTitleValidity> {
    return this.validityRepository.save(this.validityRepository.create(dto));
  }

  async release(titleType: TitleType, titleId: string): Promise<void> {
    await this.markTitleStatus(titleType, titleId, TitleStatus.LIBERADO);
    await this.validityRepository.update(
      { titleType, titleId },
      { status: TitleStatus.LIBERADO },
    );
  }

  private async markTitleStatus(
    titleType: TitleType,
    titleId: string,
    status: TitleStatus,
  ): Promise<void> {
    if (titleType === TitleType.CERTIFICADO) {
      const certificate = await this.certificateRepository.findOne({
        where: { id: titleId },
      });
      if (!certificate) {
        throw new NotFoundException(`Certificado ${titleId} no encontrado.`);
      }
      certificate.status = status;
      await this.certificateRepository.save(certificate);
      return;
    }

    const bond = await this.bondRepository.findOne({ where: { id: titleId } });
    if (!bond) {
      throw new NotFoundException(`Bono ${titleId} no encontrado.`);
    }
    bond.status = status;
    await this.bondRepository.save(bond);
  }
}

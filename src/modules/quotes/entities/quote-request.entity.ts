import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { QuoteRequestStatus } from '../enums/quote.enums';
import { QuoteRequestItem } from './quote-request-item.entity';
import { Opportunity } from './opportunity.entity';

/** quote_requests (§9.2 / §4.1 "Solicitar cotización"): RFQ del cliente. */
@Entity('quote_requests')
export class QuoteRequest extends BaseAuditEntity {
  @Index()
  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  categoryId: string | null;

  @Column({ name: 'logistics_service_id', type: 'uuid', nullable: true })
  logisticsServiceId: string | null;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'desired_start_date', type: 'date', nullable: true })
  desiredStartDate: string | null;

  @Column({ name: 'desired_end_date', type: 'date', nullable: true })
  desiredEndDate: string | null;

  @Column({
    type: 'enum',
    enum: QuoteRequestStatus,
    default: QuoteRequestStatus.ABIERTA,
  })
  status: QuoteRequestStatus;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date | null;

  @OneToMany(() => QuoteRequestItem, (item) => item.quoteRequest)
  items: QuoteRequestItem[];

  @OneToMany(() => Opportunity, (opportunity) => opportunity.quoteRequest)
  opportunities: Opportunity[];
}

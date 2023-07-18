import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type TSubscriptionEntity = {
  id: number;
  userID: number;
  interval?: string;
  time?: Date;
}

@Entity('subscruptions')
class SubscriptionEntity implements TSubscriptionEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column() userID!: number;

  @Column({ type: 'text', nullable: true }) interval!: string;

  @Column({ type: 'timestamptz', nullable: true }) time!: Date;
}

export { SubscriptionEntity };

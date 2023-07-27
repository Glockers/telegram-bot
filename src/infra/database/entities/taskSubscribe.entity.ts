import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

export interface ITaskSubscribeEntity {
  id: number;
  userID: number;
  taskEntity: TaskEntity;
  time: Date;
}

@Entity('task_subscriptions')
class TaskSubscribeEntity implements ITaskSubscribeEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column() userID!: number;

  @ManyToOne(() => TaskEntity, task => task.id)
  public taskEntity!: TaskEntity;

  @Column({ type: 'timestamptz' }) time!: Date;
}

export { TaskSubscribeEntity };

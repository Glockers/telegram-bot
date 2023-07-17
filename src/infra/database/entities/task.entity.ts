import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type TTaskEntity = {
  id: number;
  userID: number;
  title: string,
  description: string
}

@Entity('tasks')
class TaskEntity implements TTaskEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column() userID!: number;

  @Column({ type: 'text' }) title!: string;

  @Column({ type: 'text' }) description!: string;
}

export { TaskEntity };

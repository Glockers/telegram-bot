import { Repository } from 'typeorm';
import { ITaskEntity, TaskEntity } from '../entities/task.entity';
import { postgresDataSource } from '../typeorm';
import { IAddTask } from 'bot/scenes/task/task.interface';
import { injectable } from 'inversify';

export type TAddTask = Omit<ITaskEntity, 'id'>;

export type TFindTaskById = Pick<ITaskEntity, 'id'>;

@injectable()
export class TaskRepository {
  private repository: Repository<ITaskEntity>;

  constructor() {
    this.repository = postgresDataSource.getRepository(TaskEntity);
  }

  async add(data: IAddTask): Promise<ITaskEntity> {
    return await this.repository.save(data);
  }

  async delete(data: ITaskEntity): Promise<ITaskEntity> {
    return await this.repository.remove(data);
  }

  async getAll(): Promise<ITaskEntity[]> {
    return this.repository.find();
  }

  async findOneById(data: TFindTaskById): Promise<ITaskEntity | null> {
    return this.repository.findOneBy({
      id: data.id
    });
  }
}

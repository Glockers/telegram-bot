import { Repository } from 'typeorm';
import { ITaskEntity, TaskEntity } from '../entities/task.entity';
import { injectable } from 'inversify';
import { Database } from '../typeorm';

export type TAddTask = Omit<ITaskEntity, 'id'>;

export type TFindTaskById = Pick<ITaskEntity, 'id'>;

@injectable()
export class TaskRepository {
  private repository: Repository<ITaskEntity>;

  constructor() {
    this.repository = Database.get().getRepository(TaskEntity);
  }

  async add(data: TAddTask): Promise<ITaskEntity> {
    return await this.repository.save(data);
  }

  async delete(data: ITaskEntity): Promise<ITaskEntity> {
    return await this.repository.remove(data);
  }

  async getAll(userID: number): Promise<ITaskEntity[]> {
    return this.repository.find({
      where: {
        userID
      }
    });
  }

  async findOneById(id: number): Promise<ITaskEntity | null> {
    return this.repository.findOneBy({
      id
    });
  }
}

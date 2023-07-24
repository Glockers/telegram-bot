import { Repository } from 'typeorm';
import { postgresDataSource } from '../typeorm';
import { ITaskSubscribeEntity, TaskSubscribeEntity } from '../entities/taskSubscribe.entity';
import { injectable } from 'inversify';

export type ITaskSubscribe = Omit<ITaskSubscribeEntity, 'id'>;

export type TFindSubscribeTaskById = Pick<ITaskSubscribeEntity, 'id'>

@injectable()
export class TaskSubscribeRepository {
  private repository: Repository<ITaskSubscribeEntity>;

  constructor() {
    this.repository = postgresDataSource.getRepository(TaskSubscribeEntity);
  }

  async add(data: ITaskSubscribe): Promise<ITaskSubscribeEntity> {
    return await this.repository.save(data);
  }

  async delete(data: ITaskSubscribeEntity): Promise<ITaskSubscribeEntity> {
    return await this.repository.remove(data);
  }

  async getAll(): Promise<ITaskSubscribeEntity[]> {
    return await this.repository.find();
  }

  async findOneById(data: TFindSubscribeTaskById): Promise<ITaskSubscribeEntity | null> {
    return await this.repository.findOneBy({
      id: data.id
    });
  }
}

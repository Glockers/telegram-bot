import { Repository } from 'typeorm';
import { Database, ITaskSubscribeEntity, TaskSubscribeEntity } from '@infra/database';
import { injectable } from 'inversify';

export type ITaskSubscribe = Omit<ITaskSubscribeEntity, 'id'>;

export type TFindSubscribeTaskById = Pick<ITaskSubscribeEntity, 'id'>

@injectable()
export class TaskSubscribeRepository {
  private repository: Repository<ITaskSubscribeEntity>;

  constructor() {
    this.repository = Database.get().getRepository(TaskSubscribeEntity);
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

  async findOneByTaskID(taskID: number): Promise<ITaskSubscribeEntity | null> {
    const queryBuilder = this.repository
      .createQueryBuilder('taskSubscribe')
      .innerJoinAndSelect('taskSubscribe.taskEntity', 'taskEntity', 'taskEntity.id = :taskID', { taskID });
    return await queryBuilder.getOne();
  }

  async getdAllByTaskTime(targetTime: Date): Promise<ITaskSubscribeEntity[]> {
    const targetHours = targetTime.getHours();
    const targetMinutes = targetTime.getMinutes();
    const records = await this.repository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.taskEntity', 'task')
      .where('EXTRACT(HOUR FROM record.time) = :hours', { hours: targetHours })
      .andWhere('EXTRACT(MINUTE FROM record.time) = :minutes', { minutes: targetMinutes })
      .getMany();
    return records;
  }
}

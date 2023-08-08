import { ITaskEntity } from '@infra/database/entities/task.entity';
import { ITaskSubscribeEntity } from '../../../infra/database/entities/taskSubscribe.entity';

export type ISceneAddTask = Omit<ITaskEntity, 'id'>;

export interface ISceneIdTask {
  id: number;
}

export type ISubscribeTaskSession = Omit<ITaskSubscribeEntity, 'id' | 'taskEntity'> & { taskID: number }

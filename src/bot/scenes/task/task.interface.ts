import { ITaskEntity } from '@infra/database/entities/task.entity';
import { ITaskSubscribeEntity } from '../../../infra/database/entities/taskSubscribe.entity';

export type SessionAddTask = Omit<ITaskEntity, 'id'>;

export interface SessionTaskId {
  id: number;
}

export type SessionSubscribeTask = Omit<ITaskSubscribeEntity, 'id' | 'taskEntity'> & { taskID: number }

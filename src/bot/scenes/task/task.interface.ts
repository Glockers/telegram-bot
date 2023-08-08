import { ITaskSubscribeEntity, ITaskEntity } from '@infra/database';

export type SessionAddTask = Omit<ITaskEntity, 'id'>;

export interface SessionTaskId {
  id: number;
}

export type SessionSubscribeTask = Omit<ITaskSubscribeEntity, 'id' | 'taskEntity'> & { taskID: number }

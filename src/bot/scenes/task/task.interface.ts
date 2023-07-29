import { ITaskEntity } from 'infra/database/entities/task.entity';

export type ISceneAddTask = Omit<ITaskEntity, 'id'>;

export interface ISceneIdTask {
  id: number;
}

import { ITaskEntity } from 'infra/database/entities/task.entity';

export type ISceneAddTask = Omit<ITaskEntity, 'id' | 'userID'>;

export interface ISceneDeleteTask {
  id: number;
}

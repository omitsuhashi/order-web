import {
  ProjectCreateDao,
  ProjectFetchDao,
  ProjectUpdateDao,
} from '@/dao/project';
import TaskModel from './task';
import { UnregisteredObjectError } from '@/constants/error';

class ProjectModel {
  private id?: string;
  constructor(
    public name: string,
    public description: string,
    public tasks: Array<TaskModel> = [],
  ) {}

  static fromDao(dao: ProjectFetchDao): ProjectModel {
    const model = new ProjectModel(dao.name, dao.description);
    model.id = dao.id;
    return model;
  }

  private taskIds(): Array<string> {
    const taskIds = this.tasks.map((task) => task.id);
    if (taskIds.some((taskId) => taskId === undefined)) {
      throw new UnregisteredObjectError(
        'register task before adding to project',
      );
    }
    return taskIds as Array<string>;
  }

  serialize(): ProjectUpdateDao | ProjectCreateDao {
    const taskIds = this.taskIds();
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      taskIds: taskIds,
    };
  }
}

export default ProjectModel;

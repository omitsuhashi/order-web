interface ProjectDao {
  id?: string;
  name?: string;
  description?: string;
  taskIds?: Array<string>;
}

export interface ProjectCreateDao extends ProjectDao {
  name: string;
  description: string;
  taskIds: Array<string>;
}

export interface ProjectFetchDao extends ProjectCreateDao {
  id: string;
}

export interface ProjectUpdateDao extends ProjectDao {
  id: string;
}

export default ProjectDao;

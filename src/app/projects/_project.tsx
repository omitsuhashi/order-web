import useSWR from 'swr';
import { PROJECT_API } from '@/constants/api';
import { PropsWithoutRef } from 'react';
import { ProjectFetchDao } from '@/dao/project';

type Props = {
  projectId: string;
};

const Project = (props: PropsWithoutRef<Props>) => {
  const { data, error } = useSWR<ProjectFetchDao>(
    PROJECT_API.getById(props.projectId),
  );
  if (error) return <p>Error...</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <p>{data.name}</p>
      <p>{data.description}</p>
    </>
  );
};

export default Project;

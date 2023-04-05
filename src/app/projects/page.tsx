'use client';

import { NextPage } from 'next';
import Project from './_project';

const ProjectsIndex: NextPage = () => {
  return (
    <>
      <Project projectId={'test'}></Project>
    </>
  );
};

export default ProjectsIndex;

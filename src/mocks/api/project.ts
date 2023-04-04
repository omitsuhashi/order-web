import { rest } from 'msw';
import { PROJECT_API } from '@/constants/api';
import ProjectModel from '@/models/project';

const projectMocks = [
  rest.get(PROJECT_API.getById('a'), (req, res, context) => {
    const result = new ProjectModel('b', 'c');
    return res(context.delay(0), context.json(result));
  }),
  rest.get(PROJECT_API.getById('d'), (req, res, context) => {
    const result = new ProjectModel('e', 'f');
    return res(context.json(result));
  }),
  rest.get(PROJECT_API.getById('failed'), (req, res, context) => {
    const result = new ProjectModel('f', 'f');
    return res(context.delay(100), context.status(403), context.json(result));
  }),
];

export default projectMocks;

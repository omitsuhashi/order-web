import { setupServer } from 'msw/node';
import projectMocks from './project';

export const server = setupServer(...projectMocks);

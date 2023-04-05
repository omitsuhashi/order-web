import { setupServer } from 'msw/node';
import projectMocks from './project';
import orderMocks from '@/mocks/api/order';

export const server = setupServer(...projectMocks, ...orderMocks);

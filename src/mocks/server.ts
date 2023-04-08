import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/api';

export const server = setupServer(...handlers);

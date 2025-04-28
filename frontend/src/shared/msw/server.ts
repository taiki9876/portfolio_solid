import { setupServer } from 'msw/node';
import { adminHandlers } from './adminHandlers';

export const server = setupServer(...adminHandlers);

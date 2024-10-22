import '@testing-library/jest-dom/vitest';
import '@testing-library/react';
import { server } from './test/mocks/server';

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

import { setupServer } from "msw/node";
import { rest } from "msw";
import { createMockHandlers } from "mocks/mock-handlers";

const server = setupServer(...createMockHandlers(rest));

export { server, rest };

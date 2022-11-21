import { setupServer } from "msw/node";

import { getHandlers } from "./handlers";

export const server = setupServer(...getHandlers());

// reset the mocks for each test
const resetHandlers = server.resetHandlers.bind(server);
server.resetHandlers = (...args) => {
  resetHandlers(...getHandlers(), ...args);
};

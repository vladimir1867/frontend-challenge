import { setupWorker } from "msw";

import { getHandlers } from "./handlers";

const worker = setupWorker(...getHandlers());
worker.start();

import { rest } from "msw";

import { MAX_SELECTIONS } from "../app";

import rawCandidates from "./generate";

export function getHandlers() {
  // make an in-memory clone that resets if we recreate the handlers
  const candidates = [...rawCandidates];

  return [
    rest.get("/api/v1/candidates", (_req, res, ctx) =>
      res(ctx.json(candidates))
    ),
    rest.get("/api/v1/candidates/:id", (req, res, ctx) =>
      res(
        ctx.json(candidates.find((candidate) => candidate.id === req.params.id))
      )
    ),
    rest.put("/api/v1/candidates/:id", async (req, res, ctx) => {
      const index = candidates.findIndex(
        (candidate) => candidate.id === req.params.id
      );

      if (index >= 0) {
        const updatedCandidate = await req.json();

        // check that there aren't already too many selections
        if (
          !updatedCandidate.selected ||
          candidates.filter((candidate) => (candidate as any).selected).length <
            MAX_SELECTIONS
        ) {
          candidates[index] = updatedCandidate;
        }

        return res(ctx.json(candidates[index]));
      } else {
        return res(ctx.status(404));
      }
    }),
  ];
}

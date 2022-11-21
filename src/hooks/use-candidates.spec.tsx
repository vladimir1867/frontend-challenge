import { renderHook, waitFor } from "@testing-library/react";

import mocks from "../mocks/generate";

import { useCandidates } from "./use-candidates";

describe("useCandidates", () => {
  test("loads candidates", async () => {
    const { result } = renderHook(() => useCandidates());

    await waitFor(() =>
      expect(result.current.candidates).toHaveLength(mocks.length)
    );
  });
});

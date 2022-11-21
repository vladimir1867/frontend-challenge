import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App, { MAX_SELECTIONS } from "./app";
import mocks from "./mocks/generate";

const candidateNames = mocks.map((candidate) => candidate.id);

describe("App", () => {
  test("renders Navbar", async () => {
    render(<App />);

    expect(await screen.findByText("Citrine Project")).toBeInTheDocument();
  });

  test("renders candidate list", async () => {
    render(<App />);

    // verify all candidate are rendered unchecked
    await waitFor(() =>
      expect(
        screen.queryAllByRole("checkbox", { checked: false })
      ).toHaveLength(mocks.length)
    );

    // verify no candidate are rendered checked
    await waitFor(() =>
      expect(screen.queryAllByRole("checkbox", { checked: true })).toHaveLength(
        0
      )
    );
  });

  test("verify maximum selections", async () => {
    render(<App />);

    // verify all candidate are rendered unchecked
    await waitFor(() =>
      expect(
        screen.queryAllByRole("checkbox", { checked: false })
      ).toHaveLength(mocks.length)
    );

    // select the maximum number of candidates
    for (const name of candidateNames.slice(0, MAX_SELECTIONS)) {
      const checkbox = await screen.findByRole("checkbox", { name });
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toBeEnabled();
      await userEvent.click(checkbox);
    }

    // verify the maximum number of selections are checked
    await waitFor(() =>
      expect(screen.queryAllByRole("checkbox", { checked: true })).toHaveLength(
        MAX_SELECTIONS
      )
    );

    // attempt to select another candidate
    const checkbox = await screen.findByRole("checkbox", {
      name: candidateNames[MAX_SELECTIONS],
    });
    await userEvent.click(checkbox);

    // verify this other candidate has not been selected
    await waitFor(() => expect(checkbox).not.toBeChecked());
    await waitFor(() =>
      expect(screen.queryAllByRole("checkbox", { checked: true })).toHaveLength(
        MAX_SELECTIONS
      )
    );
  });

  test("verify persistence", async () => {
    render(<App />);

    // verify all candidate are rendered unchecked
    await waitFor(() =>
      expect(
        screen.queryAllByRole("checkbox", { checked: false })
      ).toHaveLength(mocks.length)
    );

    await userEvent.click(
      await screen.findByRole("checkbox", { name: candidateNames[0] })
    );
    expect(
      await screen.findByRole("checkbox", { name: candidateNames[0] })
    ).toBeChecked();

    // unmount the App (to reset its state)
    cleanup();
    // remount the App
    render(<App />);

    // verify the candidate selection is persisted
    expect(
      await screen.findByRole("checkbox", { name: candidateNames[0] })
    ).toBeChecked();
  });
});

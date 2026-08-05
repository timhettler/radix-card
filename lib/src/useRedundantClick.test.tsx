import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { useRedundantClick } from "./useRedundantClick";

// Exercises the standalone hook (a public export) the way consumers wire it up:
// handlers on a container element, the ref on the real interactive target.
function Harness() {
  const { targetRef, handleRedundantClick, handleAuxiliaryClick } =
    useRedundantClick<HTMLAnchorElement>();

  return (
    <div
      data-testid="container"
      onClick={handleRedundantClick}
      onAuxClick={handleAuxiliaryClick}
    >
      <span>Filler</span>
      <div data-exclude="">
        <button type="button">Excluded action</button>
      </div>
      <a ref={targetRef} href="https://example.com/">
        Go
      </a>
    </div>
  );
}

describe("useRedundantClick", () => {
  it("forwards container clicks to the ref'd target", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const target = screen.getByRole("link", { name: "Go" });
    const onClick = vi.fn((event: Event) => event.preventDefault());
    target.addEventListener("click", onClick);

    await user.click(screen.getByText("Filler"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("ignores clicks that originate inside a data-exclude region", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const target = screen.getByRole("link", { name: "Go" });
    const onClick = vi.fn((event: Event) => event.preventDefault());
    target.addEventListener("click", onClick);

    await user.click(screen.getByRole("button", { name: "Excluded action" }));

    expect(onClick).not.toHaveBeenCalled();
  });
});

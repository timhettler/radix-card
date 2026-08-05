import "@testing-library/jest-dom/vitest";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as axe from "axe-core";

import { Card, CardTarget, CardTargetDescription, CardExclude } from "./Card";

type RenderOptions = {
  withDescription?: boolean;
  withExclude?: boolean;
};

function renderCard({ withDescription, withExclude }: RenderOptions = {}) {
  return render(
    <Card data-testid="card">
      <h2>
        <CardTarget href="https://example.com/">Graphic Design</CardTarget>
      </h2>
      <p>Body text</p>
      {withDescription ? (
        <CardTargetDescription data-testid="description">
          Learn more
        </CardTargetDescription>
      ) : null}
      {withExclude ? (
        <CardExclude data-testid="exclude">
          <a href="https://example.com/related">Related</a>
        </CardExclude>
      ) : null}
    </Card>,
  );
}

/** Spy on clicks reaching the target, suppressing jsdom's unimplemented navigation. */
function spyOnTargetClick() {
  const target = screen.getByRole("link", { name: "Graphic Design" });
  const onClick = vi.fn((event: Event) => event.preventDefault());
  target.addEventListener("click", onClick);
  return { target, onClick };
}

async function getAxeViolations(container: Element) {
  const results = await axe.run(container, {
    runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
    // jsdom can't compute layout, so color-contrast can't run.
    rules: { "color-contrast": { enabled: false } },
  });
  return results.violations;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Card redundant click", () => {
  it("dispatches a click on the target when a non-target part of the card is clicked", async () => {
    const user = userEvent.setup();
    renderCard();
    const { onClick } = spyOnTargetClick();

    await user.click(screen.getByText("Body text"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not double-fire when the target itself is clicked", async () => {
    const user = userEvent.setup();
    renderCard();
    const { target, onClick } = spyOnTargetClick();

    await user.click(target);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not dispatch when the click originates inside an excluded region", async () => {
    const user = userEvent.setup();
    renderCard({ withExclude: true });
    const { onClick } = spyOnTargetClick();

    const related = screen.getByRole("link", { name: "Related" });
    related.addEventListener("click", (event) => event.preventDefault());
    await user.click(related);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not dispatch when the user has selected text within the card", async () => {
    const user = userEvent.setup();
    renderCard();
    const { onClick } = spyOnTargetClick();
    const body = screen.getByText("Body text");

    vi.spyOn(window, "getSelection").mockReturnValue({
      type: "Range",
      focusNode: body.firstChild,
    } as unknown as Selection);

    await user.click(body);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("dispatches on middle-click but ignores other auxiliary buttons", () => {
    renderCard();
    const { onClick } = spyOnTargetClick();
    const body = screen.getByText("Body text");

    fireEvent(
      body,
      new MouseEvent("auxclick", {
        button: 1,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onClick).toHaveBeenCalledTimes(1);

    onClick.mockClear();
    fireEvent(
      body,
      new MouseEvent("auxclick", {
        button: 2,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onClick).not.toHaveBeenCalled();
  });

  it("preserves modifier keys and pointer coordinates on the synthetic click", () => {
    renderCard();
    const target = screen.getByRole("link", { name: "Graphic Design" });
    let dispatched: MouseEvent | undefined;
    target.addEventListener("click", (event) => {
      dispatched = event as MouseEvent;
      event.preventDefault();
    });

    fireEvent.click(screen.getByText("Body text"), {
      metaKey: true,
      shiftKey: true,
      clientX: 42,
      clientY: 24,
    });

    expect(dispatched?.metaKey).toBe(true);
    expect(dispatched?.shiftKey).toBe(true);
    expect(dispatched?.clientX).toBe(42);
    expect(dispatched?.clientY).toBe(24);
  });
});

describe("Card accessibility wiring", () => {
  it("connects the target to its description via aria-describedby", async () => {
    renderCard({ withDescription: true });
    const target = screen.getByRole("link", { name: "Graphic Design" });
    const description = screen.getByTestId("description");

    await waitFor(() => {
      expect(target).toHaveAttribute("aria-describedby", description.id);
    });
    expect(description.id).toBeTruthy();
    expect(description).toHaveAttribute("aria-hidden", "true");
  });

  it("omits aria-describedby when there is no description", () => {
    renderCard();
    const target = screen.getByRole("link", { name: "Graphic Design" });

    expect(target).not.toHaveAttribute("aria-describedby");
  });

  it("reflects target focus on the root via data-target-focused", () => {
    renderCard();
    const card = screen.getByTestId("card");
    const target = screen.getByRole("link", { name: "Graphic Design" });

    expect(card).not.toHaveAttribute("data-target-focused");

    fireEvent.focusIn(target);
    expect(card).toHaveAttribute("data-target-focused", "");

    fireEvent.focusOut(target);
    expect(card).not.toHaveAttribute("data-target-focused");
  });

  it("has no axe violations", async () => {
    const { container } = renderCard({
      withDescription: true,
      withExclude: true,
    });
    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Graphic Design" }),
      ).toHaveAttribute("aria-describedby");
    });

    expect(await getAxeViolations(container)).toEqual([]);
  });
});

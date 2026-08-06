import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "storybook/test";
import classNames from "classnames/bind";

import * as Card from "@timhettler/radix-card";

import Creative from "./assets/Creative.png";
import Chevron from "./assets/chevron.svg";

import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

const STRINGS = {
  TITLE: "Graphic Design",
  BODY: "Graphic design is a profession, academic discipline and applied art whose activity consists in projecting visual communications intended to transmit specific messages to social groups, with specific objectives.",
  CTA: "Learn More",
};

// Records clicks that reach the target and suppresses the real navigation the
// activated link would otherwise trigger in the browser.
function captureTargetClicks(target: HTMLElement) {
  const events: MouseEvent[] = [];
  const handler = (event: Event) => {
    event.preventDefault();
    events.push(event as MouseEvent);
  };
  target.addEventListener("click", handler);
  return {
    events,
    cleanup: () => target.removeEventListener("click", handler),
  };
}

const meta = {
  title: "Card",
  component: Card.Root,
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: cx("container"),
    children: (
      <>
        <img className={cx("image")} src={Creative} alt="" />
        <div className={cx("text-container")}>
          <h2 className={cx("title")}>{STRINGS.TITLE}</h2>
          <p className={cx("description")}>{STRINGS.BODY}</p>
          <Card.CardTarget
            className={cx("cta")}
            href="https://en.wikipedia.org/wiki/Graphic_design"
          >
            {STRINGS.CTA}{" "}
            <img className={cx("cta__icon")} src={Chevron} alt="" />
          </Card.CardTarget>
        </div>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("link", { name: /learn more/i });
    const { events, cleanup } = captureTargetClicks(target);

    try {
      // Clicking a non-interactive part of the card activates the target.
      await userEvent.click(
        canvas.getByRole("heading", { name: STRINGS.TITLE }),
      );
      await expect(events).toHaveLength(1);

      // Clicking the target itself fires once — no duplicate synthetic click.
      await userEvent.click(target);
      await expect(events).toHaveLength(2);

      // Modifier keys survive on the synthetic click (open-in-new-tab, etc.).
      canvas.getByRole("heading", { name: STRINGS.TITLE }).dispatchEvent(
        new MouseEvent("click", {
          metaKey: true,
          bubbles: true,
          cancelable: true,
        }),
      );
      await expect(events).toHaveLength(3);
      await expect(events[2].metaKey).toBe(true);
    } finally {
      cleanup();
    }
  },
};

export const BetterAccessibility: Story = {
  args: {
    className: cx("container", "ba"),
    children: (
      <>
        <img className={cx("image")} src={Creative} alt="" />
        <div className={cx("text-container")}>
          <h2 className={cx("title")}>
            <Card.Target href="https://en.wikipedia.org/wiki/Graphic_design">
              {STRINGS.TITLE}
            </Card.Target>
          </h2>
          <p className={cx("description")}>{STRINGS.BODY}</p>
          <Card.TargetDescription className={cx("cta")}>
            {STRINGS.CTA}{" "}
            <img className={cx("cta__icon")} src={Chevron} alt="" />
          </Card.TargetDescription>
        </div>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("link", { name: STRINGS.TITLE });

    // The description's id is wired to the target via aria-describedby.
    await waitFor(() => expect(target).toHaveAttribute("aria-describedby"));

    const { events, cleanup } = captureTargetClicks(target);
    try {
      // Clicking the body copy activates the title link.
      await userEvent.click(canvas.getByText(STRINGS.BODY));
      await expect(events).toHaveLength(1);
    } finally {
      cleanup();
    }

    // Focusing the target flags the whole card via data-target-focused.
    await userEvent.tab();
    await expect(target).toHaveFocus();
    await waitFor(() =>
      expect(
        canvasElement.querySelector("[data-target-focused]"),
      ).not.toBeNull(),
    );

    (canvasElement.ownerDocument.activeElement as HTMLElement | null)?.blur();
    await waitFor(() =>
      expect(canvasElement.querySelector("[data-target-focused]")).toBeNull(),
    );
  },
};

export const NestedInteractions: Story = {
  args: {
    className: cx("container", "ba"),
    children: (
      <>
        <img className={cx("image")} src={Creative} alt="" />
        <div className={cx("text-container")}>
          <h2 className={cx("title")}>
            <Card.Target href="https://en.wikipedia.org/wiki/Graphic_design">
              {STRINGS.TITLE}
            </Card.Target>
          </h2>
          <p className={cx("description")}>{STRINGS.BODY}</p>
          <Card.TargetDescription className={cx("cta")}>
            {STRINGS.CTA}{" "}
            <img className={cx("cta__icon")} src={Chevron} alt="" />
          </Card.TargetDescription>
        </div>
        <Card.Exclude className="related">
          <h3 className="related__title">Related topics:</h3>
          <ul className={cx("related__list")}>
            <li>
              <a href="https://en.wikipedia.org/wiki/Aesthetics">Aesthetics</a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Color_theory">
                Color theory
              </a>
            </li>
          </ul>
        </Card.Exclude>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("link", { name: STRINGS.TITLE });
    const { events, cleanup } = captureTargetClicks(target);

    try {
      // A click inside an excluded region does not activate the card target,
      // and the nested link stays independently usable.
      const aesthetics = canvas.getByRole("link", { name: /aesthetics/i });
      const stopNav = (event: Event) => event.preventDefault();
      aesthetics.addEventListener("click", stopNav);
      await userEvent.click(aesthetics);
      aesthetics.removeEventListener("click", stopNav);
      await expect(events).toHaveLength(0);
      await expect(
        canvas.getByRole("link", { name: /color theory/i }),
      ).toBeInTheDocument();

      // A middle-click on the card still activates the target.
      canvas.getByText(STRINGS.BODY).dispatchEvent(
        new MouseEvent("auxclick", {
          button: 1,
          bubbles: true,
          cancelable: true,
        }),
      );
      await expect(events).toHaveLength(1);
    } finally {
      cleanup();
    }
  },
};

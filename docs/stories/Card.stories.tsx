import type { Meta, StoryObj } from "@storybook/react";
import { within, waitFor, expect } from "storybook/test";
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
    await expect(
      canvas.getByRole("link", { name: /learn more/i }),
    ).toHaveAttribute("href");
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
    // The description's id is wired to the target via aria-describedby.
    await waitFor(() =>
      expect(
        canvas.getByRole("link", { name: /graphic design/i }),
      ).toHaveAttribute("aria-describedby"),
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
    await waitFor(() =>
      expect(
        canvas.getByRole("link", { name: /graphic design/i }),
      ).toHaveAttribute("aria-describedby"),
    );
    // Links inside an excluded region stay independently reachable.
    await expect(
      canvas.getByRole("link", { name: /aesthetics/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: /color theory/i }),
    ).toBeInTheDocument();
  },
};

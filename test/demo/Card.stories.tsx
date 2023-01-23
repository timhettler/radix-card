import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames/bind";

import * as Card from "../../src/index.js";

import Creative from "./assets/Creative.png";
import Chevron from "./assets/chevron.svg";

import { STRINGS } from "./Card.string.js";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

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
};

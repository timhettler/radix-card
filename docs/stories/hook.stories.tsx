import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "storybook/test";

import { useRedundantClick } from "@timhettler/radix-card";

function HookDemo() {
  const { targetRef, handleRedundantClick } =
    useRedundantClick<HTMLAnchorElement>();

  return (
    <div onClick={handleRedundantClick}>
      <h1>The World Wide Web</h1>
      <a ref={targetRef} href="https://en.wikipedia.org/wiki/World_Wide_Web">
        Learn More
      </a>
    </div>
  );
}

const meta = { title: "Hook" } satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => <HookDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("link", { name: /learn more/i });
    let clicks = 0;
    const capture = (event: Event) => {
      event.preventDefault();
      clicks += 1;
    };
    target.addEventListener("click", capture);

    try {
      // Clicking the heading (a non-interactive part of the container)
      // activates the ref'd link.
      await userEvent.click(canvas.getByText("The World Wide Web"));
      await expect(clicks).toBe(1);
    } finally {
      target.removeEventListener("click", capture);
    }
  },
};

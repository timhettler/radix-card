import type { Meta } from "@storybook/react";

import { useRedundantClick } from "@timhettler/radix-card";

const meta = {
  title: "Hook",
} satisfies Meta<typeof HTMLDivElement>;

export default meta;

export const Basic = () => {
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
};

# Radix Card

Makes an entire area clickable without common accessibility issues.

## Features

- Full keyboard navigation
- Exclude portions of Card for nested interactivity

## Installation

```shell
yarn add @timhettler/radix-card
```

## Anatomy

Import the components and piece the parts together.

```jsx
import * as Card from "@timhettler/radix-card";

export default () => (
  <Card.Root>
    <Card.Trigger></Card.Trigger>
    <Card.TriggerDescription></Card.TriggerDescription>
    <Card.Exclude></Card.Exclude>
  </Card>
)
```

## API Reference

### Root

The clickable element which contains all the parts of the card.

| Prop      | Type      | Default |
| --------- | --------- | ------- |
| `asChild` | `boolean` | `false` |

| Data Attribute          | Value                          |
| ----------------------- | ------------------------------ |
| `[data-target-focused]` | Present when target is focused |

### Target

The element that is triggered by clicks on the card Root.

| Prop      | Type      | Default |
| --------- | --------- | ------- |
| `asChild` | `boolean` | `false` |

### TargetDescription

An optional element that provides additional semantic information about the card Target.

| Prop      | Type      | Default |
| --------- | --------- | ------- |
| `asChild` | `boolean` | `false` |

### Exclude

An optional element that allows clicking within it without triggering the card Root.

| Data Attribute   | Value                     |
| ---------------- | ------------------------- |
| `[data-exclude]` | Always present on element |

## Examples

See the [project's Storybook](https://radix-card-storybook.vercel.app/) for live examples.

### Basic

Use the `Root` and `Target` elements to create an interactive container.

```jsx
import React from "react";
import * as Card from "@timhettler/radix-card";

export default () => (
  <Card.Root>
    <h2>Graphic Design</h2>
    <div>
      Graphic design is a profession, academic discipline and applied art whose
      activity consists in projecting visual communications intended to transmit
      specific messages to social groups, with specific objectives.
    </div>
    <Card.Target href="https://en.wikipedia.org/wiki/Graphic_design">
      Learn More
    </Card.Target>
  </Card.Root>
);
```

### Better Accessibility

Use the `TargetDescription` element to provide more semantic link titles. Especially useful if multiple Cards are presented together. The link in this example will be read by AT's as "Link: Graphic Design, Learn More"

```jsx
import React from "react";
import * as Card from "@timhettler/radix-card";

export default () => (
  <Card.Root>
    <h2>
      <Card.Target href="https://en.wikipedia.org/wiki/Graphic_design">
        Graphic Design
      </Card.Target>
    </h2>
    <div>
      Graphic design is a profession, academic discipline and applied art whose
      activity consists in projecting visual communications intended to transmit
      specific messages to social groups, with specific objectives.
    </div>
    <Card.TargetDescription>Learn More</Card.TargetDescription>
  </Card.Root>
);
```

### With An Excluded Area

Use the `Exclude` element if you have multiple interactive elements within a Card.

```jsx
import React from "react";
import * as Card from "@timhettler/radix-card";

export default () => (
  <Card.Root>
    <h2>
      <Card.Target href="https://en.wikipedia.org/wiki/Graphic_design">
        Graphic Design
      </Card.Target>
    </h2>
    <div>
      Graphic design is a profession, academic discipline and applied art whose
      activity consists in projecting visual communications intended to transmit
      specific messages to social groups, with specific objectives.
    </div>
    <Card.TargetDescription>Learn More</Card.TargetDescription>
    <Card.Exclude>
      <h3>Related topics:</h3>
      <ul>
        <li>
          <a href="https://en.wikipedia.org/wiki/Aesthetics">Aesthetics</a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Color_theory">Color theory</a>
        </li>
      </ul>
    </Card.Exclude>
  </Card.Root>
);
```

### Providing an Adequate Visible Focus Indicator

```jsx
// index.jsx
import React from "react";
import * as Card from "@timhettler/radix-card";

export default () => (
  <Card.Root className="CardRoot">
    <h2>
      <Card.Target
        href="https://en.wikipedia.org/wiki/Graphic_design"
        className="CardTarget"
      >
        Graphic Design
      </Card.Target>
    </h2>
    <div>
      Graphic design is a profession, academic discipline and applied art whose
      activity consists in projecting visual communications intended to transmit
      specific messages to social groups, with specific objectives.
    </div>
    <Card.TargetDescription>Learn More</Card.TargetDescription>
  </Card.Root>
);
```

```css
/* styles.css */

.CardRoot {
  cursor: pointer;
  transition: box-shadow 100ms;
}

/* Apply interactive styles to the container when user hovers over the container or gives focus to the target */
.CardRoot:hover,
.CardRoot[data-target-focused] {
  box-shadow: 0 0 0 0.25rem #5a5a5a;
}

/* Remove default interactive styling from the target */
.CardTarget {
  color: inherit;
  text-decoration: none;

  &:focus {
    outline: none;
  }
}
```

## Accessibility

Allows a container to be interactive without affecting the usability of [Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/) or [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) WAI-ARIA design patterns within.

## References & Prior Art

- [Web Axe: Resources for developing accessible cards/tiles](https://www.webaxe.org/resources-for-developing-accessible-cards-tiles/)
- [Inclusive Components: Cards](https://inclusive-components.design/cards/)
- [Kitty Giraudel: Accessible Cards](https://kittygiraudel.com/2022/04/02/accessible-cards/)
- [Adrian Roselli: Block Links, Cards, Clickable Regions, Rows, Etc.](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html#Additional)
- [nomensa: How to build accessible cards–block links](https://www.nomensa.com/blog/how-build-accessible-cards-block-links)

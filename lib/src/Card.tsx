import * as React from "react";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createContextScope } from "@radix-ui/react-context";
import { Primitive } from "@radix-ui/react-primitive";

import type { Scope } from "@radix-ui/react-context";

import { useRedundantClick } from "./useRedundantClick";

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/

const CARD_NAME = "Card";

type ScopedProps<P> = P & { __scopeCard?: Scope };
const [createCardContext, createCardScope] = createContextScope(CARD_NAME);

type CardContextValue = {
  targetRef: React.RefObject<HTMLElement | null>;
  descriptionId?: string;
};

const [CardProvider, useCardContext] =
  createCardContext<CardContextValue>(CARD_NAME);

type CardElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface CardProps extends PrimitiveDivProps {}

const Card = React.forwardRef<CardElement, CardProps>(
  (props: ScopedProps<CardProps>, forwardedRef) => {
    const { __scopeCard, ...cardProps } = props;
    const { targetRef, handleRedundantClick } = useRedundantClick();
    const [targetHasFocus, setTargetHasFocus] = React.useState<"" | null>(null);

    const handleClick = composeEventHandlers(
      props.onClick,
      handleRedundantClick
    );

    const handleFocus = composeEventHandlers(props.onFocus, (event) => {
      setTargetHasFocus(event.target === targetRef.current ? "" : null);
    });

    const handleBlur = composeEventHandlers(props.onBlur, () => {
      setTargetHasFocus(null);
    });

    return (
      <CardProvider
        scope={__scopeCard}
        targetRef={targetRef}
        descriptionId={undefined}
      >
        <Primitive.div
          {...cardProps}
          ref={forwardedRef}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-target-focused={targetHasFocus}
        />
      </CardProvider>
    );
  }
);

Card.displayName = CARD_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardTarget
 * -----------------------------------------------------------------------------------------------*/

const TARGET_NAME = "CardTarget";

type CardTargetElement = React.ElementRef<typeof Primitive.a>;
type PrimitiveAnchorProps = React.ComponentPropsWithoutRef<typeof Primitive.a>;
interface CardTargetProps extends PrimitiveAnchorProps {}

const CardTarget = React.forwardRef<CardTargetElement, CardTargetProps>(
  (props: ScopedProps<CardTargetProps>, forwardedRef) => {
    const { __scopeCard, ...targetProps } = props;
    const context = useCardContext(TARGET_NAME, __scopeCard);
    const composedRefs = useComposedRefs(context.targetRef, forwardedRef);

    return (
      <Primitive.a
        {...targetProps}
        aria-describedby={context.descriptionId}
        ref={composedRefs}
      />
    );
  }
);

CardTarget.displayName = TARGET_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardTargetDescription
 * -----------------------------------------------------------------------------------------------*/

const TARGET_DESCRIPTION_NAME = "CardTargetDescription";

type CardTargetDescriptionElement = React.ElementRef<typeof Primitive.span>;
interface CardTargetDescriptionProps extends PrimitiveDivProps {}

const CardTargetDescription = React.forwardRef<
  CardTargetDescriptionElement,
  CardTargetDescriptionProps
>((props: ScopedProps<CardTargetDescriptionProps>, forwardedRef) => {
  const generatedId = React.useId();
  const { __scopeCard, ...targetProps } = props;
  const context = useCardContext(TARGET_DESCRIPTION_NAME, __scopeCard);
  context.descriptionId = props.id || generatedId;

  return (
    <Primitive.span
      {...targetProps}
      id={context.descriptionId}
      aria-hidden="true"
      ref={forwardedRef}
    />
  );
});

CardTargetDescription.displayName = TARGET_DESCRIPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardExclude
 * -----------------------------------------------------------------------------------------------*/

const EXCLUDE_NAME = "CardExclude";

type CardExcludeElement = React.ElementRef<typeof Primitive.div>;
interface CardExcludeProps extends PrimitiveDivProps {}

const CardExclude = React.forwardRef<CardExcludeElement, CardExcludeProps>(
  (props: ScopedProps<CardExcludeProps>, forwardedRef) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __scopeCard, ...targetProps } = props;

    return (
      <Primitive.div data-exclude="" {...targetProps} ref={forwardedRef} />
    );
  }
);

CardExclude.displayName = EXCLUDE_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Card;
const Target = CardTarget;
const TargetDescription = CardTargetDescription;
const Exclude = CardExclude;

export {
  createCardScope,
  //
  Card,
  CardTarget,
  CardTargetDescription,
  CardExclude,
  //
  Root,
  Target,
  TargetDescription,
  Exclude,
};

export type { CardProps, CardTargetProps, CardExcludeProps };

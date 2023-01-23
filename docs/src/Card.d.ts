import * as React from "react";
import { Primitive } from "@radix-ui/react-primitive";
import type * as Radix from "@radix-ui/react-primitive";
declare const createCardScope: import("@radix-ui/react-context").CreateScope;
declare type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;
interface CardProps extends PrimitiveDivProps {
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare type PrimitiveAnchorProps = Radix.ComponentPropsWithoutRef<typeof Primitive.a>;
interface CardTargetProps extends PrimitiveAnchorProps {
}
declare const CardTarget: React.ForwardRefExoticComponent<CardTargetProps & React.RefAttributes<HTMLAnchorElement>>;
interface CardTargetDescriptionProps extends PrimitiveDivProps {
}
declare const CardTargetDescription: React.ForwardRefExoticComponent<CardTargetDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
interface CardExcludeProps extends PrimitiveDivProps {
}
declare const CardExclude: React.ForwardRefExoticComponent<CardExcludeProps & React.RefAttributes<HTMLDivElement>>;
declare const Root: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare const Target: React.ForwardRefExoticComponent<CardTargetProps & React.RefAttributes<HTMLAnchorElement>>;
declare const TargetDescription: React.ForwardRefExoticComponent<CardTargetDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
declare const Exclude: React.ForwardRefExoticComponent<CardExcludeProps & React.RefAttributes<HTMLDivElement>>;
export { createCardScope, Card, CardTarget, CardTargetDescription, CardExclude, Root, Target, TargetDescription, Exclude, };
export type { CardProps, CardTargetProps, CardExcludeProps };

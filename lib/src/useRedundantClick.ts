import React from "react";

const useRedundantClick = <T extends HTMLElement = HTMLElement>() => {
  // Add to the clickable element
  const targetRef = React.useRef<T>(null);

  // Add to the container element
  const handleRedundantClick = (event: React.MouseEvent) => {
    if (!targetRef?.current) {
      return;
    }

    // Do not execute click if user selected text within container
    if (window.getSelection()?.type === "Range") {
      let t = window.getSelection()?.focusNode;
      while (t !== document.body) {
        if (t === event.currentTarget) {
          return;
        }
        if (!t) {
          return;
        }
        t = t.parentNode;
      }
      return;
    }

    // Do not execute click if it was done within an exclude area, or if the target was clicked (would result in two events firing)
    let t = event.target as HTMLElement;
    while (t !== event.currentTarget) {
      if (t.dataset.exclude !== undefined || t === targetRef.current) {
        return;
      }
      t = t.parentNode as HTMLElement;
    }

    const newEvent = new MouseEvent("click", { ...event, view: window });
    targetRef.current.dispatchEvent(newEvent);
  };

  return {
    targetRef,
    handleRedundantClick,
  };
};

export { useRedundantClick };

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

    // Re-dispatch as a fresh click on the target, copying the properties that
    // change how the click is handled (e.g. modifier keys / button open a new
    // tab). We copy explicit fields rather than spreading the React synthetic
    // event, which is not a valid MouseEventInit.
    const newEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      metaKey: event.metaKey,
      button: event.button,
      buttons: event.buttons,
    });
    targetRef.current.dispatchEvent(newEvent);
  };

  // Add to the container element
  const handleAuxiliaryClick = (event: React.MouseEvent) => {
    if (event.button !== 1) {
      return;
    }

    handleRedundantClick(event);
  };

  return {
    targetRef,
    handleRedundantClick,
    handleAuxiliaryClick,
  };
};

export { useRedundantClick };

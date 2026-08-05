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

    // Re-dispatch as a fresh click on the target. We copy explicit fields
    // (modifier keys and button change how the click is handled; coordinates
    // are forwarded for any consumer handler that reads them) rather than
    // spreading the React synthetic event, which is not a valid MouseEventInit.
    // `view` is intentionally omitted: it isn't needed here, and jsdom rejects
    // a Window from a different realm.
    const newEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      detail: event.detail,
      clientX: event.clientX,
      clientY: event.clientY,
      screenX: event.screenX,
      screenY: event.screenY,
      movementX: event.movementX,
      movementY: event.movementY,
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

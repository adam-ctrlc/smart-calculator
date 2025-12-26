import katex from "katex";
import { createEffect, createSignal, onCleanup } from "solid-js";

export default function MathDisplay(props) {
  let containerRef;

  createEffect(() => {
    if (containerRef && props.latex) {
      katex.render(props.latex, containerRef, {
        throwOnError: false,
        displayMode: props.display || false,
      });
    }
  });

  return <div ref={containerRef} class={props.class} />;
}

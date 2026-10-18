// Renders Arabic text that contains Latin words (tool names) or numbers.
// Each Latin/number run is isolated in <bdi dir="ltr"> so the reading order
// never breaks. With `split`, Latin runs go on their own line (for large
// headings, where an inline Latin word can jump to the wrong side).

import { Fragment } from "react";

const LATIN_RUN = /([A-Za-z0-9@][A-Za-z0-9@.+&'’/:\- ]*[A-Za-z0-9+]|[A-Za-z0-9@])/g;

export function Mixed({
  text,
  split = false,
  latinClassName = "",
}: {
  text: string;
  split?: boolean;
  latinClassName?: string;
}) {
  const parts = text.split(LATIN_RUN);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) {
          const arabic = split ? part.trim() : part;
          if (!arabic) return null;
          return split ? (
            <span key={i} className="block">
              {arabic}
            </span>
          ) : (
            <Fragment key={i}>{arabic}</Fragment>
          );
        }
        return (
          <bdi key={i} dir="ltr" className={`${split ? "block" : ""} ${latinClassName}`.trim() || undefined}>
            {part}
          </bdi>
        );
      })}
    </>
  );
}

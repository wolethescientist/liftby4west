import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  header?: ReactNode;
  glass?: boolean;
};

export function Card({ className, header, glass, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border transition-all duration-300",
        glass
          ? "glass border-white/40 shadow-glass hover:shadow-soft"
          : "border-border bg-white shadow-sm hover:shadow-soft",
        !header && "p-5 md:p-6",
        className,
      )}
      {...props}
    >
      {header ? (
        <div className="border-b border-border/60 px-5 py-4 text-sm font-bold tracking-wide text-text md:px-6">
          {header}
        </div>
      ) : null}
      {header ? <div className="p-5 md:p-6">{children}</div> : children}
    </div>
  );
}

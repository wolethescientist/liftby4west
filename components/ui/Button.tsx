import Link from "next/link";
import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
};

type ButtonElementProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonElementProps | ButtonLinkProps;

const variants = {
  primary:
    "border-navy bg-navy text-white hover:bg-primary-hover shadow-sm hover:shadow-md active:scale-[0.98]",
  secondary:
    "border-transparent bg-subtle text-navy hover:bg-border/60 hover:text-primary-hover active:scale-[0.98]",
  ghost: "border-transparent bg-transparent text-navy hover:bg-subtle active:scale-[0.98]",
  destructive:
    "border-destructive bg-destructive text-white hover:bg-[#b91c1c] shadow-sm hover:shadow-md active:scale-[0.98]",
  outline:
    "border-border bg-white text-navy hover:border-navy hover:bg-subtle shadow-sm active:scale-[0.98]",
};

const sizes = {
  sm: "h-9 px-4 text-xs rounded-lg",
  md: "h-11 px-6 text-sm rounded-xl",
  lg: "h-14 px-8 text-base rounded-2xl",
};

function buttonClasses({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
}: Pick<ButtonBaseProps, "className" | "variant" | "size" | "fullWidth">) {
  return clsx(
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const {
      href,
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      ...linkProps
    } = props;

    return (
      <Link
        href={href}
        aria-disabled={loading}
        className={buttonClasses({ className, variant, size, fullWidth })}
        {...linkProps}
      >
        {loading ? <Spinner /> : null}
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled,
    ...buttonProps
  } = props as ButtonElementProps;

  return (
    <button
      className={buttonClasses({ className, variant, size, fullWidth })}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

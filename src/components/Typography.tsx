import { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      {...restProps}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2
      {...restProps}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3
      {...restProps}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h4
      {...restProps}
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function H5({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h5
      {...restProps}
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h5>
  );
}

export function H6({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h6
      {...restProps}
      className={cn(
        "scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h6>
  );
}

export function P({
  children,
  bold,
  italic,
  muted,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> & {
  bold?: boolean;
  italic?: boolean;
  muted?: boolean;
  className?: string;
}) {
  return (
    <p
      {...restProps}
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        {
          "font-semibold": !!bold,
          italic: !!italic,
          "text-muted-foreground text-sm": !!muted,
        },
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Blockquote({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLQuoteElement>>) {
  return (
    <blockquote
      {...restProps}
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
    >
      {children}
    </blockquote>
  );
}

export function Table({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLTableElement>>) {
  return (
    <table {...restProps} className={cn("w-full", className)}>
      {children}
    </table>
  );
}

export function Tr({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) {
  return (
    <tr {...restProps} className={cn("even:bg-muted m-0 p-0", className)}>
      {children}
    </tr>
  );
}

export function Th({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <th
      {...restProps}
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <td
      {...restProps}
      className={cn(
        "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function Ul({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) {
  return (
    <ul
      {...restProps}
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
    >
      {children}
    </ul>
  );
}

export function Ol({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLOListElement>>) {
  return (
    <ol
      {...restProps}
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
    >
      {children}
    </ol>
  );
}

export function Code({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <pre>
      <code
        {...restProps}
        className={cn(
          "bg-muted relative rounded font-mono text-sm font-semibold",
          className,
        )}
      >
        {children}
      </code>
    </pre>
  );
}

export function Large({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...restProps} className={cn("text-lg font-semibold", className)}>
      {children}
    </div>
  );
}

export function Small({
  children,
  className,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <small
      {...restProps}
      className={cn("text-sm font-medium leading-none", className)}
    >
      {children}
    </small>
  );
}

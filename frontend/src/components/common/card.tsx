import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl border border-gray-200 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={clsx("p-4", className)} {...props}>
      {children}
    </div>
  );
}

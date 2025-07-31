import React from "react";

type StackProps = {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  style?: React.CSSProperties;
};

// YStack: vertical
export const YStack = ({
  children,
  className = "",
  gap = 8,
  style,
}: StackProps) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: `${gap}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type XStackProps = StackProps & {
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
};

// XStack row
export const XStack = ({
  children,
  className = "",
  gap = 8,
  align = "center",
  justify = "flex-start",
  style,
}: XStackProps) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: align,
        justifyContent: justify,
        gap: `${gap}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

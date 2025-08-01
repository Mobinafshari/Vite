import React, { CSSProperties, ReactNode } from "react";
type Props = {
  Component?: "span" | "p";
  children: ReactNode;
  style?: CSSProperties;
};

function Typogeraphy({ Component = "p", children, style, ...rest }: Props) {
  return (
    <Component {...rest} style={style}>
      {children}
    </Component>
  );
}

export default Typogeraphy;

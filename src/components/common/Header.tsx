import React, { CSSProperties } from "react";
import { headerOne } from "@styles";

export const Header = ({ title, style }: { title: string; style?: CSSProperties }) => <h1
  style={{ ...headerOne(), marginTop: 0, ...style && style }}>
  {title}
</h1>;
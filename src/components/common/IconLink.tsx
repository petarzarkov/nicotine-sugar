import React from "react";

export const IconLink = ({ title, iconSrc, link, size = 26 }: { title: string; iconSrc: string; link: string; size?: number }) =>
  <a href={link} target="blank">
    <img title={title} alt={title} width={size} src={iconSrc} />
  </a>;
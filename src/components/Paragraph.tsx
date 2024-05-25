import classNames from "classnames";
import React, { HTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  bold?: boolean;
  className?: string;
} & HTMLAttributes<HTMLParagraphElement>;

function Paragraph({ children, bold, className, ...rest }: Props) {
  const pClasses = classNames(className, "font-poppins text-12 text-primary", {
    "font-medium": bold,
  });
  return (
    <p {...rest} className={pClasses}>
      {children}
    </p>
  );
}

export default Paragraph;
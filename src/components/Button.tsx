import React, { MouseEvent } from "react";

type Props = {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLElement>) => void;
};

function Button({ children, onClick }: Props) {
  return <button className="rounded-full p-0.5 z-10" onClick={onClick}>{children}</button>;
}

export default Button;

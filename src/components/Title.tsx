import React from "react";

type Props = {
  children: React.ReactNode;
};

function Title({ children }: Props) {
  return <h2 className="font-poppins font-bold text-20 text-primary">{children}</h2>;
}

export default Title;

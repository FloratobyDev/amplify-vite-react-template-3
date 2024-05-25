import React from "react";

type Props = {
  children: React.ReactNode;
};

function Italic({ children }: Props) {
  return <p className="font-poppins font-italic italic text-10 select-none">{children}</p>;
}

export default Italic;

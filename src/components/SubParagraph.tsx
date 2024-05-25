import React from "react";

type Props = {
  children: React.ReactNode;
};

function SubParagraph({ children }: Props) {
  return <p className="font-poppins text-10">{children}</p>;
}

export default SubParagraph;

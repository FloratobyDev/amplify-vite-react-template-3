import React from "react";

type Props = {
  children: React.ReactNode;
};

function SubTitle({ children }: Props) {
  return <h3 className="font-poppins font-medium text-16">{children}</h3>;
}

export default SubTitle;

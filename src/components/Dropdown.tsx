import { useRef, useState } from "react";
import FloatingCard from "./FloatingCard";
import { DropdownType } from "../types";
import Paragraph from "./Paragraph";
import useOutsideClick from "../hooks/useClickOutside";

type Props = {
  jsxComponent: React.ReactNode;
  values: DropdownType[];
};

function Dropdown({ jsxComponent, values }: Props) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, show, handleShow);

  function handleShow() {
    setShow(!show);
  }

  function handleClick(value: DropdownType) {
    return () => {
      value.onClick();
      setShow(false);
    };
  }

  return (
    <div ref={ref} className="relative flex-col items-start gap-y-1">
      <button
        className="gap-x-2 py-1.5 px-2 rounded-4 cursor-pointer"
        onClick={handleShow}
      >
        {jsxComponent}
      </button>
      {show && (
        <FloatingCard className="absolute -bottom-22 right-0 min-w-32">
          <div className="p-1 flex flex-col">
            {values.map((value, index) => (
              <button
                key={index}
                className="hover:bg-secondary rounded-4 px-2 py-1 w-full text-left"
                onClick={handleClick(value)}
              >
                <Paragraph>{value.label}</Paragraph>
              </button>
            ))}
          </div>
        </FloatingCard>
      )}
    </div>
  );
}

export default Dropdown;

import { useEffect, useRef, useState } from "react";
import FloatingCard from "./FloatingCard";
import Paragraph from "./Paragraph";
import ArrowUp01Icon from "../logos/ArrowUp01Icon";
import ArrowDown01Icon from "../logos/ArrowDown01Icon";
import useOutsideClick from "../hooks/useClickOutside";
import Search from "./Search";

type Props = {
  options: Array<string>;
  onSelect: (e: string) => void
  label: string;
  selectedValue: string;
};

function CustomSelect({ options, onSelect, label, selectedValue }: Props) {
  const [show, setShow] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useOutsideClick(ref, show, handleShow);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

  function handleShow() {
    setShow(!show);
  }

  function handleSelect(value: string) {
    return () => {
      onSelect(value);
      setShow(false);
    };
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div ref={ref} className="relative flex flex-col items-start w-full">
      <Paragraph bold>{label}</Paragraph>
      <button
        className="flex items-center justify-between gap-x-2 py-1.5 px-2 rounded-4 border border-secondary w-full min-h-[34px]"
        onClick={handleShow}
      >
        <Paragraph>{selectedValue || ""}</Paragraph>
        {show ? <ArrowUp01Icon /> : <ArrowDown01Icon />}
      </button>
      {show && (
        <FloatingCard className="absolute top-[54px] p-1 flex flex-col items-center gap-y-2">
          <Search
            value={search}
            hasSearchIcon
            autoFocus
            onChange={handleSearch}
            placeholder="Search"
          />
          <div className="flex flex-col w-full overflow-auto max-h-64">
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                className="py-1.5 px-2 w-full text-left hover:bg-secondary rounded-4"
                onClick={handleSelect(option)}
              >
                <Paragraph>{option}</Paragraph>
              </button>
            ))}
          </div>
        </FloatingCard>
      )}
    </div>
  );
}

export default CustomSelect;

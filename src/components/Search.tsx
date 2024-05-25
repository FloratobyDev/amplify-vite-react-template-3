import React from "react";
import Search01Icon from "../logos/Search01Icon";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoFocus?: boolean;
  hasSearchIcon?: boolean;
  value: string;
};

function Search({
  onChange,
  placeholder,
  autoFocus = false,
  hasSearchIcon = false,
  value,
}: Props) {
  return (
    <div className="flex items-center justify-between w-full min-w-8 bg-white border border-secondary rounded-4 py-[7px] px-2 text-primary font-poppins text-12">
      <input
        autoFocus={autoFocus}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        alt="search"
        value={value}
        className="w-full px-1 h-full bg-transparent outline-none placeholder:font-poppins placeholder:text-12"
      />
      {hasSearchIcon && <Search01Icon />}
    </div>
  );
}

export default Search;

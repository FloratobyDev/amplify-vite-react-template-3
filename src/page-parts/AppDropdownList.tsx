import { Dispatch, SetStateAction } from "react";
import Select from "../components/Select";
import { CategoryListType } from "../types";

type Props = {
  feedFilters: { [key: string]: string };
  setFeedFilters: Dispatch<SetStateAction<CategoryListType>>;
  dropdownOptions: { [key: string]: string[] };
};

function AppDropdownList({
  feedFilters,
  setFeedFilters,
  dropdownOptions,
}: Props) {
  function handleSelect(key: string) {
    return (label: string) => {
      setFeedFilters((prev) => {
        return { ...prev, [key]: label };
      });
    };
  }

  return (
    <div className="flex gap-x-2">
      {Object.keys(dropdownOptions).map((key, index) => {
        return (
          <Select
            key={index}
            options={dropdownOptions[key]}
            onSelect={handleSelect(key)}
            label={key}
            selectedValue={feedFilters[key]}
          />
        );
      })}
      {/* <Select
        options={options}
        onSelect={handleSelect}
        label="Country"
        selectedValue={selectedValue}
      />
      <Select
        options={options}
        onSelect={handleSelect}
        label="Education"
        selectedValue={selectedValue}
      /> */}
    </div>
  );
}

export default AppDropdownList;

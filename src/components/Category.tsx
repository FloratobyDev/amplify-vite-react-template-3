import classNames from "classnames";
import Paragraph from "./Paragraph";

type Props = {
  activeLabel: string;
  label: string;
  onClick: (label: string) => () => void;
};

function Category({ activeLabel, label, onClick }: Props) {
  const divClasses = classNames(
    "px-2 inline-flex flex-col items-center gap-y-1 border-b-2 cursor-pointer",
    {
      "border-primary": activeLabel === label,
      "border-transparent": activeLabel !== label,
    }
  );

  return (
    <div onClick={onClick(label)} className={divClasses}>
      <div className="w-14 aspect-square rounded-4 overflow-hidden text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Category"
          className="object-cover"
        />
      </div>
      <Paragraph>{label}</Paragraph>
    </div>
  );
}

export default Category;

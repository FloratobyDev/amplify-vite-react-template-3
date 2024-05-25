import Category from "../components/Category";

type Props = {
  labels: string[];
  activeLabel: string;
  handleLabel: (label: string) => () => void;
};

function AppCategoryList({ labels, activeLabel, handleLabel }: Props) {
  return (
    <div className="flex items-center w-full">
      {labels.map((label, index) => (
        <Category
          key={index}
          activeLabel={activeLabel}
          label={label}
          onClick={handleLabel}
        />
      ))}
    </div>
  );
}

export default AppCategoryList;

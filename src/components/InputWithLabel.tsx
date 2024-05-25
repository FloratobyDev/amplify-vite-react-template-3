import Paragraph from "./Paragraph";
import Search from "./Search";

type Props = {
  label: string;
  onChange: (e: string) => void;
  value: string;
};

function InputWithLabel({ label, onChange, value }: Props) {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  return (
    <div>
      <Paragraph bold>{label}</Paragraph>
      <Search onChange={handleSearch} placeholder="" value={value} />
    </div>
  );
}

export default InputWithLabel;

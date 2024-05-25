import Paragraph from "./Paragraph";

type Props = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

function TextArea({ label, onChange, value }: Props) {
  return (
    <div className="">
      <Paragraph bold>{label}</Paragraph>
      <div className="">
        <textarea
          onChange={(e) => onChange(e.target.value)}
          value={value}
          id="textarea"
          name="textarea"
          rows={3}
          className="w-full sm:text-sm border-secondary border rounded-4 outline-none p-2 text-primary text-12"
        />
      </div>
    </div>
  );
}

export default TextArea;

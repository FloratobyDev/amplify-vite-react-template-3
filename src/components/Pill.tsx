import Paragraph from "./Paragraph";

type Props = {
  label: string;
};

function Pill({ label }: Props) {
  return (
    <div className="px-2 py-0.5 rounded-full bg-secondary">
      <Paragraph>{label}</Paragraph>
    </div>
  );
}

export default Pill;

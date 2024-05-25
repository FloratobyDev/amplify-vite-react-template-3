type Props = {
  label: string;
};

function Badge({ label }: Props) {
  return (
    <p className="overflow-hidden flex items-center">
      <span className="font-poppins font-medium text-10 bg-secondary px-1.5 py-0.5 rounded-4">{label}</span>
    </p>
  );
}

export default Badge;

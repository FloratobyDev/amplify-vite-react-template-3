import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function FloatingCard({ children, className }: Props) {
  const divClasses = classNames(
    "shadow-custom border-[.5px] border-secondary rounded-4 w-full z-20 bg-white",
    className
  );

  return (
    <div className={divClasses}>
      {children}
    </div>
  );
}

export default FloatingCard;

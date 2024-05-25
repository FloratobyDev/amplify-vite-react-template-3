import Paragraph from "./Paragraph";

type Props = {
  name: string;
  status: string;
};

function ConnectionAcceptanceNotification({ name, status }: Props) {
  return (
    <div className="flex gap-x-1">
      <div className="min-h-8 min-w-10 rounded-4 bg-secondary mr-0.5" />
      <Paragraph>
        <span className="font-bold">{name}</span> has {status} your connection.
      </Paragraph>
    </div>
  );
}

export default ConnectionAcceptanceNotification;

import { useEffect, useRef, useState } from "react";
import Cancel01Icon from "../logos/Cancel01Icon";
import Tick02Icon from "../logos/Tick02Icon";
import Paragraph from "./Paragraph";
import animejs from "animejs";

type Props = {
  name: string;
  Accept: () => void;
  Decline: () => void;
};

function ConnectionRequestNotification({ name, Accept, Decline }: Props) {
  const [hasDecided, setHasDecided] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleAcceptRequest() {
    Accept();
    setHasDecided(true);
  }

  function handleDeclineRequest() {
    Decline();
    setHasDecided(true);
  }

  useEffect(() => {
    if (ref.current === null) return;

    if (hasDecided) {
      animejs({
        targets: ref.current,
        opacity: 0,
        height: 0,
        duration: 100,
        easing: "easeInOutQuad",
        complete: () => {
          if (ref.current) ref.current.style.display = "none";
        },
      });
    }
  }, [hasDecided]);

  return (
    <div ref={ref} className="flex gap-x-1 overflow-hidden ">
      <div className="min-h-8 min-w-10 rounded-4 bg-secondary mr-0.5" />
      <Paragraph>
        <span className="font-bold">{name}</span> wants to connect with you.
      </Paragraph>
      <div className="flex gap-x-0.5">
        <button
          className="gap-x-2 p-1.5 rounded-4 cursor-pointer border-secondary border hover:bg-secondary hover:text-white transition-all hover:border-transparent"
          onClick={handleAcceptRequest}
        >
          <Tick02Icon />
        </button>
        <button
          className="gap-x-2 p-1.5 rounded-4 cursor-pointer border-secondary border hover:bg-secondary hover:text-white transition-all hover:border-transparent"
          onClick={handleDeclineRequest}
        >
          <Cancel01Icon />
        </button>
      </div>
    </div>
  );
}

export default ConnectionRequestNotification;

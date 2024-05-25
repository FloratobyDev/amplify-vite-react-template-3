import { useRef, useState } from "react";
import MessageInformation from "./MessageInformation";
import useOutsideClick from "../../hooks/useClickOutside";
import { useMessage } from "../../context/MessageProvider";

function MessageManager() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { currentMessagingUsers, setCurrentMessagingUsers } = useMessage();

  function onUserClick(userId: string) {
    return () => {
      if (currentMessagingUsers.includes(userId)) return;

      
      setCurrentMessagingUsers((prev) => {
        return [...prev, userId];
      });

    };
  }

  useOutsideClick(ref, show, handleShow);

  function handleShow() {
    setShow(!show);
  }
  return (
    <div className="relative flex" ref={ref}>
      {show && (
        <MessageInformation onClose={handleShow} onUserClick={onUserClick} />
      )}
      <div
        onClick={handleShow}
        role="button"
        className="h-12 w-12 min-w-12 rounded-full bg-secondary"
      />
    </div>
  );
}

export default MessageManager;

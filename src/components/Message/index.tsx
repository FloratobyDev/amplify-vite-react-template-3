import MessageInformation from "./MessageInformation";
import { useMessage } from "../../context/MessageProvider";

function CurrentMessageUsers() {
  const { currentMessagingUsers } = useMessage();


  return (
    <>
      {currentMessagingUsers.map((userId) => {
        return <MessageInformation key={userId} userId={userId} />;
      })}
    </>
  );
}

export default CurrentMessageUsers;

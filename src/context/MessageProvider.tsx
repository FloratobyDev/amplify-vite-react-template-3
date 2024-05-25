/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type MessageProps = {
  currentMessagingUsers: string[];
  setCurrentMessagingUsers: Dispatch<SetStateAction<string[]>>;
  onUserClick: (userId: string) => () => void;
};

type Props = {
  children: React.ReactNode;
};

export const MessageContext = createContext<MessageProps | undefined>(
  undefined
);

function MessageProvider({ children }: Props) {
  const [currentMessagingUsers, setCurrentMessagingUsers] = useState<string[]>(
    []
  );

  const onUserClick = useCallback(
    (userId: string) => {
      return () => {
        if (currentMessagingUsers.includes(userId)) return;
        setCurrentMessagingUsers((prev) => {
          return [...prev, userId];
        });
      };
    },
    [currentMessagingUsers, setCurrentMessagingUsers]
  );

  const value: MessageProps = useMemo(
    () => ({ currentMessagingUsers, setCurrentMessagingUsers, onUserClick }),
    [currentMessagingUsers, onUserClick]
  );

  return (
    <MessageContext.Provider value={value}>
      <div className="fixed bottom-0 right-0 mr-9 mb-9">
        <div className="flex flex-col gap-y-2">{children}</div>
      </div>
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
}

export default MessageProvider;

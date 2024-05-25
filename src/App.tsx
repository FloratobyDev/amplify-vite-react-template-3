import { useAuth } from "./context/AuthProvider";
import { useEffect, useState } from "react";
import Paragraph from "./components/Paragraph";
import MessageManager from "./components/MessageManager";
import MessageProvider from "./context/MessageProvider";
import CurrentMessageUsers from "./components/Message";
import Button from "./components/Button";
import Title from "./components/Title";
import classNames from "classnames";
import AppNavbar from "./page-parts/AppNavbar";
import AppProfileSetup from "./page-parts/AppProfileSetup";
import AppCategoryList from "./page-parts/AppCategoryList";
import AppDropdownList from "./page-parts/AppDropdownList";
import { CategoryListType } from "./types";
import AppProfileList from "./page-parts/AppProfileList";
import { ProfileType } from "./types";
import { useClient } from "./hooks/useClient";

type PendingType = {
  id: string;
  connectionStatus: string;
};

function App() {
  // const [messages, setMessages] = useState<Array<Schema["Message"]["type"]>>([]);

  // useEffect(() => {
  //     client.models.Message.list({
  //       filter: {
  //         roomId: {
  //           eq: "1",
  //         },
  //       },
  //     }).then((messages) => {
  //       setMessages(messages.data);
  //     }).catch((error) => {
  //       console.error("Error fetching messages:", error);
  //     });

  //   const sub = client.models.Message.onCreate({
  //     filter: {
  //       roomId: {
  //         eq: "1",
  //       },
  //     },
  //   }).subscribe({
  //     next: (msg) => {
  //       console.log("New message:");
  //       setMessages((prevMessages) => [...prevMessages, msg]);
  //     },
  //     error: (error) => {
  //       console.error("Error subscribing to messages:", error);
  //     },
  //   });
  //   return () => sub.unsubscribe();
  // }, []);

  // useEffect(() => {
  //   client.models.ConnectionRequest.onUpdate({
  //     filter: {
  //       receiverId: {
  //         eq: "1",
  //       },
  //     },
  //   }).subscribe({
  //     next: (msg) => {
  //       console.log("Connection request updated:");
  //       console.log(msg);
  //     },
  //     error: (error) => {
  //       console.error("Error subscribing to connection requests:", error);
  //     },
  //   });
  // }, []);
  const { userInformation } = useAuth();
  const { client } = useClient();

  const [profiles, setProfiles] = useState<ProfileType[]>([]);

  useEffect(() => {
    async function fetchConnectionRequests(receiverId: string) {
      return await new Promise((resolve) => {
        userInformation?.connectionRequests().then((connectionResponse) => {
          const userData = connectionResponse.data.find(
            (request) => request.receiverId === receiverId
          );
          if (userData) {
            resolve({
              id: receiverId,
              connectionStatus: userData.status,
            });
          } else {
            resolve({
              id: receiverId,
              connectionStatus: "connect",
            });
          }
        });
      });
    }

    async function fetchConnectionReceived() {
      return await new Promise((resolve) => {
        userInformation?.connectionReceived().then((connectionResponse) => {
          resolve(connectionResponse.data);
        });
      });
    }

    fetchConnectionReceived();

    client.models.User.list({
      filter: {
        id: {
          ne: userInformation?.id,
        },
      },
    })
      .then(async (users) => {
        const newProfiles: ProfileType[] = [];
        const pendingValues: PendingType[] = [];

        const connections = await userInformation?.connections();
        console.log("connections", connections);

        const filteredConnections = users.data.filter(
          (e) => !connections?.data.some((c) => c.connectionId === e.id)
        );

        const userWithPendingStatus = filteredConnections.map((e) =>
          fetchConnectionRequests(e.id)
        );

        await Promise.all(userWithPendingStatus).then((values) => {
          pendingValues.push(...(values as PendingType[]));
        });

        filteredConnections.map((user) => {
          const shortInfoList = [
            user.gender || "",
            String(user.age) || "",
            user.race || "",
          ];
          const shortDescription = user.aboutMe || "No Description";
          const name = user.fullName || "No Name";
          const overallRating = "4.5";

          const connectionStatus = pendingValues.find(
            (e) => e.id === user.id
          )?.connectionStatus;

          newProfiles.push({
            id: user.id,
            connectionStatus: connectionStatus || "none",
            name,
            overallRating,
            shortInfoList,
            shortDescription,
          });
        });

        setProfiles((prev) => [...prev, ...newProfiles]);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [
    client.models.ConnectionRequest,
    client.models.User,
    userInformation,
    userInformation?.id,
  ]);

  const [feedFilters, setFeedFilters] = useState<CategoryListType>({
    category: "",
    interest: "",
    country: "",
    age: "",
  });

  const [dropdownOptions] = useState({
    country: ["Country 1", "Country 2", "Country 3"],
    age: ["Age 1", "Age 2", "Age 3"],
    interest: ["Interest 1", "Interest 2", "Interest 3"],
    race: ["Race1", "Race2", "Race3"],
  });

  // const [activeLabel, setActiveLabel] = useState<string>("Category");
  const labels = [
    "Taiwanse",
    "Japanese",
    "Chinese",
    "Korean",
    "Thai",
    "Vietnamese",
    "Filipino",
    "Indian",
  ];

  function handleLabel(label: string) {
    return () => {
      setFeedFilters((prev) => {
        return { ...prev, category: label };
      });
    };
  }

  const [closeProfile, setCloseProfile] = useState<boolean>(
    localStorage.getItem("closeProfile") === "true" ? true : false
  );

  useEffect(() => {
    if (closeProfile) {
      console.log("Close Profile Setup");
    }
  }, [closeProfile]);

  const divClasses = classNames("mx-auto py-8 flex flex-col gap-y-4", {
    "w-[60%]": closeProfile,
    "w-[70%]": !closeProfile,
  });

  return (
    <div className="h-screen">
      <AppNavbar />
      <div className={divClasses}>
        <div className="flex gap-y-4 gap-x-8">
          <AppProfileSetup
            closeProfile={closeProfile}
            setCloseProfile={setCloseProfile}
          />
          <div className="flex flex-col gap-y-4 flex-1">
            <AppCategoryList
              labels={labels}
              activeLabel={feedFilters.category}
              handleLabel={handleLabel}
            />
            <AppDropdownList
              feedFilters={feedFilters}
              setFeedFilters={setFeedFilters}
              dropdownOptions={dropdownOptions}
            />
            <Title>Recommended</Title>
            <AppProfileList profiles={profiles} />
            <div className="flex items-center justify-center my-6">
              <Button onClick={() => {}}>
                <div className="px-4 py-1 bg-secondary rounded-4 hover:scale-[105%] transition-all">
                  <Paragraph>Load more</Paragraph>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MessageProvider>
        <CurrentMessageUsers />
        <MessageManager />
      </MessageProvider>
    </div>
  );
}

export default App;

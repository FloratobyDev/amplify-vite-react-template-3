import SubTitle from "./SubTitle";
import Badge from "./Badge";
import Italic from "./Italic";
import Paragraph from "./Paragraph";
import Link02Icon from "../logos/Link02Icon";
import { useState } from "react";
import classNames from "classnames";
import Modal from "./Modal";
import FloatingCard from "./FloatingCard";
import Button from "./Button";
import Cancel01Icon from "../logos/Cancel01Icon";
import ProfileLogo from "../logos/ProfileLogo";
import Pill from "./Pill";
import FilledStarIcon from "../logos/FilledStarIcon";
import { ProfileType } from "../types";
import { useAuth } from "../context/AuthProvider";
import { useClient } from "../hooks/useClient";
import { MouseEvent } from "react";

type Props = {
  profile: ProfileType;
};

function ProfileCard({
  profile: {
    connectionStatus,
    id,
    name,
    overallRating,
    shortInfoList,
    shortDescription,
  },
}: Props) {
  const shortInfoStringWithCommas = shortInfoList.join(", ");
  const [showModal, setShowModal] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const { userInformation } = useAuth();
  const { client } = useClient();

  function handleShowClose() {
    setShowClose(true);
  }

  function handleHideClose() {
    setShowClose(false);
  }

  const divClasses = classNames(
    "cursor-pointer hover:shadow-custom px-2 py-1 gap-x-2 absolute top-2 right-2 bg-white rounded-4",
    {
      hidden: !showClose,
      flex: showClose,
    }
  );

  function handleModal() {
    setShowModal(!showModal);
  }

  async function submitConnectionRequest(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();

    console.log("Connection Request Submitted", userInformation?.id, id);
    if (!userInformation?.id || !id) return;

    const requestResponse = await client.models.ConnectionRequest.create({
      senderId: userInformation.id,
      receiverId: id,
      status: "pending",
    });
    const receivedResponse = await client.models.ConnectionReceived.create({
      receiverId: id,
      senderId: userInformation.id,
      status: "pending",
    });

    console.log("Request Response:", requestResponse);
    console.log("Received Response:", receivedResponse);
  }

  return (
    <>
      <Modal isOpen={showModal}>
        <FloatingCard className="max-w-[50%] w-[50%] bg-blue-200">
          <div className="flex justify-between items-center gap-y-1 px-5 py-2 border-b border-b-secondary">
            <SubTitle>Profile Information</SubTitle>
            <div className="flex items-center gap-x-2">
              <Button onClick={submitConnectionRequest}>
                <div className="px-4 py-1 bg-secondary rounded-4 hover:scale-[105%] transition-all">
                  <Paragraph className="capitalize">
                    {connectionStatus}
                  </Paragraph>
                </div>
              </Button>
              <Button onClick={handleModal}>
                <Cancel01Icon />
              </Button>
            </div>
          </div>
          <div className="flex">
            <div className="border-r border-r-secondary flex-1 flex">
              <div className=" basis-1/3 p-5">
                <div className="h-32 rounded-4 bg-secondary" />
                <div className="flex justify-between items-center py-2">
                  <Paragraph bold>{name}</Paragraph>
                  <Badge label={overallRating} />
                </div>
                <div className="flex flex-col gap-y-1 mb-6">
                  <div className="flex gap-x-2 items-center">
                    <ProfileLogo />
                    <Paragraph>Profile</Paragraph>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <ProfileLogo />
                    <Paragraph>Profile</Paragraph>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <ProfileLogo />
                    <Paragraph>Profile</Paragraph>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <Paragraph bold>Achievements</Paragraph>
                  <div className="flex flex-wrap gap-1">
                    <Pill label="Rookie" />
                    <Pill label="Ice Breakerss" />
                    <Pill label="Master" />
                    <Pill label="Rookie" />
                    <Pill label="Rookie" />
                    <Pill label="Master" />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col text-left p-5 gap-y-3">
                <div className="flex flex-col gap-y-1">
                  <Paragraph bold>About Me</Paragraph>
                  <Paragraph>
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries for previewing
                    layouts and visual mockups.Lorem ipsum is placeholder text
                    commonly used in the graphic, print, and publishing
                    industries for previewing layouts and visual mockups.Lorem
                    ipsum is placeholder text commonly used in the graphic,
                    print, and publishing industries for previewing layouts and
                    visual mockups.
                  </Paragraph>
                </div>
                <div className="flex flex-col gap-y-1">
                  <Paragraph bold>Ethnicity</Paragraph>
                  <Paragraph>
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries for previewing
                    layouts and visual mockups.Lorem ipsum is placeholder text
                    commonly used in the graphic, print, and publishing
                    industries for previewing layouts and visual mockups.Lorem
                    ipsum is placeholder text commonly used in the graphic,
                    print, and publishing industries for previewing layouts and
                    visual mockups.
                  </Paragraph>
                </div>
                <div className="flex flex-col gap-y-1">
                  <Paragraph bold>Race</Paragraph>
                  <Paragraph>
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries for previewing
                    layouts and visual mockups.Lorem ipsum is placeholder text
                    commonly used in the graphic, print, and publishing
                    industries for previewing layouts and visual mockups.Lorem
                    ipsum is placeholder text commonly used in the graphic,
                    print, and publishing industries for previewing layouts and
                    visual mockups.
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className="basis-1/4 p-5 text-left flex flex-col gap-y-1 overflow-auto">
              <Paragraph bold>Reviews</Paragraph>
              <div className="flex flex-col items-start gap-y-0.5 overflow-auto">
                <Paragraph>Anna Hathaway</Paragraph>
                <div className="flex">
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                </div>
                <Paragraph>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups...
                </Paragraph>
              </div>
              <div className="flex flex-col items-start gap-y-0.5">
                <Paragraph>Anna Hathaway</Paragraph>
                <div className="flex">
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                </div>
                <Paragraph>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups...
                </Paragraph>
              </div>
              <div className="flex flex-col items-start gap-y-0.5">
                <Paragraph>Anna Hathaway</Paragraph>
                <div className="flex">
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                </div>
                <Paragraph>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups...
                </Paragraph>
              </div>
              <div className="flex flex-col items-start gap-y-0.5">
                <Paragraph>Anna Hathaway</Paragraph>
                <div className="flex">
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                  <FilledStarIcon />
                </div>
                <Paragraph>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups...
                </Paragraph>
              </div>
            </div>
          </div>
        </FloatingCard>
      </Modal>
      <div
        onClick={handleModal}
        onMouseEnter={handleShowClose}
        onMouseLeave={handleHideClose}
        className="cursor-pointer relative"
      >
        <div className="h-32 rounded-4 bg-secondary w-full mb-1.5 gap-y-4 relative">
          <div
            className={divClasses}
            role="button"
            onClick={(e: MouseEvent<HTMLElement>) => submitConnectionRequest(e)}
          >
            <Link02Icon />
            <Paragraph className="capitalize">{connectionStatus}</Paragraph>
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex w-full justify-between items-center">
            <SubTitle>{name}</SubTitle>
            <Badge label={overallRating} />
          </div>
          <Italic>{shortInfoStringWithCommas}</Italic>
        </div>
        <Paragraph>
          {shortDescription.length > 200
            ? shortDescription.slice(0, 200) + "..."
            : shortDescription}
        </Paragraph>
      </div>
    </>
  );
}

export default ProfileCard;

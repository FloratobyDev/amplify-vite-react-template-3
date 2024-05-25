import { useRef, useState, MouseEvent } from "react";
import ArrowUpRight01Icon from "../../logos/ArrowUpRight01Icon";
import Cancel01Icon from "../../logos/Cancel01Icon";
import Navigation03Icon from "../../logos/Navigation03Icon";
import Button from "../Button";
import FloatingCard from "../FloatingCard";
import Paragraph from "../Paragraph";
import Search from "../Search";
import useOutsideClick from "../../hooks/useClickOutside";
import { useMessage } from "../../context/MessageProvider";
import classNames from "classnames";
import SubParagraph from "../SubParagraph";
import Modal from "../Modal";

type Props = {
  userId: string;
};

function MessageInformation({ userId }: Props) {
  const [show, setShow] = useState(false); // [1
  const ref = useRef<HTMLDivElement>(null);
  const { setCurrentMessagingUsers } = useMessage();

  useOutsideClick(ref, show, handleShow);

  function handleShow() {
    setShow(!show);
  }

  function handleCloseMessage(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    console.log("close message");
    setCurrentMessagingUsers((prev) => {
      const newUsers = prev.filter((user) => user !== userId);
      console.log(newUsers);
      return newUsers;
    });
  }

  const [showClose, setShowClose] = useState(false);

  function handleShowClose() {
    setShowClose(true);
  }

  function handleHideClose() {
    setShowClose(false);
  }

  const closeClasses = classNames(
    "absolute -top-1 -right-1 h-5 w-5 rounded-full border border-secondary p-0.5 items-center justify-center bg-white hover:scale-[110%] transtion-all",
    {
      hidden: !showClose,
      flex: showClose,
    }
  );

  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(!showModal);
  }

  function openModalFromButton() {
    setShow(false);
    setShowModal(true);
  }

  return (
    <>
      <Modal isOpen={showModal}>
        <div className="bg-secondary rounded-4 p-2">
          <Button onClick={handleModal}>
            <Cancel01Icon />
          </Button>
        </div>
      </Modal>
      <div className="relative flex" ref={ref}>
        {show && (
          <FloatingCard className="absolute flex flex-col bottom-0 right-16 min-w-[254px]">
            <div className="flex justify-between items-center p-2">
              <Paragraph>{userId}</Paragraph>
              <div className="flex gap-x-0.5">
                <Button onClick={openModalFromButton}>
                  <ArrowUpRight01Icon />
                </Button>
                <Button onClick={handleShow}>
                  <Cancel01Icon />
                </Button>
              </div>
            </div>
            <div className="h-[216px] border-y-0.5 border-secondary overflow-auto">
              <div className="p-2">
                <div>
                  <div className="bg-secondary rounded-4 p-2 w-[80%]">
                    <Paragraph>
                      Lorem ipsum is placeholder Lorem ipsum is placeholder
                    </Paragraph>
                  </div>
                  <SubParagraph>2:30 p.m</SubParagraph>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-secondary rounded-4 p-2 w-[80%]">
                    <Paragraph>
                      Lorem ipsum is placeholder Lorem ipsum is placeholder
                    </Paragraph>
                  </div>
                  <SubParagraph>2:30 p.m</SubParagraph>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-secondary rounded-4 p-2 w-[80%]">
                    <Paragraph>
                      Lorem ipsum is placeholder Lorem ipsum is placeholder
                    </Paragraph>
                  </div>
                  <SubParagraph>2:30 p.m</SubParagraph>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-secondary rounded-4 p-2 w-[80%]">
                    <Paragraph>
                      Lorem ipsum is placeholder Lorem ipsum is placeholder
                    </Paragraph>
                  </div>
                  <SubParagraph>2:30 p.m</SubParagraph>
                </div>
              </div>
            </div>
            <div className="flex gap-x-1 justify-between p-1">
              <Search
                autoFocus
                placeholder="Type a message..."
                onChange={() => {
                  throw new Error("Function not implemented.");
                } } value={""}              />
              <div className="px-2 border border-secondary rounded-4 flex items-center justify-center">
                <Navigation03Icon />
              </div>
            </div>
          </FloatingCard>
        )}
        <div
          onMouseEnter={handleShowClose}
          onMouseLeave={handleHideClose}
          onClick={handleShow}
          role="button"
          className="h-12 w-12 min-w-12 rounded-full bg-secondary relative"
        >
          <div onClick={handleCloseMessage} className={closeClasses}>
            <Cancel01Icon />
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageInformation;

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

type PropType = {
  isOpen: boolean;
  onClose: () => void;
  eventUrl: string;
};

const SuccessModal: React.FC<PropType> = ({ isOpen, onClose, eventUrl }) => {
   
  const handleCopyText = (text: string) => {
    // Use the Clipboard API to copy text
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent width={"fit"}>
          <ModalHeader>Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <section className="space-y-3">
              <p className="text-sm font-medium text-black/70 flex flex-col items-start gap-2 flex-wrap">
                <span className="text-start text-black/90">
                  You have successfully registered your event congratulations!
                </span>
                <span className="text-start">
                  Below is your event registration Url
                </span>
              </p>
              <Tooltip hasArrow label="Click To Copy" aria-label="A tooltip" bg='gray.300' color='black' placement="top">
                <p
                  onClick={() => handleCopyText(eventUrl)}
                  className="text-sm text-black/90 font-semibold text-wrap block cursor-pointer"
                >
                  {eventUrl}
                </p>
              </Tooltip>
              <p className="text-sm font-medium">
                Share these with your guests to register for the event. You can
                see the link in your email or in the <span className="font-semibold border px-1 bg-slate-100">dashboard / analysis tab /
                events</span> 
              </p>
            </section>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessModal;

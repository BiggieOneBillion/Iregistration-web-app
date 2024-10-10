import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import EditEventForm from "./EditEvent";
import React from "react";
import { IEvent } from "./EventDetail";

type Props = {
    info :IEvent
}

const EditFormModal:React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen} className="flex items-center gap-1 border px-1">
        <span className="text-sm">Edit Form</span>
        <span><CiEdit /></span>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={'30px 30px'}>
              <EditEventForm formInfo={props.info} onClose={onClose}/>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditFormModal

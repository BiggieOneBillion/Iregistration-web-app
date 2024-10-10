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
import React from "react";

type Props = {
  event: {
    _id: string;
    userId: string;
    name: string;
    location: string;
    type: object[] | [];
    noOfAttendees: number;
    date: string;
    startTimes: [];
    endTimes: [];
    eventImg: string;
    title: string;
    description: string;
    registrationStartDate: string;
    registrationEndDate: string;
    registrationUrl: string;
    __v: number;
  };
};

const EventDetailsModal: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

//   console.log(Object.entries(props.event));
  

  return (
    <>
      <button
        onClick={onOpen}
        className="inline-block px-1 border rounded-sm text-sm bg-black/60 text-white hover:bg-black/80 transition-all duration-300"
      >
        More details ...
      </button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-10  mx-auto">
                {/* <div className="text-start mb-10">
                  {/* <h1 className="sm:text-3xl text-2xl font-medium text-start title-font text-gray-900 mb-4">
                    Raw Denim Heirloom Man Braid
                  </h1>
                  <p className="text-base">
                    Blue bottle crucifix vinyl post-ironic four dollar toast
                    vegan taxidermy. Gastropub indxgo juice poutine, ramps
                    microdosing banh mi pug.
                  </p> 
                  <img
                    src={props.event.eventImg}
                    alt="event image"
                    className="h-[200px] w-full object-cover"
                  />
                </div> */}
                <div className=" grid grid-cols-2">
                  {Object.entries(props.event).map((el) => (
                    <div className="p-2 w-full">
                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                        <span className="title-font font-medium">
                          Authentic Cliche Forage
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

export default EventDetailsModal;

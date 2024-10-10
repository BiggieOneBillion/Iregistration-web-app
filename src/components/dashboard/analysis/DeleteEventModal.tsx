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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userProp, userStore } from "../../../store/GlobalStore";

const DeleteEventModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const queryClient = useQueryClient();

  const { id } = useParams();

  const navigate = useNavigate();

  const token = userStore((state) => (state as userProp).token);

  // Function to delete a user by ID
  const deleteUser = async (id: string) => {
    return await axios.delete(`http://localhost:3000/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Define the mutation
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // show success toast
      toast({
        position: "top",
        title: "Event deleted successfully",
        description: "Deleted",
        status: "success",
        duration: 2000,
      });
      // Invalidate and refetch the 'users' query after a successful delete
      queryClient.invalidateQueries();
      //  close modal
      onClose();
      //  navigate one step backwards
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
      // show error toast
      toast({
        position: "top",
        title: "Operation Unsuccessful",
        description: "Try Again",
        status: "error",
        duration: 2000,
      });
    },
  });

  const handleDelete = (userId: string) => {
    // Call the mutate function to trigger the deletion
    mutate(userId);
  };

  return (
    <>
      <Button padding={"5px 100px"} variant={"DeleteOutline"} onClick={onOpen}>
        Delete Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay border={"1px solid red"} />
        <ModalContent border={"1px solid red"}>
          {/* <ModalHeader>Delete Event</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <section className="pt-10">
              <h2 className="text-lg font-medium text-black/90">
                Are you sure you want to delete this event?
              </h2>
            </section>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="DeleteOutline"
              isLoading={isPending}
              loadingText={"Deleting..."}
              onClick={() => handleDelete(id as string)}
            >
              Delete Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteEventModal;

import React from "react";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { User, Mail, X } from "lucide-react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("user", user);

  return (
    <>
      {children ? (
        <Box as="span" onClick={onOpen} cursor="pointer">
          {children}
        </Box>
      ) : (
        <IconButton
          icon={<User />}
          onClick={onOpen}
          aria-label="View Profile"
          variant="ghost"
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl" boxShadow="xl">
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            borderBottom="1px solid"
            borderColor="gray.200"
            pb={4}
          >
            User Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="center" py={4}>
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.imageUrl}
                alt={user.name}
                fallbackSrc="https://via.placeholder.com/150"
                border="4px solid"
                borderColor="blue.500"
              />
              <VStack spacing={2} align="center">
                <HStack>
                  <User size={20} />
                  <Text fontSize="xl" fontWeight="semibold">
                    {user.name}
                  </Text>
                </HStack>
                <HStack>
                  <Mail size={20} />
                  <Text fontSize="md" color="gray.600">
                    {user.email}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderTop="1px solid" borderColor="gray.200" pt={4}>
            <Button
              leftIcon={<X size={18} />}
              onClick={onClose}
              colorScheme="blue"
              variant="outline"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

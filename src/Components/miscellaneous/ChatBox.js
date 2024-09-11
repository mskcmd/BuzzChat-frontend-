import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { Users } from "lucide-react";
import SingleChat from "./SingleChat";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      h="100%"
    >
      {selectedChat ? (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
          flexDirection="column"
        >
          <Avatar size="xl" icon={<Users />} bg="teal.500" mb={4} />
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="gray.600">
            Click on a user to start chatting
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default ChatBox;
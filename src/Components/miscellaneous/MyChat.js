import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast, Flex, Divider } from "@chakra-ui/react";
import axios from "axios";
import { MessageSquare, Users, Plus } from "lucide-react";
import { getSender } from "../../Config/ChatLogics";
import ChatLoading from "../ChatLoading";
import GroupChatModel from "./GroupChatModel";

function MyChat({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT;
      const endpoint = "/api/chat";
      const url = `${baseURL}${endpoint}`

      const { data } = await axios.get(url, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", sm:"100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="lg"
      height="88vh"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        pb={3}
        px={3}
        fontSize={{ base: "20px", md: "24px" }}
        fontWeight="bold"
        bg="white"
        position="sticky"
        top={0}
        zIndex={1}
        boxShadow="sm"
      >
        <Flex alignItems="center">
          <MessageSquare size={24} color="#38B2AC" />
          <Text ml={2}>My Chats</Text>
        </Flex>
        <GroupChatModel>
          <Button
            size="sm"
            fontSize={{ base: "14px", md: "16px" }}
            rightIcon={<Plus size={16} />}
            colorScheme="teal"
            variant="outline"
            _hover={{ bg: "teal.50" }}
          >
            New Group
          </Button>
        </GroupChatModel>
      </Flex>
      <Divider mb={3} />
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        borderRadius="lg"
        flex="1"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#38B2AC',
            borderRadius: '24px',
          },
        }}
      >
        {chats ? (
          <Stack spacing={3}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "white"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                _hover={{ bg: selectedChat === chat ? "#319795" : "#E6FFFA" }}
                key={chat._id}
                boxShadow="sm"
                transition="all 0.2s"
              >
                <Flex alignItems="center">
                  {chat.isGroupChat ? (
                    <Users size={20} style={{ marginRight: '8px' }} />
                  ) : (
                    <MessageSquare size={20} style={{ marginRight: '8px' }} />
                  )}
                  <Text fontWeight="medium">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChat;
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
  Avatar,
} from "@chakra-ui/react";
import { ArrowLeft, Send, Users, User } from "lucide-react";
import UpdateGroupChatModal from "../../Components/miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import "../Style/Style.css";
import ScrollableChat from "../ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const toast = useToast();
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error("Failed to load messages", error);
      toast({
        title: "Error Occurred!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage) {
      socket.emit("stop typing", selectedChat._id);

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setNewMessage("");
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Occurred!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  console.log("selectedChat", selectedChat?.users[1].name);

  return (
    <Box
      display="flex"
      flexDirection="column"
      h="100%"
      w="100%"
      bg="gray.50"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        p={4}
        boxShadow="sm"
      >
        <Flex alignItems="center">
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<ArrowLeft />}
            onClick={() => setSelectedChat(null)}
            mr={2}
          />
          {selectedChat.isGroupChat ? (
            <Avatar icon={<Users />} bg="teal.500" mr={2} />
          ) : (
            
            <Avatar icon={<User />} bg="blue.500" mr={2} />
          )}
          <Text fontSize="xl" fontWeight="bold">
            {selectedChat.isGroupChat
              ? selectedChat.chatName.toUpperCase()
              : selectedChat?.users[1].name}
          </Text>
        </Flex>
        {selectedChat.isGroupChat && (
          <UpdateGroupChatModal
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            fetchMessages={fetchMessages}
          />
        )}
      </Flex>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        p={3}
        bg="#E9E9E9"
        w="100%"
        h="calc(100% - 70px)"
        overflowY="hidden"
      >
        {loading ? (
          <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
        ) : (
          <div className="messages">
            <ScrollableChat messages={messages} />
          </div>
        )}
        <FormControl mt={3}>
          {istyping && (
            <Box mb={2}>
              <Lottie
                options={defaultOptions}
                width={70}
                style={{ marginBottom: 15, marginLeft: 0 }}
              />
            </Box>
          )}
          <Flex>
            <Input
              variant="filled"
              bg="white"
              placeholder="Enter a message..."
              onChange={typingHandler}
              value={newMessage}
              onKeyDown={sendMessage}
              borderRadius="full"
              mr={2}
            />
            <IconButton
              colorScheme="teal"
              aria-label="Send message"
              icon={<Send />}
              onClick={sendMessage}
              borderRadius="full"
            />
          </Flex>
        </FormControl>
      </Box>
    </Box>
  );
}

export default SingleChat;

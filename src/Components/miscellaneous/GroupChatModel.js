// import {
//   Box,
//   Button,
//   FormControl,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
// import React, { useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import { ChatState } from "../../Context/ChatProvider";
// import UserBadgeItem from "../../userAvatar/UserBadgeItem";
// import UserListItem from "../../userAvatar/UserListItem";

// function GroupChatModel({ children }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [groupChatName, setGroupChatName] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const toast = useToast();
//   const { user, chats, setChats } = ChatState();

//   const handleSearch = async (query) => {
//     setSearch(query);
//     if (!query) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(`/api/user?search=${query}`, config);
//       setLoading(false);
//       if (data) setSearchResults(data);
//     } catch (error) {
//       setLoading(false);
//       toast({
//         title: "Error fetching users",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const handleGroup = async (userToAdd) => {
//     console.log("nhj", selectedUsers);

//     if (selectedUsers.includes(userToAdd)) {
//       toast({
//         title: "User already added",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     setSelectedUsers([...selectedUsers, userToAdd]);
//   };

//   const handleDelete = async (delUser) => {
//     setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
//   };

//   const handleSubmit = async () => {
//     if (!groupChatName || selectedUsers.length === 0) {
//       toast({
//         title: "Please fill all the fields",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.post(
//         `/api/chat/group`,
//         {
//           name: groupChatName,
//           users: JSON.stringify(selectedUsers.map((u) => u._id)),
//         },
//         config
//       );

//       setChats([data, ...chats]);
//       onClose();
//       toast({
//         title: "New Group Chat Created!",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     } catch (error) {
//       toast({
//         title: "Failed to Create the Chat!",
//         description: error.response.data,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };

//   return (
//     <>
//       <span onClick={onOpen}>{children}</span>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader fontSize={"35px"} display="flex" justifyContent="center">
//             Create Group Chat
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody display="flex" flexDir="column" alignItems="center">
//             <FormControl>
//               <Input
//                 placeholder="Chat Name"
//                 mb={3}
//                 value={groupChatName}
//                 onChange={(e) => setGroupChatName(e.target.value)}
//               />
//             </FormControl>
//             <FormControl>
//               <Input
//                 placeholder="Add User"
//                 mb={1}
//                 value={search}
//                 onChange={(e) => handleSearch(e.target.value)}
//               />
//             </FormControl>
//             <Box w={"100%"} display="flex" flexWrap={"wrap"} mb={3}>
//               {selectedUsers.map((user) => (
//                 <UserBadgeItem
//                   key={user._id}
//                   user={user}
//                   handleFunction={() => handleDelete(user)}
//                 />
//               ))}
//             </Box>

//             {loading ? (
//               <div>Loading...</div>
//             ) : searchResults.length > 0 ? (
//               searchResults
//                 .slice(0, 4)
//                 .map((item) => (
//                   <UserListItem
//                     key={item._id}
//                     item={item}
//                     handleFunction={() => handleGroup(item)}
//                   />
//                 ))
//             ) : (
//               <div>No users found</div>
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" onClick={handleSubmit}>
//               Create Group
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// GroupChatModel.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default GroupChatModel;

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Users, Search, X, Plus } from "lucide-react";
import axios from "axios";
import PropTypes from "prop-types";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../../userAvatar/UserBadgeItem";
import UserListItem from "../../userAvatar/UserListItem";

function GroupChatModel({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      if (data) setSearchResults(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error fetching users",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
            <HStack justifyContent="center" spacing={2}>
              <Users size={24} />
              <Text>Create Group Chat</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            {" "}
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User"
                mb={1}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w={"100%"} display="flex" flexWrap={"wrap"} mb={3}>
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading...</div>
            ) : searchResults.length > 0 ? (
              searchResults
                .slice(0, 4)
                .map((item) => (
                  <UserListItem
                    key={item._id}
                    item={item}
                    handleFunction={() => handleGroup(item)}
                  />
                ))
            ) : (
              <div>No users found</div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<Plus size={18} />}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

GroupChatModel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GroupChatModel;

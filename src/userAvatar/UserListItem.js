import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text, Flex, Spacer } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { Tooltip } from "@chakra-ui/tooltip";
import { User, Mail, MessageCircle } from "lucide-react";

const UserListItem = ({ handleFunction, item }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="white"
      _hover={{
        bg: "blue.50",
        transform: "translateY(-2px)",
        boxShadow: "md",
      }}
      w="100%"
      p={4}
      mb={3}
      borderRadius="xl"
      transition="all 0.3s"
      boxShadow="sm"
      border="1px"
      borderColor="gray.200"
    >
      <Flex alignItems="center">
        <Avatar
          size="md"
          name={item?.name}
          src={item?.imageUrl}
          bg="blue.500"
          color="white"
        />
        <Box ml={4}>
          <Flex alignItems="center">
            <Icon as={User} color="blue.500" mr={2} />
            <Text fontWeight="bold" fontSize="lg">
              {item?.name}
            </Text>
          </Flex>
          <Flex alignItems="center" mt={1}>
            <Icon as={Mail} color="gray.500" mr={2} />
            <Text fontSize="sm" color="gray.600">
              {item?.email}
            </Text>
          </Flex>
        </Box>
        <Spacer />
        <Tooltip label="Start a conversation" hasArrow>
          <Box
            as="button"
            p={2}
            borderRadius="full"
            bg="blue.100"
            color="blue.500"
            _hover={{ bg: "blue.200" }}
          >
            <Icon as={MessageCircle} />
          </Box>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default UserListItem;

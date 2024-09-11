import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';

function UserBadgeItem({ user, handleFunction }) {
  // Ensure the user object is defined before logging it
  if (user) {
    console.log("UserBadgeItem:", user);
  } else {
    console.error("UserBadgeItem received undefined user");
  }

  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize="12px"
      backgroundColor="purple"
      color={"red"}
      cursor="pointer"
      onClick={handleFunction}
    >
      {user?.name}
      <CloseIcon pl={1} />
    </Box>
  );
}

export default UserBadgeItem;

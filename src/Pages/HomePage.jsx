import React, { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import LoginPage from "../Components/Authentication/LoginPage";
import SignupPage from "../Components/Authentication/SignupPage";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (userInfo) {
      navigate("/chat");
    }
  }, [navigate]);
  return (
    <Container maxW="50%" centerContent mt={20}>
      <Box
        p={6}
        bg={"white"}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        w="100%"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="2xl" textAlign="center" mb={6}>
          BuzzChat
        </Heading>
        <Tabs variant="soft-rounded" colorScheme="green" isFitted>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginPage />
            </TabPanel>
            <TabPanel>
              <SignupPage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;

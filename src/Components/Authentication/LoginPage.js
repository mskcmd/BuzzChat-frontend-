import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (email && password) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        // Define baseURL and endpoint
        const baseURL = process.env.REACT_APP_BACKEND_ENDPOINT;
        const endpoint = "/api/user/login";
        const url = `${baseURL}${endpoint}`;
  
        // Make the POST request using the constructed URL
        const { data } = await axios.post(
          url,
          { email, password },
          config
        );
  
        // Store user info in localStorage
        localStorage.setItem("userinfo", JSON.stringify(data));
  
        // Display success toast
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        // Navigate to the chat page
        navigate("/chat");
      } else {
        // Display error toast for missing email or password
        toast({
          title: "Invalid email or password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
  
      // Display error toast in case of login failure
      toast({
        title: "Login Failed",
        description: "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Box p={4} borderWidth={1} borderRadius={8} boxShadow="lg" w="100%">
      <FormControl id="email" mb={3}>
        <FormLabel fontSize="sm">Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          size="sm"
        />
      </FormControl>
      <FormControl id="password" mb={3}>
        <FormLabel fontSize="sm">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          size="sm"
        />
      </FormControl>
      <Button
        colorScheme="green"
        isLoading={isLoading}
        loadingText="Logging in"
        onClick={handleLogin}
        w="full"
        size="sm"
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginPage;

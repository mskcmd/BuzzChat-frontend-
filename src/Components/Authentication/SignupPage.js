import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Avatar,
  AvatarBadge,
  IconButton,
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "BuzzChat");
    formData.append("cloud_name", "dkj7godal");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkj7godal/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data.secure_url);
      return data.secure_url; // Return the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = "";
      if (profileImage) {
        imageUrl = await uploadImage(profileImage); // Upload image and get URL
      }
      console.log("url", imageUrl);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/register",
        { name, email, password,imageUrl },
        config
      );

      localStorage.setItem("userinfo", JSON.stringify(data));
      toast({
        title: "Signup Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/chat");
    } catch (error) {
      console.log(error);
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setProfileImage(file);
    } else {
      toast({
        title: "Invalid Image Type",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius={8} boxShadow="lg" w="100%">
      <FormControl id="name" mb={3}>
        <FormLabel fontSize="sm">Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          size="sm"
        />
      </FormControl>
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
      <SimpleGrid columns={2} spacing={4} mb={3}>
        <FormControl id="password">
          <FormLabel fontSize="sm">Password</FormLabel>
          <InputGroup size="sm">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <InputRightElement>
              <IconButton
                size="sm"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword">
          <FormLabel fontSize="sm">Confirm Password</FormLabel>
          <InputGroup size="sm">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
            <InputRightElement>
              <IconButton
                size="sm"
                icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </SimpleGrid>
      <FormControl id="profileImage" mb={4}>
        <FormLabel fontSize="sm">Profile Image</FormLabel>
        <Flex align="center">
          <Avatar
            size="sm"
            src={profileImage ? URL.createObjectURL(profileImage) : ""}
          >
            <AvatarBadge
              as={IconButton}
              size="xs"
              rounded="full"
              top="-8px"
              right="-8px"
              bg="green.500"
              icon={<AddIcon />}
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
            />
          </Avatar>
          <Input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            display="none"
          />
        </Flex>
      </FormControl>
      <Button
        colorScheme="green"
        isLoading={isLoading}
        loadingText="Signing up"
        onClick={handleSignup}
        w="full"
        size="sm"
      >
        Signup
      </Button>
    </Box>
  );
}

export default SignupPage;

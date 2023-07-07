import React, {useState, useEffect} from "react";
import { ReactNode } from "react";
import { openai } from 'openai';
import {
  Box,
  Flex,
  Text,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  Container,
  Skeleton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["Home","App"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("yellow.200", "yellow.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);



export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
const [isLoaded, setIsLoaded] = useState(false);
const [response, setResponse] = useState('');
const [prompt, setPrompt] = useState('');

useEffect(() => {
  const apiKey = "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";
  const prompt = "Tell me something positive.";

  fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setResponse(data.choices[0].text);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return () => {
    // cleanup
  };
}, [response]);
  
  return (
    <>
      <Box  w='100%'
  
  bgGradient={[
    'linear(to-tr, blue.300, teal.400)',
    'linear(to-t, blue.200, teal.500)',
    'linear(to-b, blue.100, teal.300)',
  ]}  px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon borderBlock={"blue"} /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <HStack spacing={8} alignItems={"center"}>
            <Box><img style={{width: "100px"}} src={require("../assets/img/logo.png")} /></Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={
                    "/"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Settins</MenuItem>
                <MenuDivider />
                <MenuItem>LogOut</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Center flexDirection={"column"}>
        <Box p={10} maxW={800} >
        <Box>
          <Text as="i">
          Hello and welcome to "Daily Boost"! Get ready to start your day with a positive message that will uplift and inspire you. Remember, each new day brings new opportunities and possibilities. Embrace the positivity and let it guide you towards a fulfilling and joyful life. You have the power to create a bright and beautiful day ahead. Believe in yourself and keep spreading positivity wherever you go. Have a fantastic day filled with happiness and success!
        </Text>
        </Box>
          <Box w="20" mt={5} mb={5}>
            <img src={require("../assets/img/happy.png")} />
          </Box>
          <Button 
            mb={5}
            size='md'
            colorScheme='blackAlpha'
            height='48px'
            width='100%'
            maxW={250} 
            onClick={()=> setIsLoaded((v) => !v)}>
              Generate
          </Button>
        
        <Box w={"100%"} maxW={800}>
        <Skeleton
        isLoaded={isLoaded}
        bg='green.500'
        color='white'
        fadeDuration={1}
        borderRadius={10}
      >
        <Box p={5}>{response}</Box>
      </Skeleton>
      </Box>
      </Box>
      
      </Center>
    </>
  );
}

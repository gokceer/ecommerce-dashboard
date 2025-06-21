import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode } from "./ui/color-mode";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      pl={12}
      pr={12}
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base: "column",
        sm: "row",
      }}
    >
      <Text
        fontSize={{ base: "22px", sm: "28px" }}
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
        color="blue.500"
      >
        <Link to={"/"}>Product Store 🛒</Link>
      </Text>
      <HStack gap={2} alignItems={"center"}>
        <Link to={"/create"}>
          <Button>
            <CiSquarePlus fontSize={20} />
          </Button>
        </Link>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "🌙" : "☀️"}
        </Button>
      </HStack>
    </Flex>
  );
}

export default Navbar;

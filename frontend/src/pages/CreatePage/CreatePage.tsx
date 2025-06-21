import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.error({
        title: "Error",
        description: message,
        duration: 3000,
        closable: true,
      });
    } else {
      toaster.success({
        title: "Success",
        description: message,
        duration: 3000,
        closable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW="2xl">
      <Toaster />
      <VStack gap={8}>
        <Heading as="h1" size={"2xl"} textAlign={"center"}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
            />

            <Button bgColor={"blue.500"} onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;

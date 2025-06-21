import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import ProductDialog from "./ProductDialog";
import type { Product } from "@/types/ProductType";

const ProductCard = ({ product }: { product: Product }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { textColor } = useColorModeValue("gray.600", "gray.200");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { bg } = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (id: string) => {
    const { success, message } = await deleteProduct(id);
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
  };

  const handleUpdateProduct = async (id: string, product: Product) => {
    const { success, message } = await updateProduct(id, product);
    ProductDialog.close("a");

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
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Toaster />
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="contain"
      />
      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack>
          <IconButton
            bgColor={"blue.400"}
            onClick={() => {
              ProductDialog.open("a", {
                title: "Edit Product",
                product: product,
                onActionClick: handleUpdateProduct,
              });
            }}
          >
            <CiEdit />
          </IconButton>
          <IconButton
            bgColor={"red.400"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <CiTrash />
          </IconButton>
        </HStack>
      </Box>
      <ProductDialog.Viewport />
    </Box>
  );
};

export default ProductCard;

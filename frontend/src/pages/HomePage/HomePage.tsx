import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/product";
import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

function HomePage() {
  const { getProducts, products } = useProductStore();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFiltered(
        products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [products, query]);

  return (
    <Container py={12}>
      <VStack gap={8}>
        <Text
          fontSize={"2xl"}
          fontWeight="bold"
          textAlign="center"
          color="blue.500"
        >
          Current Products
        </Text>

        <InputGroup startElement={<CiSearch size={18} />}>
          <Input
            borderRadius={"2xl"}
            placeholder="Search a Product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>

        {filtered.length === 0 && (
          <Text
            fontSize={"lg"}
            fontWeight="bold"
            textAlign="center"
            color="gray.500"
          >
            No products found 😿{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
          gap={10}
          w={"full"}
        >
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default HomePage;

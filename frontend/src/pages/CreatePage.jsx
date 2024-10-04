import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const toast = useToast();
	const { createProduct, fetchProducts } = useProductStore(); // Fetch products after creation

	const handleAddProduct = async () => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			toast({
				title: "Error",
				description: "Please fill in all fields.",
				status: "error",
				isClosable: true,
			});
			return;
		}

		const { success, message } = await createProduct(newProduct);
		if (success) {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
			setNewProduct({ name: "", price: "", image: "" }); // Reset fields
			await fetchProducts(); // Optionally fetch updated product list
		} else {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		}
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Product Name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default CreatePage;

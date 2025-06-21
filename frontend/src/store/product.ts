import type { Product, ProductInput } from "@/types/ProductType";
import { create } from "zustand";

interface state {
  products: Product[];
}

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (
    newProduct: ProductInput
  ) => Promise<{ success: boolean; message: string }>;
  getProducts: () => Promise<{ success: boolean; message: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    id: string,
    product: Product
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  createProduct: async (newProduct: ProductInput) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      console.log("newpro", newProduct);
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state: state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  getProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    if (data.data.length > 0) {
      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } else {
      return { success: false, message: data.message };
    }
  },
  deleteProduct: async (id: string) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      set((state: state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } else {
      return { success: false, message: data.message };
    }
  },
  updateProduct: async (id: string, product: Product) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();

    if (data.success) {
      set((state: state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } else {
      return { success: false, message: data.message };
    }
  },
}));

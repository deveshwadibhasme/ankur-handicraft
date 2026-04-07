import { request } from "../utils/axios";

export const getProducts = () => request("/api/products/all-products");

export const getInquiry = () => request("/inquiry/all-inquries", { auth: true });


export const createProduct = (product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("material", product.material);
  formData.append("category", product.category);
  formData.append("oldPrice", product.oldPrice);
  formData.append("price", product.price);
  formData.append("dimensions", product.dimensions);
  formData.append("isFeatured", product.isFeatured);
  if (product.imageFile) {
    formData.append("image", product.imageFile);
  }

  return request("/api/products", { method: "POST", body: formData, auth: true });
};

export const updateProduct = (id, product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("material", product.material);
  formData.append("category", product.category);
  formData.append("oldPrice", product.oldPrice);

  formData.append("price", product.price);
  formData.append("dimensions", product.dimensions);
  formData.append("isFeatured", product.isFeatured);
  if (product.imageFile) {
    formData.append("image", product.imageFile);
  }

  return request(`/api/products/${id}`, { method: "PUT", body: formData, auth: true });
};

export const setFeatured = (id, isFeatured) => {


  return request(`/api/products/${id}`, { method: "PATCH", body: { isFeatured: isFeatured }, auth: true });
};

export const deleteProduct = (id) => request(`/api/products/${id}`, { method: "DELETE", auth: true });

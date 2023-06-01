import axios from "axios";

const NewRequest = axios.create({
  baseURL: "https://api.ofa.az/api",
});

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${currentUser.token}`,
};

export default NewRequest;

// Auth token
const setAuthorizationToken = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { token } = currentUser;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return headers;
  } catch (error) {
    return error;
  }
};

// Auth Crud
export const RequestLogin = async ({ email, password }) => {
  const response = await NewRequest.post("/login", {
    email,
    password,
  });
  return response.data;
};

export const RequestLogout = async () => {
  const token = currentUser.token.split("|")[0];
  const response = await NewRequest.post("/logout", { token }, { headers });
  return response;
};

// Products crud
export const GetDryFruits = async () => {
  const response = await NewRequest.get("/az/products?search=dryfruits");
  return response.data;
};

export const GetJams = async () => {
  const response = await NewRequest.get("/az/products?search=jams");
  return response.data;
};

export const GetPackageProducts = async () => {
  const response = await NewRequest.get("/az/products?search=packagefruits");
  return response.data;
};

export const GetProductFeatures = async (id) => {
  const response = await NewRequest.get(`/az/products/${id}`);
  return response.data;
};

export const GetProduct = async (id) => {
  const response = await NewRequest.get(`/products/${id}`);
  return response.data;
};

export const AddProduct = async (state) => {
  const response = await NewRequest.post("/products", state, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${currentUser.token}`,
    },
  });
  return response;
};

export const DeleteProduct = async (id) => {
  const headers = setAuthorizationToken();
  const response = await NewRequest.delete(`/products/${id}`, { headers });
  return response;
};

export const UpdateProduct = async ({ id, state }) => {
  const headers = setAuthorizationToken();
  const response = await NewRequest.put(`/products/${id}`, state, {
    headers,
  });
  return response;
};

// Recipes crud
export const GetRecipes = async () => {
  const response = await NewRequest.get("/az/recipes");
  return response.data;
};

export const GetRecipe = async (id) => {
  const response = await NewRequest.get(`/recipes/${id}`);
  return response.data;
};

export const AddRecipe = async (state) => {
  const response = await NewRequest.post("/recipes", state, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${currentUser.token}`,
    },
  });
  return response;
};

export const DeleteRecipe = async (id) => {
  const headers = setAuthorizationToken();
  const response = await NewRequest.delete(`/recipes/${id}`, { headers });
  return response;
};

export const UpdateRecipe = async ({ id, state }) => {
  const headers = setAuthorizationToken();
  const response = await NewRequest.put(`/recipes/${id}`, state, {
    headers,
  });
  return response;
};

// Gallery crud

export const GetGallery = async () => {
  const response = await NewRequest.get("/gallery");
  return response.data;
};

export const AddGallery = async (formData) => {
  const response = await NewRequest.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${currentUser.token}`,
    },
  });
  return response;
};

export const DeleteGallery = async (id) => {
  const headers = setAuthorizationToken();
  const response = await NewRequest.delete(`/gallery/${id}`, { headers });
  return response;
};

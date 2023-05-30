import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://api.ofa.az/api",
});

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${currentUser.token}`,
};

export default newRequest;

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

export const RequestLogin = async ({ email, password }) => {
  const response = await newRequest.post("/login", {
    email,
    password,
  });
  return response.data;
};

export const RequestLogout = async () => {
  const token = currentUser.token.split("|")[0];
  const response = await newRequest.post("/logout", { token }, { headers });
  return response;
};

export const GetDryFruits = async () => {
  const response = await newRequest.get("/az/products?search=dryfruits");
  return response.data;
};

export const GetJams = async () => {
  const response = await newRequest.get("/az/products?search=jams");
  return response.data;
};

export const GetPackageProducts = async () => {
  const response = await newRequest.get("/az/products?search=packagefruits");
  return response.data;
};

export const GetGallery = async () => {
  const response = await newRequest.get("/gallery");
  return response.data;
};

export const AddGallery = async (formData) => {
  const response = await newRequest.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${currentUser.token}`,
    },
  });
  return response;
};

export const deleteGallery = async () => {
  const headers = setAuthorizationToken();
  const response = await newRequest.get(`/gallery/24`, { headers });
  return response;
};

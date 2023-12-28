import axios from "axios";
axios.defaults.withCredentials = true;

// Profile Operations
export async function getLoggedInUser() {
  return await axios.get("http://localhost:4000/api/v1/profile");
}

export async function onUpdateUser(updateUserData) {
  return await axios.put(
    "http://localhost:4000/api/v1/profile",
    updateUserData
  );
}

// Dashboard CRUD Operations
export async function getUsers() {
  return await axios.get("http://localhost:4000/api/v1/users");
}

export async function getUser(id) {
  return await axios.get(`http://localhost:4000/api/v1/users/${id}`);
}

export async function createUser(createUser) {
  return await axios.post("http://localhost:4000/api/v1/users", createUser);
}

export async function editUser(id, editUser) {
  return await axios.put(`http://localhost:4000/api/v1/users/${id}`, editUser);
}

export async function deleteUser(id) {
  return await axios.delete(`http://localhost:4000/api/v1/users/${id}`);
}

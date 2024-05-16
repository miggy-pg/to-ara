import axios from "axios";
// Since we are using cookies, we need to send the token back to the server and check if it is valid.
axios.defaults.withCredentials = true;

export async function getAccommodations() {
  return await axios.get("http://localhost:4000/api/v1/accommodations");
}

export async function getAccommodation(id) {
  return await axios.get(`http://localhost:4000/api/v1/accommodations/${id}`);
}

export async function createAccommodation(createAccommodation) {
  return await axios.post(
    "http://localhost:4000/api/v1/accommodations",
    createAccommodation
  );
}

export async function editAccommodation(id, editAccommodation) {
  return await axios.put(
    `http://localhost:4000/api/v1/accommodations/${id}`,
    editAccommodation
  );
}

export async function deleteAccommodation(id) {
  return await axios.delete(
    `http://localhost:4000/api/v1/accommodations/${id}`
  );
}
export async function getFavoriteAccommodations(userId) {
  return await axios.get(`http://localhost:4000/api/v1/favorites/accommodations/${userId}`);
}

export async function addToFavoriteAccommodation(id, userId) {
  console.log("Testing AddFavorite");
  return await axios.put("http://localhost:4000/api/v1/accommodations/favorites/add", { id, userId });
}

export async function deleteFromFavoriteAccommodation(id, userId) {
  console.log("Testing DeleteFavorite");
  return await axios.put("http://localhost:4000/api/v1/accommodations/favorites/remove", { id, userId });
}

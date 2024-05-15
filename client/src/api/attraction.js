import axios from "axios";
// Since we are using cookies, we need to send the token back to the server and check if it is valid.
axios.defaults.withCredentials = true;

export async function getAttractions() {
  return await axios.get("http://localhost:4000/api/v1/attractions");
}

export async function getAttraction(id) {
  return await axios.get(`http://localhost:4000/api/v1/attractions/${id}`);
}

export async function createAttraction(createAttraction) {
  return await axios.post(
    "http://localhost:4000/api/v1/attractions",
    createAttraction
  );
}

export async function editAttraction(id, editAttraction) {
  return await axios.put(
    `http://localhost:4000/api/v1/attractions/${id}`,
    editAttraction
  );
}

export async function deleteAttraction(id) {
  return await axios.delete(`http://localhost:4000/api/v1/attractions/${id}`);
}

export async function getFavoriteAttractions() {
  return await axios.get("http://localhost:4000/api/v1/favorites/attractions");
}

export async function addToFavoriteAttraction(id) {
  console.log("Testing AddFavorite");
  return await axios.put("http://localhost:4000/api/v1/attractions/favorites/add", { id });
}

export async function deleteFromFavoriteAttraction(id) {
  console.log("Testing DeleteFavorite");
  return await axios.put("http://localhost:4000/api/v1/attractions/favorites/remove", { id });
}

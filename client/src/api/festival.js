import axios from "axios";
// Since we are using cookies, we need to send the token back to the server and check if it is valid.
axios.defaults.withCredentials = true;

export async function getFestivals() {
  return await axios.get("http://localhost:4000/api/v1/festivals");
}

export async function getFestival(id) {
  return await axios.get(`http://localhost:4000/api/v1/festivals/${id}`);
}

export async function createFestival(createFestival) {
  return await axios.post(
    "http://localhost:4000/api/v1/festivals",
    createFestival
  );
}

export async function editFestival(id, editFestival) {
  return await axios.put(
    `http://localhost:4000/api/v1/festivals/${id}`,
    editFestival
  );
}

export async function deleteFestival(id) {
  return await axios.delete(`http://localhost:4000/api/v1/festivals/${id}`);
}
export async function getFavoriteFestival() {
  return await axios.get("http://localhost:4000/api/v1/favorites/festivals");
}

export async function addToFavoriteFestival(id) {
  console.log("Testing AddFavorite");
  return await axios.put("http://localhost:4000/api/v1/festivals/favorites/add", { id });
}

export async function deleteFromFavoriteFestival(id) {
  console.log("Testing DeleteFavorite");
  return await axios.put("http://localhost:4000/api/v1/festivals/favorites/remove", { id });
}


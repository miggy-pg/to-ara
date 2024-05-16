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
export async function getFavoriteFestival(userId) {
  return await axios.get(`http://localhost:4000/api/v1/favorites/festivals/${userId}`);
}

export async function addToFavoriteFestival(id, userId) {
  return await axios.put("http://localhost:4000/api/v1/festivals/favorites/add", { id, userId });
}

export async function deleteFromFavoriteFestival(id, userId) {
  return await axios.put("http://localhost:4000/api/v1/festivals/favorites/remove", { id, userId });
}


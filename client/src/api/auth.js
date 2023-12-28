import axios from "axios";
// Since we are using cookies, we need to send the token back to the server and check if it is valid.
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  console.log(registrationData);
  return await axios.post(
    "http://localhost:4000/api/user/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:4000/api/user/login", loginData);
}

export async function onLogout() {
  return await axios.get("http://localhost:4000/api/user/logout");
}

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:4000/api/user/protected");
}

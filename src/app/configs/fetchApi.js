import axios from "axios";
import { EncryptStorage } from "encrypt-storage";

const fetchApi = (type = "") => {
  const encryptStorage = new EncryptStorage(process.env.REACT_APP_SECRET_KEY);
  const baseURL = process.env.REACT_APP_API_URL_API_;

  // Get Token
  const userInfo = encryptStorage.getItem("___user");
  const accessToken = userInfo?.token || "";

  const api = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Credentials": true,
      "Accept-Language": "en",
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (type === "auth") {
        return Promise.reject(error);
      } else {
        if (error?.response?.status === 401) {
          //Token Habis
          encryptStorage.clear();
          localStorage.clear();
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }
    }
  );

  return api;
};

export { fetchApi };

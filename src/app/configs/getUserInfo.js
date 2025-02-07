import { EncryptStorage } from "encrypt-storage";

const encryptStorage = new EncryptStorage(process.env.REACT_APP_SECRET_KEY);

export function getUserInfo() {
  try {
    const userInfo = encryptStorage.getItem("___user");
    const baseURL = process.env.REACT_APP_API_URL_API_;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token || ""}`,
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Credentials": true,
        "Accept-Language": "en",
      },
    };
    return { baseURL, userInfo, config };
  } catch (error) {
    console.error("Failed to retrieve user info:", error);
    return null;
  }
}

export const handleError = (err) => {
  const errStatus = err?.response?.status || 500;
  const errMessage = err?.response?.data?.message || "Something went wrong!";
  let messages = "Something Wrong!!";

  switch (errStatus) {
    case 401:
      messages = "Unauthorized!!";
      navigate("/login");
      break;
    case 500:
      messages = "Server Error!!";
      break;
    case 404:
      messages = "Not Found Error!!!";
      break;
    case 408:
      messages = "Timeout Error!!";
      break;
    case 400:
      messages = errMessage;
      break;
  }

  dispatch(
    showMessage({
      message: messages,
      autoHideDuration: 2000,
      anchorOrigin: { vertical: "top", horizontal: "center" },
      variant: "error",
    })
  );
  console.error(err);
};


export const handleErrors = (err) => {
  const errStatus = err?.response?.status;
  const errMessage = err?.response?.data?.message;
  let messages = "";
  switch (errStatus) {
    case 401:
      messages = "Unauthorized!!";
      window.location.href = "/login";
      break;
    case 500:
      messages = "Server Error!!";
      break;
    case 404:
      messages = "Not Found Error!!!";
      break;
    case 408:
      messages = "TimeOut Error!!";
      break;
    case 400:
      messages = errMessage;
      break;
    default:
      messages = "Something Went Wrong!!";
      break;
  }
  return messages;
};

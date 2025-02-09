import { EncryptStorage } from "encrypt-storage";

const encryptStorage = new EncryptStorage(process.env.REACT_APP_SECRET_KEY);

export function getUserInfo() {
  try {
    // Mengambil data user dari encryptStorage
    const storedUser = encryptStorage.getItem("___user");
    
    // Pastikan userInfo tidak undefined
    const userInfo = storedUser ? storedUser : {};

    // Pastikan baseURL tidak undefined (gunakan default jika tidak ada)
    const baseURL = process.env.REACT_APP_API_URL_API_ || "http://default-url.com";

    // Konfigurasi Header API
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token || ""}`,
        "Access-Control-Allow-Origin": "*", // Harus string, bukan boolean
        "Access-Control-Allow-Credentials": "true", // Sesuai standar
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

export const tambahNamaRe = (data) => {
  return data.map((item) => {
    const mstRekening =
      item?.mstRekening?.length > 8
        ? item?.mstRekening?.slice(0, 8) + "..."
        : item?.mstRekening;

    const nama =
      item?.nama?.length > 18 ? item?.nama?.slice(0, 18) + "..." : item?.nama;

    return {
      ...item,
      namaRek: `${mstRekening} - ${nama}`,
    };
  });
};

export const tambahNamaReApprove = (data) => {
  return data.map((item) => {
    const mstRekening =
      item?.nasabah?.mstRekening?.length > 8
        ? item?.nasabah?.mstRekening?.slice(0, 8) + "..."
        : item?.nasabah?.mstRekening;

    const nama =
      item?.nasabah?.nama?.length > 18 ? item?.nasabahnama?.slice(0, 18) + "..." : item?.nasabah?.nama;

    return {
      ...item,
      namaRek: `${mstRekening} - ${nama}`,
    };
  });
};

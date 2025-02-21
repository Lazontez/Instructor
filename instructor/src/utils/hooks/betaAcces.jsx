import CryptoJS from "crypto-js";

const SECRET_KEY = "supersecretkey123";

export function isUserVerified() {
  const encryptedToken = localStorage.getItem("accessToken");
  if (!encryptedToken) return false;

  try {
    const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedToken === "verifiedUser";
  } catch (error) {
    return false;
  }
}

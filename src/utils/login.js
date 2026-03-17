import axios from "axios";
import roles from "./userRoles.js";
const handleLogin = async ({ email, password }) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password }, { withCredentials: true });
    //console.log("Login successful:", res.data);
    if (!roles[res.data.role]) {
      throw new Error("Unauthorized to Access")
    }
    return res.data;
  } catch (error) {
    //console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data || error.message || "Incorrect Email or Password ");
  }
};

export default handleLogin;

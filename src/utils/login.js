import axios from "axios";

const handleLogin = async ({ email, password }) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password }, { withCredentials: true });
    //console.log("Login successful:", res.data);
    if (!(res.data?.role === "admin" || res.data?.role === "mod")) {
      throw new Error("Unauthorized to Access")
    }
    return res.data;
  } catch (error) {
    //console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data || error.message || "Incorrect Email or Password ");
  }
};

export default handleLogin;

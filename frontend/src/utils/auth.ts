// frontend/src/utils/auth.ts
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}`;

export const checkAuth = async (): Promise<boolean> => {
  try {
    const res = await axios.get(`${API_URL}/irican/check`, {
      withCredentials: true,
    });
    return res.data.success;
  } catch {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/irican/logout`, {}, {
      withCredentials: true,
    });
  } catch (err) {
    console.error("Logout error:", err);
  }
};
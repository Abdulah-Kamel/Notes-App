import axios from "axios";
import { createContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export const noteContext = createContext();
export default function NoteProvider({ children }) {
  const baseUrl = "https://note-sigma-black.vercel.app/api/v1/";
  const signup = async (userData) => {
    const data = await axios.post(`${baseUrl}users/signUp`, userData);
    return data;
  };

  const login = async (userData) => {
    const data = await axios.post(`${baseUrl}users/signIn`, userData);
    return data;
  };
  return (
    <noteContext.Provider value={{ signup, login }}>
      {children}
    </noteContext.Provider>
  );
}

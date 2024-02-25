import axios from "axios";
import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "./AuthContext";
export const noteContext = createContext();
export default function NoteProvider({ children }) {
  const { token, setToken } = useContext(authContext);
  const baseUrl = "https://note-sigma-black.vercel.app/api/v1/";
  const signup = async (userData) => {
    const data = await axios.post(`${baseUrl}users/signUp`, userData);
    return data;
  };

  const login = async (userData) => {
    const data = await axios.post(`${baseUrl}users/signIn`, userData);
    return data;
  };

  const addNote = async (title, content) => {
    const data = await axios
      .post(
        `${baseUrl}notes`,
        { title, content },
        { headers: { token: `3b8ny__${token}` } }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.msg,
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEnterKey: true,
          allowEscapeKey: true,
        });
      });
  };

  const updateNote = async (title, content, id) => {
    const data = await axios
      .put(
        `${baseUrl}notes/${id}`,
        { title, content },
        { headers: { token: `3b8ny__${token}` } }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.msg,
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEnterKey: true,
          allowEscapeKey: true,
        });
      });
  };

  const deleteNote = async (id) => {
    const data = await axios
      .delete(`${baseUrl}notes/${id}`, {
        headers: { token: `3b8ny__${token}` },
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note Delted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.msg,
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEnterKey: true,
          allowEscapeKey: true,
        });
      });
  };

  const getNotes = async () => {
    const data = await axios.get(`${baseUrl}notes`, {
      headers: { token: `3b8ny__${token}` },
    });
    return data;
  };

  return (
    <noteContext.Provider
      value={{
        signup,
        login,
        addNote,
        getNotes,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </noteContext.Provider>
  );
}

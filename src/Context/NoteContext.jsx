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
    console.log(data);
    return data;
  };

  const showAddModal = () => {
    Swal.fire({
      title: "Add Note",
      html: `
      <section class="d-flex justify-content-center align-items-center flex-column py-3 px-1 px-sm-3">
      <input type="text" class="form-control mb-2" placeholder="Note Title" id="title"/>
          <textarea type="text" class="form-control" placeholder="Note Content" id="content" rows="3"></textarea>
      </section>
    `,
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      allowEnterKey: true,
      preConfirm: () => {
        const title = document.getElementById("title");
        const content = document.getElementById("content");
        return { title, content };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        console.log(result?.value.title.value, result?.value.content.value);
        addNote(result?.value.title.value, result?.value.content.value);
      }
    });
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

  const getNotes = async () => {
    const data = axios.get(`${baseUrl}notes`, {
      headers: { token: `3b8ny__${token}` },
    });
    return data;
  };
  return (
    <noteContext.Provider
      value={{ signup, login, addNote, showAddModal, getNotes }}
    >
      {children}
    </noteContext.Provider>
  );
}

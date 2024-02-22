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

  const showUpdateModal = (id, noteTitle, noteContent) => {
    Swal.fire({
      title: "Update Note",
      html: `
      <section class="d-flex justify-content-center align-items-center flex-column py-3 px-1 px-sm-3">
      <input type="text" class="form-control mb-2" placeholder="Note Title" id="title" value="${noteTitle}"/>
          <textarea type="text" class="form-control" placeholder="Note Content" id="content" rows="3">${noteContent}</textarea>
      </section>
    `,
      showCancelButton: true,
      confirmButtonText: "Update",
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
        updateNote(result?.value.title.value, result?.value.content.value, id);
      }
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

  const showDeleteModal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id);
      }
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
    const data = axios.get(`${baseUrl}notes`, {
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
        showAddModal,
        getNotes,
        showUpdateModal,
        showDeleteModal,
        deleteNote,
      }}
    >
      {children}
    </noteContext.Provider>
  );
}

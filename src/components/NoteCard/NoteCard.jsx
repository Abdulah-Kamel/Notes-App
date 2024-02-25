import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { noteContext } from "../../Context/NoteContext";
import Swal from "sweetalert2";

const NoteCard = ({ noteTitle, noteContent, noteDate, noteId }) => {
  const { deleteNote, updateNote } = useContext(noteContext);
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
  return (
    <section className="note h-100 p-3 pb-0 rounded bg-main text-white d-flex flex-column justify-content-between">
      <section>
        <h4>{noteTitle}</h4>
        <p>{noteContent}</p>
      </section>
      <section className="d-flex justify-content-between align-items-center my-3">
        <p className="mb-0">{noteDate.slice(0, 10)}</p>
        <section>
          <Link onClick={() => showUpdateModal(noteId, noteTitle, noteContent)}>
            <FontAwesomeIcon
              icon={faEdit}
              size="1x"
              className="btn btn-light-color text-black p-1 me-1"
            />
          </Link>
          <Link onClick={() => showDeleteModal(noteId)}>
            <FontAwesomeIcon
              icon={faTrash}
              size="1x"
              className="btn btn-danger p-1"
            />
          </Link>
        </section>
      </section>
    </section>
  );
};

export default NoteCard;

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { noteContext } from "../../Context/NoteContext";
import NoteCard from "../NoteCard/NoteCard";
import Swal from "sweetalert2";
import { authContext } from "../../Context/AuthContext";
import axios from "axios";
import HashLoaderComponent from "../HashLoaderComponent/HashLoaderComponent";

const Home = () => {
  const { addNote } = useContext(noteContext);
  const { token } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [notes, setAllNotes] = useState(null);
  const baseUrl = "https://note-sigma-black.vercel.app/api/v1/";

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

  const getNotes = () => {
    axios
      .get(`${baseUrl}notes`, {
        headers: { token: `3b8ny__${token}` },
      })
      .then((response) => {
        setAllNotes(response.data.notes);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setAllNotes([]);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getNotes();
  }, [notes]);

  return (
    <section className="container mt-3">
      {loading ? (
        <HashLoaderComponent />
      ) : (
        <section className="row g-4 py-5">
          <section className="col-md-3">
            <section className="w-100 h-100 d-flex justify-content-center align-items-center">
              <Link
                className="btn btn-light-color rounded w-50 p-3 d-flex justify-content-center align-items-center"
                onClick={() => {
                  showAddModal();
                }}
              >
                <FontAwesomeIcon icon={faAdd} size="4x" />
              </Link>
            </section>
          </section>
          {notes?.map((note, index) => {
            return (
              <section className="col-md-3" key={index}>
                <NoteCard
                  noteTitle={note.title}
                  noteContent={note.content}
                  noteDate={note.updatedAt}
                  noteId={note._id}
                />
              </section>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default Home;

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { noteContext } from "../../Context/NoteContext";
import NoteCard from "../NoteCard/NoteCard";

const Home = () => {
  const { showAddModal, getNotes, showDeleteModal } = useContext(noteContext);
  const [notes, setAllNotes] = useState(null);
  const getUserNotes = async () => {
    const data = await getNotes();
    setAllNotes(data.notes);
    console.log(data);
  };
  useEffect(() => {
    getUserNotes();
  }, [notes]);
  return (
    <section className="container mt-3">
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
    </section>
  );
};

export default Home;

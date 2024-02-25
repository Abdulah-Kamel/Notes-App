import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { noteContext } from "../../Context/NoteContext";

const NoteCard = ({ noteTitle, noteContent, noteDate, noteId }) => {
  const { showUpdateModal, showDeleteModal } = useContext(noteContext);
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

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ noteTitle, noteContent, noteDate }) => {
  return (
    <section className="note p-3 pb-0 rounded bg-main text-white d-flex flex-column">
      <h4>{noteTitle}</h4>
      <p>{noteContent}</p>
      <section className="d-flex justify-content-between align-items-center my-3">
        <p className="mb-0">{noteDate.slice(0, 10)}</p>
        <section>
          <Link>
            <FontAwesomeIcon
              icon={faEdit}
              size="1x"
              className="btn btn-light-color text-black p-1 me-1"
            />
          </Link>
          <Link>
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

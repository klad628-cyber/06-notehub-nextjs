import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

export default function NoteList({
  notes,
  onDelete,
  deletingId,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
  deletingId?: string;
}) {
  if (notes.length === 0) {
    return (
      <div className={css.empty}>
        <span aria-hidden="true">✳</span>
        <h2>No notes found</h2>
        <p>Try another search, or create a note to get started.</p>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.card} key={note.id}>
          <div className={css.cardTop}>
            <span className={css.tag}>{note.tag}</span>
            <time dateTime={note.createdAt}>
              {new Date(note.createdAt).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`}>
              View details <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              onClick={() => onDelete(note.id)}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

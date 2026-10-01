"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchNoteById, noteQueryKeys } from "@/lib/api";
import css from "./NoteDetailsClient.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: noteQueryKeys.detail(id),
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading)
    return <p className="route-message">Loading, please wait...</p>;
  if (isError || !note)
    return <p className="route-message">Something went wrong.</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <Link className={css.backLink} href="/notes">
          ← All notes
        </Link>
        <article className={css.item}>
          <div className={css.header}>
            <h1>{note.title}</h1>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            Created{" "}
            {new Date(note.createdAt).toLocaleDateString("en", {
              dateStyle: "long",
            })}
          </p>
        </article>
      </div>
    </main>
  );
}

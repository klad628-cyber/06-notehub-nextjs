"use client";

import { useState, type FormEvent } from "react";
import type { NoteDraft, NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

const tags: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
];

export default function NoteForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (note: NoteDraft) => void;
  isPending: boolean;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Personal");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ title: title.trim(), content: content.trim(), tag });
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.field}>
        <span>Title</span>
        <input
          autoFocus
          required
          maxLength={50}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Give this note a name"
        />
      </label>
      <label className={css.field}>
        <span>Tag</span>
        <select
          value={tag}
          onChange={(event) => setTag(event.target.value as NoteTag)}
        >
          {tags.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className={css.field}>
        <span>Note</span>
        <textarea
          required
          rows={6}
          maxLength={5000}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write down what's on your mind..."
        />
      </label>
      <button className={css.submit} type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save note"}
      </button>
    </form>
  );
}

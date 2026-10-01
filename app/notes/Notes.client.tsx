"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import { createNote, deleteNote, fetchNotes, noteQueryKeys } from "@/lib/api";
import type { NoteDraft } from "@/types/note";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const params = { search, page, perPage: 12 };
  const notesQuery = useQuery({
    queryKey: noteQueryKeys.list(params),
    queryFn: () => fetchNotes(params),
    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      setIsFormOpen(false);
      setPage(1);
      await queryClient.invalidateQueries({ queryKey: noteQueryKeys.lists() });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: noteQueryKeys.lists() }),
  });

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCreate(note: NoteDraft) {
    createMutation.mutate(note);
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.heading}>
          <div>
            <p className={css.eyebrow}>Your personal archive</p>
            <h1 className={css.title}>
              Notes <span>{notesQuery.data?.notes.length ?? "—"}</span>
            </h1>
          </div>
          <button
            className={css.createButton}
            onClick={() => setIsFormOpen(true)}
            type="button"
          >
            <span aria-hidden="true">+</span> New note
          </button>
        </div>
        <SearchBox value={search} onChange={handleSearch} />
        {notesQuery.isError ? (
          <p className="route-message" role="alert">
            Could not fetch the list of notes. {notesQuery.error.message}
          </p>
        ) : !notesQuery.data ? (
          <p className="route-message">Loading, please wait...</p>
        ) : (
          <>
            <NoteList
              notes={notesQuery.data.notes}
              onDelete={(id) => deleteMutation.mutate(id)}
              deletingId={
                deleteMutation.isPending ? deleteMutation.variables : undefined
              }
            />
            {notesQuery.data.totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={notesQuery.data.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
        {createMutation.isError && (
          <p className={css.formError} role="alert">
            Could not create note. {createMutation.error.message}
          </p>
        )}
        {deleteMutation.isError && (
          <p className={css.formError} role="alert">
            Could not delete note. {deleteMutation.error.message}
          </p>
        )}
      </div>
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New note"
      >
        <NoteForm
          onSubmit={handleCreate}
          isPending={createMutation.isPending}
        />
      </Modal>
    </main>
  );
}

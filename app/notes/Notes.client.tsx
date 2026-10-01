"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function NotesClient() {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setPage(1);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [debouncedSearch] = useDebounce(inputValue, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => {
      return fetchNotes({
        search: debouncedSearch,
        page,
        perPage: 12,
      });
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {data && data?.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm cancelModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

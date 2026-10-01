import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, noteQueryKeys } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });
  const params = { search: "", page: 1, perPage: 12 };
  const queryKey = noteQueryKeys.list(params);

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes(params),
  });
  const queryError = queryClient.getQueryState(queryKey)?.error;
  if (queryError) throw queryError;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

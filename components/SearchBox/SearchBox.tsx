import css from "./SearchBox.module.css";

export default function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={css.search}>
      <span className={css.icon} aria-hidden="true">
        ⌕
      </span>
      <span className={css.visuallyHidden}>Search notes</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search your notes..."
      />
      {value && (
        <button
          className={css.clear}
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </label>
  );
}

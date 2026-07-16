function SearchBar({ query, onQueryChange, category, onCategoryChange, categories }) {
  return (
    <div className="search-bar">
      <label className="search-bar__field">
        <span className="visually-hidden">Search skills</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by skill, tag, or person..."
          aria-label="Search skills"
        />
      </label>

      <label className="search-bar__select">
        <span className="visually-hidden">Category</span>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All categories' : cat}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SearchBar;

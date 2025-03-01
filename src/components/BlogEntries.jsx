import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import NavigationControls from "./NavigationControls";
import {
  loadPosts,
  updateSearchFilter,
  changePage,
  applyFilter,
  resetFilters,
} from "../feature/blogSlice";

function BlogEntries() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    entriesList,
    loadingStatus,
    errorMessage,
    searchQuery,
    currentPage,
    totalEntries,
    entriesPerPage,
    activeFilters,
  } = useSelector((state) => state.blogData);

  useEffect(() => {
    dispatch(loadPosts({ 
      page: currentPage, 
      limit: entriesPerPage,
      userId: activeFilters.userId 
    }));
  }, [dispatch, currentPage, entriesPerPage, activeFilters.userId]);

  const handleSearchInput = (e) => {
    dispatch(updateSearchFilter(e.target.value));
  };

  const clearSearch = () => {
    dispatch(updateSearchFilter(""));
  };

  const applyUserFilter = (userId) => {
    dispatch(applyFilter({ userId }));
  };

  const clearAllFilters = () => {
    dispatch(resetFilters());
  };

  const navigateToEntry = (entryId) => {
    navigate(`/entries/${entryId}`);
  };

  if (loadingStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (loadingStatus === "failed") {
    return (
      <div className="error-container">
        <h3>Error Loading Content</h3>
        <p>{errorMessage}</p>
        <button
          onClick={() => dispatch(loadPosts({ page: 1, limit: entriesPerPage }))}
          className="action-button"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredEntries = entriesList.filter((entry) => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = !activeFilters.userId || entry.userId === activeFilters.userId;
    return matchesSearch && matchesUser;
  });

  return (
    <div className="blog-entries-container">
      <div className="search-filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search entries..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          {searchQuery && (
            <button
              className="action-button clear-search"
              onClick={clearSearch}
            >
              Clear Search
            </button>
          )}
        </div>

        <div className="filter-controls">
          <select
            className="user-filter-select"
            value={activeFilters.userId || ""}
            onChange={(e) => applyUserFilter(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Authors</option>
            {Array.from({ length: 10 }, (_, i) => {
              const userId = i + 1;
              return (
                <option key={userId} value={userId}>
                  Author {userId}
                </option>
              );
            })}
          </select>

          {(activeFilters.userId || searchQuery) && (
            <button className="action-button" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      <div className="entries-grid">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="entry-card"
            onClick={() => navigateToEntry(entry.id)}
          >
            <h3 className="entry-title">{entry.title}</h3>
            <p className="entry-preview">{entry.body.substring(0, 100)}...</p>
            <span className="user-id">ID: {entry.id}</span>
            <span className="user-tag">Author ID: {entry.userId}</span>
          </div>
        ))}
      </div>

      <NavigationControls
        currentPage={currentPage}
        totalEntries={totalEntries}
        entriesPerPage={entriesPerPage}
        onPageChange={(page) => dispatch(changePage(page))}
      />
    </div>
  );
}

export default BlogEntries;
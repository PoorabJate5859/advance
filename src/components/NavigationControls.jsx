import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function NavigationControls({ currentPage, totalEntries, entriesPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const generatePageButtons = () => {
    const buttons = [];
    const needsEllipsis = totalPages > 7;

    if (needsEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) buttons.push(i);
        buttons.push("...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        buttons.push(1, "...");
        for (let i = totalPages - 4; i <= totalPages; i++) buttons.push(i);
      } else {
        buttons.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    }

    return buttons;
  };

  return (
    <div className="navigation-controls">
      <button
        className="nav-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="nav-icon" width={18} />
      </button>

      {generatePageButtons().map((page, index) => (
        <button
          key={index}
          className={`nav-button ${page === currentPage ? "active" : ""} ${page === "..." ? "ellipsis" : ""}`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className="nav-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="nav-icon" width={18} />
      </button>
    </div>
  );
}

export default NavigationControls;
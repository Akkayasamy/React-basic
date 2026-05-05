const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const btnBase = "h-[34px] min-w-[34px] px-[10px] border rounded-[7px] text-[13px] inline-flex items-center justify-center font-medium transition-all duration-150";

  return (
    <div className="flex items-center justify-center gap-1 mt-[28px]">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${btnBase} ${
          currentPage === 1 
            ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed" 
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 cursor-pointer"
        }`}
      >
        ← Prev
      </button>

      {/* Pages */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dot-${i}`} className="px-1 text-gray-400 text-[13px]">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${
              page === currentPage
                ? "bg-blue-500 text-white border-blue-500 font-bold"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 font-medium"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${btnBase} ${
          currentPage === totalPages
            ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 cursor-pointer"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
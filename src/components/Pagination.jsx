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

    const btnBase = {
        height: 34, minWidth: 34, padding: "0 10px",
        border: "1px solid #e5e7eb", borderRadius: 7,
        fontSize: 13, cursor: "pointer",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontWeight: 500, background: "#fff", color: "#374151",
        transition: "all 0.15s",
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 28 }}>
            {/* Prev */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                style={{
                    ...btnBase,
                    background: currentPage === 1 ? "#f9fafb" : "#fff",
                    color: currentPage === 1 ? "#d1d5db" : "#374151",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => { if (currentPage !== 1) e.currentTarget.style.background = "#f3f4f6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = currentPage === 1 ? "#f9fafb" : "#fff"; }}
            >
                ← Prev
            </button>

            {/* Pages */}
            {getPages().map((page, i) =>
                page === "..." ? (
                    <span key={`dot-${i}`} style={{ padding: "0 4px", color: "#9ca3af", fontSize: 13 }}>…</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        style={{
                            ...btnBase,
                            background: page === currentPage ? "#3b82f6" : "#fff",
                            color: page === currentPage ? "#fff" : "#374151",
                            borderColor: page === currentPage ? "#3b82f6" : "#e5e7eb",
                            fontWeight: page === currentPage ? 700 : 500,
                        }}
                        onMouseEnter={(e) => { if (page !== currentPage) e.currentTarget.style.background = "#f3f4f6"; }}
                        onMouseLeave={(e) => { if (page !== currentPage) e.currentTarget.style.background = "#fff"; }}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                style={{
                    ...btnBase,
                    background: currentPage === totalPages ? "#f9fafb" : "#fff",
                    color: currentPage === totalPages ? "#d1d5db" : "#374151",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => { if (currentPage !== totalPages) e.currentTarget.style.background = "#f3f4f6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = currentPage === totalPages ? "#f9fafb" : "#fff"; }}
            >
                Next →
            </button>
        </div>
    );
};

export default Pagination;

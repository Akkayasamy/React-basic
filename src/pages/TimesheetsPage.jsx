import { useState } from "react";
import { TimesheetModal } from "../components/TimesheetModal.jsx";
import { useTimesheets } from "../graphql/timesheetQuery.js";
import { formatStatus, STATUS_COLORS } from "../utils/formatStatus.js";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function TimesheetsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, loading, refetch } = useTimesheets({ page, search: search });

  const entries = data?.getTimesheets?.results || [];
  const totalCount = data?.getTimesheets?.totalCount || 0;
  const totalPages = data?.getTimesheets?.totalPages || 1;

  const openCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (entry) => {
    setEditData(entry);
    setModalOpen(true);
  };

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleSuccess = () => {
    refetch();
  };

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold m-0 text-gray-900">Timesheets</h1>
          {!loading && totalCount != null ? (
            <p className="text-[13px] text-slate-400 mt-1">
              {totalCount} entr{totalCount !== 1 ? "ies" : "y"} found
              {search && ` for "${search}"`}
            </p>
          ) : (
            <p className="text-[13px] text-slate-400 mt-1">
              Track and manage your daily work hours
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={handleSearch} />
          <button
            onClick={openCreate}
            className="px-4 h-[38px] bg-sky-500 text-white border-0 rounded-lg text-[13px] font-semibold cursor-pointer flex items-center gap-1 whitespace-nowrap hover:bg-sky-600 transition"
          >
            + Log Time
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24 text-slate-400 text-[13px]">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-24 px-4 text-slate-400 bg-white rounded-xl border border-slate-200">
          <div className="text-[52px]">⏳</div>
          <p className="font-semibold">No timesheet entries found</p>
          {search && <p className="text-sm">Try a different search term</p>}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {["Date", "Employee", "Task/Subtask", "Description", "Hours", "Status", "Action"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((item, i) => {
                const statusColors = STATUS_COLORS[item.approvalStatus] || STATUS_COLORS.todo;
                return (
                  <tr key={item.id} className={i % 2 ? "bg-[#fafafa]" : "bg-white border-t border-slate-100"}>
                    <td className="py-3 px-4">{item.workDate}</td>
                    <td className="py-3 px-4">{item.employee?.first_name} {item.employee?.last_name}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-700">{item.task?.title}</div>
                      <div className="text-[11px] text-slate-400">{item.subtask?.title || "No Subtask"}</div>
                    </td>
                    <td className="py-3 px-4 italic">"{item.title}"</td>
                    <td className="py-3 px-4 font-bold text-sky-600">{item.hoursWorked}h</td>
                    <td className="py-3 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        style={{ background: statusColors.bg, color: statusColors.text }}
                      >
                        {formatStatus(item.approvalStatus || 'pending')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => openEdit(item)}
                        className="border border-slate-200 px-2.5 py-1 rounded-md text-xs text-sky-500 bg-white hover:bg-sky-50 transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="p-4 border-t border-slate-100">
            <Pagination
              currentPage={page}
              totalPages={totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}

      <TimesheetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
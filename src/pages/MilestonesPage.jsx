import { useState } from "react";
import { MilestoneModal } from "../components/MilestoneModal";
import { STATUS_COLORS, formatStatus } from "../utils/formatStatus";
import { useMilestones } from "../graphql/milestoneMutations";

export default function MilestonesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [page, setPage] = useState(1);

  const { data, loading, refetch ,totalCount} = useMilestones({ page, search: "" });

  const milestones = data || []; 
  const totalPages = Math.ceil(totalCount / 10);

  const openCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (m) => {
    setEditData(m);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-7">
        <div>
          <h1 className="text-2xl font-bold m-0">Milestones</h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Manage all your milestones
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 h-[38px] bg-sky-500 text-white border-0 rounded-lg text-[13px] font-semibold cursor-pointer flex items-center gap-1 whitespace-nowrap hover:bg-sky-600 transition"
        >
          + New Milestone
        </button>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="text-center py-24 text-slate-400 text-[13px]">
          Loading...
        </div>
      ) : milestones.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center py-24 px-4 text-slate-400">
          <div className="text-[52px]">🏁</div>
          <p className="font-semibold">No milestones yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "Title",
                  "Milestone Name",
                  "Project",
                  "Project Code",
                  "Status",
                  "Start",
                  "End",
                  "Owner",
                  "Action",
                ].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-semibold text-slate-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {milestones.map((m, i) => {
                const statusColors =
                  STATUS_COLORS[m.status] || STATUS_COLORS.todo;

                return (
                  <tr
                    key={m.id}
                    className={i % 2 ? "bg-[#fafafa]" : "bg-white"}
                  >
                    <td className="py-3 px-4 font-semibold">{m.title}</td>
                    <td className="py-3 px-4">{m.milestoneName}</td>
                    <td className="py-3 px-4">{m.project?.projectname || "—"}</td>
                    <td className="py-3 px-4">{m.project?.projectcode || "—"}</td>

                    <td className="py-3 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        style={{
                          background: statusColors.bg,
                          color: statusColors.text,
                        }}
                      >
                        {formatStatus(m.status)}
                      </span>
                    </td>

                    <td className="py-3 px-4">{m?.startDate || "—"}</td>
                    <td className="py-3 px-4">{m?.endDate || "—"}</td>
                    <td className="py-3 px-4">{formatStatus(m?.owner?.first_name) || "—"}</td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => openEdit(m)}
                        className="border border-slate-200 px-2.5 py-1 rounded-md text-xs text-sky-500 bg-white cursor-pointer transition hover:bg-violet-50 hover:border-sky-500"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* FIX 4: Add Pagination Controls */}
          <div className="px-5 py-4 bg-white border-t border-slate-100 flex justify-between items-center rounded-b-xl">
            <span className="text-[12px] text-slate-400">
              Page {page} of {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded border border-slate-200 text-[12px] bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded border border-slate-200 text-[12px] bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <MilestoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
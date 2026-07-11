import React from "react";

interface AdminTableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface AdminTableProps<T> {
  columns: AdminTableColumn[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  renderRow: (item: T) => React.ReactNode;
  emptyMessage?: string;
  toolbar?: React.ReactNode;
}

export function AdminTable<T>({
  columns,
  data,
  keyExtractor,
  renderRow,
  emptyMessage = "No items found.",
  toolbar,
}: AdminTableProps<T>) {
  return (
    <div className="bg-apyx-surface border border-apyx-border rounded-2xl overflow-hidden">
      {toolbar}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-apyx-text-secondary">
          <thead className="bg-apyx-bg border-b border-apyx-border text-xs uppercase font-semibold text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-apyx-border">
            {!data || data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-apyx-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-white/5 transition-colors">
                  {renderRow(item)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

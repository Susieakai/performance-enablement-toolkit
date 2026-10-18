import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  raciLegend,
  raciNote,
  raciRoles,
  raciRows,
  RaciRoleKey,
} from '../data/journey'

const MARK_STYLES: Record<string, string> = {
  R: 'bg-brand-600 text-white',
  A: 'bg-rose-500 text-white',
  C: 'bg-accent-500 text-white',
  I: 'bg-slate-400 text-white',
}

const COLS: { key: RaciRoleKey; label: string }[] = [
  ...raciRoles,
]

export default function RaciMatrix() {
  const [activeRole, setActiveRole] = useState<RaciRoleKey>('leader')

  const activeNotes = raciRows
    .map((row) => {
      const cell = row[activeRole]
      return cell.marks.length > 0 ? { stage: row.stage, marks: cell.marks, note: cell.note } : null
    })
    .filter(Boolean) as { stage: string; marks: string[]; note: string }[]

  const activeLabel = raciRoles.find((r) => r.key === activeRole)!.label

  return (
    <div>
      {/* 角色切换 Tab */}
      <div role="tablist" aria-label="选择角色" className="flex flex-wrap gap-2">
        {raciRoles.map((role) => (
          <button
            key={role.key}
            role="tab"
            type="button"
            aria-selected={activeRole === role.key}
            onClick={() => setActiveRole(role.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
              activeRole === role.key
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* 矩阵 */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500">
              <th className="px-4 py-3 font-medium">阶段</th>
              {COLS.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-center font-medium transition-colors ${
                    activeRole === col.key ? 'bg-brand-100 text-brand-800' : ''
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {raciRows.map((row) => (
              <tr key={row.stage} className="border-t border-slate-100">
                <th scope="row" className="px-4 py-3 font-medium text-slate-700">
                  {row.stage}
                </th>
                {COLS.map((col) => {
                  const cell = row[col.key]
                  const active = activeRole === col.key
                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-center align-middle transition-colors ${
                        active ? 'bg-brand-50' : ''
                      }`}
                    >
                      {cell.marks.length > 0 ? (
                        <span className="inline-flex gap-1">
                          {cell.marks.map((m) => (
                            <span
                              key={m}
                              className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${MARK_STYLES[m]} ${
                                active ? 'ring-2 ring-brand-300' : ''
                              }`}
                            >
                              {m}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 当前角色职责说明 */}
      <motion.div
        key={activeRole}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-4 rounded-xl bg-brand-50 p-4 text-sm"
      >
        <p className="font-semibold text-brand-800">{activeLabel} 的职责说明</p>
        <ul className="mt-2 space-y-1.5 text-slate-700">
          {activeNotes.map((n) => (
            <li key={n.stage} className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-medium text-slate-800">{n.stage}</span>
              <span className="text-slate-300">·</span>
              <span>{n.note}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* 图例与备注 */}
      <p className="mt-3 text-xs text-slate-500">图例：{raciLegend}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">备注：{raciNote}</p>
    </div>
  )
}

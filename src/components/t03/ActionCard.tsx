import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Quote, UserCheck } from 'lucide-react'
import { CommAction } from '../../data/t03'

interface Props {
  index: number
  action: CommAction
  checked: boolean
  onToggleCheck: () => void
}

/** STEP 2 沟通动作卡：勾选框 + 动作名 + 可展开的话术与员工反馈 */
export default function ActionCard({ index, action, checked, onToggleCheck }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        checked ? 'border-brand-300 bg-brand-50/40' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggleCheck}
          aria-label={`已完成沟通动作：${action.name}`}
          className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        />
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex flex-1 items-center gap-3 text-left focus:outline-none"
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
              checked ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {index + 1}
          </span>
          <span
            className={`font-semibold ${checked ? 'text-brand-800' : 'text-slate-800'}`}
          >
            {action.name}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-slate-100 px-4 py-4 pl-12">
              {action.guide && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    可参考表达 / 重点
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{action.guide}</p>
                </div>
              )}
              <div>
                {action.guide && (
                  <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-brand-700">
                    <Quote aria-hidden="true" className="h-3.5 w-3.5" />
                    示例话术
                  </p>
                )}
                <blockquote className="rounded-r-lg border-l-4 border-brand-400 bg-brand-50/60 py-2.5 pl-3 pr-3 text-sm italic leading-relaxed text-slate-700">
                  「{action.example}」
                </blockquote>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3">
                <span className="mt-0.5 flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-accent-600">
                  <UserCheck aria-hidden="true" className="h-4 w-4" />
                  员工反馈 / 共识
                </span>
                <p className="flex-1 text-sm leading-relaxed text-slate-600">{action.feedback}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

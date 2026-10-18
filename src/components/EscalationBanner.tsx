import { AlertTriangle, Siren } from 'lucide-react'
import { motion } from 'framer-motion'
import { escalationTitle, escalationTriggers } from '../data/journey'

interface Props {
  open: boolean
  onToggle: () => void
}

export default function EscalationBanner({ open, onToggle }: Props) {
  return (
    <CollapsibleTitle open={open} onToggle={onToggle} />
  )
}

function CollapsibleTitle({ open, onToggle }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-red-200 bg-red-50 shadow-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-5 py-4 text-left md:px-6"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
          <Siren aria-hidden="true" className="h-5 w-5 text-red-600" />
        </span>
        <span className="flex-1">
          <span className="block text-base font-bold text-red-800">即刻升级触发条件</span>
          <span className="mt-0.5 block text-sm text-red-700">
            {escalationTitle}
          </span>
        </span>
        <span
          className={`mt-1 shrink-0 text-xs font-medium text-red-500 transition-transform duration-200 ${
            open ? '' : 'rotate-180'
          }`}
          aria-hidden="true"
        >
          {open ? '收起 ▲' : '展开 ▼'}
        </span>
      </button>
      {open && (
        <motion.ol
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="space-y-2.5 border-t border-red-100 px-5 py-4 md:px-6"
        >
          {escalationTriggers.map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-red-900">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
          <li className="flex items-center gap-2 pt-1 text-xs text-red-600">
            <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5" />
            如遇以上情形，请跳过当前流程节奏，第一时间联系你的 People Partner。
          </li>
        </motion.ol>
      )}
    </div>
  )
}

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  title: ReactNode
  open: boolean
  onToggle: () => void
  children: ReactNode
  tone?: 'default' | 'danger'
}

/** 默认折叠的可展开区块（RACI 矩阵 / 升级警示条共用外壳） */
export default function Collapsible({ title, open, onToggle, children, tone = 'default' }: Props) {
  const isDanger = tone === 'danger'
  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-card ${
        isDanger ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors md:px-6"
      >
        {title}
        <ChevronDown
          aria-hidden="true"
          className={`ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ${
            isDanger ? 'text-red-500' : 'text-slate-400'
          } ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className={isDanger ? 'px-5 pb-5 md:px-6' : 'px-5 pb-6 md:px-6'}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

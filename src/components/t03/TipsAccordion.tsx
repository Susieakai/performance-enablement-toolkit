import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HeartHandshake } from 'lucide-react'
import { hardScenarios, tipsIntro, tipsTitle } from '../../data/t03'

/** STEP 2 艰难对话场景手风琴 */
export default function TipsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <HeartHandshake aria-hidden="true" className="h-5 w-5 text-accent-600" />
        </span>
        <div>
          <h3 className="font-bold text-slate-900">沟通 Tips：艰难对话场景</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{tipsIntro}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {hardScenarios.map((s, i) => {
          const open = openIndex === i
          return (
            <div key={i} className="overflow-hidden rounded-xl border border-amber-200 bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-amber-50"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  员工反应：{s.situation}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-amber-100 px-4 py-3 pl-13 text-sm leading-relaxed text-slate-600"
                       style={{ paddingLeft: '3.25rem' }}>
                      <span className="mr-1.5 font-semibold text-accent-600">应对 Tips：</span>
                      {s.tip}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Boxes, Compass, Route } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { escalationTitle } from '../data/journey'
import JourneyPath from '../components/JourneyPath'
import RaciMatrix from '../components/RaciMatrix'
import Collapsible from '../components/Collapsible'
import EscalationBanner from '../components/EscalationBanner'

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: 'easeOut' as const },
}

export default function JourneyPage() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [visited, setVisited] = useLocalStorage<number[]>('pet-visited-nodes', [])
  const [raciOpen, setRaciOpen] = useState(false)
  const [escOpen, setEscOpen] = useState(false)

  const toggleNode = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
    setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const progress = Math.round((visited.length / 5) * 100)

  return (
    <div className="min-h-screen">
      {/* 顶部旅程浏览进度条 */}
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-slate-200/60" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-600 to-accent-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Hero */}
      <header className="bg-gradient-to-b from-brand-50 via-white to-white pb-10 pt-14 md:pt-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <motion.div {...fadeIn} initial>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
              <Compass aria-hidden="true" className="h-3.5 w-3.5" />
              Performance Enablement Toolkit · 为 Leader 打造的绩效赋能旅程
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 md:text-5xl">
              绩效赋能工具箱
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              当员工绩效未达预期，遵循五步走，把「处理问题」变成「赋能成长」。
            </p>
            {/* 浏览进度提示 */}
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
              <span className="whitespace-nowrap">旅程浏览进度</span>
              <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-brand-600"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="tabular-nums">{visited.length}/5</span>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-12 px-4 pb-20 md:px-6">
        {/* 旅程图主体 */}
        <motion.section {...fadeIn} initial aria-label="绩效赋能五步旅程" className="pt-2">
          <div className="mb-6 flex items-center gap-2">
            <Route aria-hidden="true" className="h-5 w-5 text-brand-600" />
            <h2 className="text-xl font-bold text-slate-900">绩效赋能旅程 · 五步走</h2>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card md:p-8">
            <JourneyPath openId={openId} visited={visited} onToggleNode={toggleNode} />
          </div>
        </motion.section>

        {/* RACI 分工矩阵 */}
        <motion.section {...fadeIn} initial aria-label="RACI 分工矩阵">
          <Collapsible
            open={raciOpen}
            onToggle={() => setRaciOpen((v) => !v)}
            title={
              <span className="flex items-center gap-2">
                <Boxes aria-hidden="true" className="h-5 w-5 text-brand-600" />
                <span className="text-base font-bold text-slate-900">
                  查看各角色分工 R/A/C/I
                </span>
              </span>
            }
          >
            <RaciMatrix />
          </Collapsible>
        </motion.section>

        {/* 即刻升级触发条件 */}
        <motion.section {...fadeIn} initial aria-label="即刻升级触发条件">
          <EscalationBanner open={escOpen} onToggle={() => setEscOpen((v) => !v)} />
          {!escOpen && (
            <p className="mt-2 px-1 text-xs text-slate-400">{escalationTitle}（点击展开）</p>
          )}
        </motion.section>
      </div>
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { journeySteps, JourneyStep } from '../data/journey'

interface Props {
  openId: number | null
  visited: number[]
  onToggleNode: (id: number) => void
}

/** 桌面端节点在 S 形路径上的坐标（对应 SVG viewBox 0 0 1000 300） */
const POS = [
  { left: '10%', top: 48 }, // 上
  { left: '30%', top: 178 }, // 下
  { left: '50%', top: 48 },
  { left: '70%', top: 178 },
  { left: '90%', top: 48 },
]

const PATH_D =
  'M 100 80 C 165 80 235 210 300 210 C 365 210 435 80 500 80 C 565 80 635 210 700 210 C 765 210 835 80 900 80'

function NodeCircle({
  step,
  visited,
  open,
}: {
  step: JourneyStep
  visited: boolean
  open: boolean
}) {
  const isEntry = step.toolEntry
  return (
    <div className="relative">
      {isEntry && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent-400/40"
          animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 text-xl font-bold shadow-sm transition-colors ${
          isEntry
            ? visited
              ? 'border-accent-500 bg-accent-500 text-white'
              : 'border-accent-500 bg-white text-accent-600'
            : visited
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-slate-300 bg-white text-slate-500'
        } ${open ? 'ring-4 ring-offset-1 ' + (isEntry ? 'ring-accent-200' : 'ring-brand-200') : ''}`}
      >
        {visited ? <CheckCircle2 aria-hidden="true" className="h-7 w-7" /> : step.id}
      </span>
      {isEntry && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          工具卡
        </span>
      )}
    </div>
  )
}

function NodeLabel({ step, visited }: { step: JourneyStep; visited: boolean }) {
  return (
    <div className="mt-2 flex w-40 flex-col items-center text-center">
      <span
        className={`text-sm font-semibold ${visited ? 'text-brand-800' : 'text-slate-700'}`}
      >
        {step.name}
      </span>
      <span className="text-xs text-slate-400">{step.en}</span>
      <span
        className={`mt-1 rounded-full border px-2 py-0.5 text-[10px] ${
          step.toolEntry
            ? 'border-accent-200 bg-accent-50 text-accent-600'
            : 'border-slate-200 bg-slate-50 text-slate-500'
        }`}
      >
        {step.tool}
      </span>
    </div>
  )
}

export default function JourneyPath({ openId, visited, onToggleNode }: Props) {
  const current = journeySteps.find((s) => s.id === openId) ?? null

  return (
    <div>
      {/* 桌面端：S 形路径 */}
      <div className="relative hidden h-[300px] md:block" aria-label="绩效赋能旅程图">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={PATH_D} fill="none" stroke="#e2e8f0" strokeWidth="5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          <path
            d={PATH_D}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeDasharray="1 10"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.7"
          />
        </svg>
        {journeySteps.map((step, i) => {
          const pos = POS[i]
          const isVisited = visited.includes(step.id)
          const isOpen = openId === step.id
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onToggleNode(step.id)}
              aria-expanded={isOpen}
              aria-label={`第${step.id}步 ${step.name}`}
              className="group absolute flex -translate-x-1/2 flex-col items-center focus:outline-none"
              style={{ left: pos.left, top: pos.top }}
            >
              <div className="transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110">
                <NodeCircle step={step} visited={isVisited} open={isOpen} />
              </div>
              <NodeLabel step={step} visited={isVisited} />
            </button>
          )
        })}
      </div>

      {/* 平板以下：垂直时间线 */}
      <div className="relative md:hidden">
        <div className="absolute bottom-6 left-8 top-6 w-px bg-slate-200" aria-hidden="true" />
        <ul className="space-y-4">
          {journeySteps.map((step) => {
            const isVisited = visited.includes(step.id)
            const isOpen = openId === step.id
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => onToggleNode(step.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white"
                >
                  <div className="shrink-0 bg-slate-50 pr-1">
                    <NodeCircle step={step} visited={isVisited} open={isOpen} />
                  </div>
                  <NodeLabel step={step} visited={isVisited} />
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 展开面板：同一时间只展开一个 */}
      <div className="mt-6 min-h-[10px]">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div
                className={`rounded-2xl border bg-white p-5 shadow-card md:p-6 ${
                  current.toolEntry ? 'border-accent-300' : 'border-brand-200'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${
                      current.toolEntry ? 'bg-accent-500' : 'bg-brand-600'
                    }`}
                  >
                    {current.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {current.name}
                    <span className="ml-2 text-sm font-normal text-slate-400">{current.en}</span>
                  </h3>
                </div>
                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-brand-800">该环节目的</dt>
                    <dd className="text-slate-600">{current.purpose}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-800">Leader 核心职责</dt>
                    <dd className="text-slate-600">{current.leaderDuty}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-800">对应工具卡</dt>
                    <dd className="text-slate-600">
                      <span className="font-medium text-slate-800">{current.tool}</span>
                      <span className="mx-2 text-slate-300">·</span>
                      {current.toolIntro}
                    </dd>
                  </div>
                </dl>
                {current.toolEntry && (
                  <Link
                    to="/t03"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
                  >
                    进入工具卡
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

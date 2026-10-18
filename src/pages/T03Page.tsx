import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MailCheck,
  MessagesSquare,
  RefreshCw,
} from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  footerBannerText,
  step1Checklist,
  step1DoneText,
  step1Guide,
  step2Actions,
  step2Guide,
  t03Subtitle,
  t03Title,
} from '../data/t03'
import CheckRow from '../components/t03/CheckRow'
import ActionCard from '../components/t03/ActionCard'
import TipsAccordion from '../components/t03/TipsAccordion'
import EmailCard from '../components/t03/EmailCard'

interface ChecklistState {
  step1: boolean[]
  step2: boolean[]
}

const INITIAL_CHECKLIST: ChecklistState = {
  step1: [false, false],
  step2: Array(7).fill(false),
}

const SECTIONS = [
  { id: 't03-step1', label: 'STEP 1 · 初次沟通准备', icon: ClipboardCheck },
  { id: 't03-step2', label: 'STEP 2 · 初次沟通·开启计划', icon: MessagesSquare },
  { id: 't03-step3', label: 'STEP 3 · 发送确认邮件', icon: MailCheck },
]

export default function T03Page() {
  const [checklist, setChecklist] = useLocalStorage<ChecklistState>(
    'pet-checklist-t03',
    INITIAL_CHECKLIST,
  )
  const [active, setActive] = useState('t03-step1')
  const [emailCopied, setEmailCopied] = useState(false)

  const step1Done = checklist.step1.every(Boolean)
  const step2Done = checklist.step2.every(Boolean)
  const stepDone = [step1Done, step2Done, emailCopied]

  const doneCount =
    checklist.step1.filter(Boolean).length + checklist.step2.filter(Boolean).length
  const totalCount = checklist.step1.length + checklist.step2.length
  const progress = Math.round((doneCount / totalCount) * 100)

  /* 滚动监听：当前步骤自动高亮 */
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 130
      let current = 't03-step1'
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= pos) current = s.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleStep1 = (i: number) =>
    setChecklist((c) => {
      const next = [...c.step1]
      next[i] = !next[i]
      return { ...c, step1: next }
    })

  const toggleStep2 = (i: number) =>
    setChecklist((c) => {
      const next = [...c.step2]
      next[i] = !next[i]
      return { ...c, step2: next }
    })

  const resetProgress = () => {
    setChecklist(INITIAL_CHECKLIST)
    setEmailCopied(false)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen pb-20">
      {/* 页头 */}
      <header className="border-b border-slate-200 bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="mx-auto max-w-4xl px-4 pb-8 pt-8 md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition-colors hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            返回绩效赋能旅程图
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-brand-900 md:text-3xl">
              {t03Title}
            </h1>
            <span className="rounded-full bg-accent-100 px-2.5 py-1 text-xs font-semibold text-accent-600">
              绩效赋能旅程 · 步骤 ③
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-400">{t03Subtitle}</p>
        </div>
      </header>

      {/* sticky 分步向导导航 */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 py-2">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon
              const isActive = active === s.id
              const done = stepDone[i]
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollTo(s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 md:text-sm ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {s.label}
                  {done && (
                    <CheckCircle2
                      aria-label="已完成"
                      className={`h-4 w-4 ${isActive ? 'text-accent-400' : 'text-emerald-500'}`}
                    />
                  )}
                </button>
              )
            })}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs tabular-nums text-slate-500">
                Check-list {doneCount}/{totalCount}
              </span>
              <button
                type="button"
                onClick={resetProgress}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                aria-label="重置进度"
              >
                <RefreshCw aria-hidden="true" className="h-3 w-3" />
                重置进度
              </button>
            </div>
          </div>
          <div className="pb-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl space-y-14 px-4 pt-10 md:px-6">
        {/* STEP 1 */}
        <section id="t03-step1" className="scroll-mt-28">
          <StepHeader
            index={1}
            title="初次沟通准备"
            icon={<ClipboardCheck aria-hidden="true" className="h-5 w-5" />}
          />
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{step1Guide}</p>
          <div className="mt-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">沟通前确认 Check-list</h3>
            <span className="text-xs font-medium tabular-nums text-brand-700">
              {checklist.step1.filter(Boolean).length}/{checklist.step1.length} 已就绪
            </span>
          </div>
          <div className="mt-2 space-y-2.5">
            {step1Checklist.map((item, i) => (
              <CheckRow
                key={item.id}
                item={item}
                checked={checklist.step1[i]}
                onToggle={() => toggleStep1(i)}
              />
            ))}
          </div>
          {step1Done && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
              {step1DoneText}
            </motion.p>
          )}
        </section>

        {/* STEP 2 */}
        <section id="t03-step2" className="scroll-mt-28">
          <StepHeader
            index={2}
            title="初次沟通·开启计划"
            icon={<MessagesSquare aria-hidden="true" className="h-5 w-5" />}
          />
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{step2Guide}</p>
          <div className="mt-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">7 项沟通动作 Check-list</h3>
            <span className="text-xs font-medium tabular-nums text-brand-700">
              {checklist.step2.filter(Boolean).length}/{checklist.step2.length} 已完成
            </span>
          </div>
          <div className="mt-2 space-y-2.5">
            {step2Actions.map((action, i) => (
              <ActionCard
                key={action.id}
                index={i}
                action={action}
                checked={checklist.step2[i]}
                onToggleCheck={() => toggleStep2(i)}
              />
            ))}
          </div>
          <div className="mt-6">
            <TipsAccordion />
          </div>
        </section>

        {/* STEP 3 */}
        <section id="t03-step3" className="scroll-mt-28">
          <StepHeader
            index={3}
            title="发送确认邮件"
            icon={<MailCheck aria-hidden="true" className="h-5 w-5" />}
          />
          <div className="mt-4">
            <EmailCard onCopied={() => setEmailCopied(true)} />
          </div>
        </section>

        {/* 页尾衔接 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center md:p-6"
        >
          <CheckCircle2 aria-hidden="true" className="h-6 w-6 shrink-0 text-emerald-600" />
          <p className="flex-1 text-sm font-medium leading-relaxed text-emerald-800">
            {footerBannerText}
          </p>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
          >
            返回旅程图
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </div>
  )
}

function StepHeader({
  index,
  title,
  icon,
}: {
  index: number
  title: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-brand-500">
          STEP {index}
        </p>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
    </div>
  )
}

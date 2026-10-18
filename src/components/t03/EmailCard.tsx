import { useState } from 'react'
import { Check, Copy, Lightbulb, Mail } from 'lucide-react'
import { emailTemplate, leaderTips, step3Guide } from '../../data/t03'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
}

/** STEP 3 邮件模板卡片：一键复制 + Leader Tip */
export default function EmailCard({ onCopied }: { onCopied?: () => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copyText(emailTemplate)
    setCopied(true)
    onCopied?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-600">{step3Guide}</p>

      <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Mail aria-hidden="true" className="h-4 w-4 text-brand-600" />
            确认邮件模板
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="一键复制邮件模板"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
              copied
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-brand-600 text-white hover:bg-brand-700'
            }`}
          >
            {copied ? (
              <>
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
                已复制 ✓
              </>
            ) : (
              <>
                <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                一键复制
              </>
            )}
          </button>
        </div>
        <pre className="whitespace-pre-wrap px-5 py-4 font-mono text-[13px] leading-relaxed text-slate-700">
{emailTemplate}
        </pre>
      </div>

      <aside className="mt-4 rounded-xl border-l-4 border-accent-400 bg-accent-50 p-4">
        <p className="flex items-center gap-1.5 font-bold text-accent-600">
          <Lightbulb aria-hidden="true" className="h-4 w-4" />
          Leader Tip
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
          {leaderTips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

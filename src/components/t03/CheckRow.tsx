import { CheckCircle2 } from 'lucide-react'
import { PrepItem } from '../../data/t03'

interface Props {
  item: PrepItem
  checked: boolean
  onToggle: () => void
}

/** STEP 1 确认事项行（真实 checkbox 语义） */
export default function CheckRow({ item, checked, onToggle }: Props) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
        checked
          ? 'border-brand-300 bg-brand-50'
          : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 accent-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        aria-label={`已确认：${item.name}`}
      />
      <span className="flex-1">
        <span
          className={`flex items-center gap-2 font-semibold ${
            checked ? 'text-brand-800' : 'text-slate-800'
          }`}
        >
          {item.name}
          {checked && <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-brand-600" />}
        </span>
        <span className="mt-1 block text-sm text-slate-500">{item.point}</span>
      </span>
    </label>
  )
}

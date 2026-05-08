import { AlertTriangle, ShieldAlert, Skull } from 'lucide-react'
import {
  resolveHazards,
  genericEtchantSafety,
  type EtchantHazard,
  type HazardLevel,
} from '@/lib/etchant-hazards'

interface Props {
  /** Etchant name to look up. If omitted/unmatched, falls back to generic safety guidance. */
  etchant?: string
  /** Provide a complete record explicitly (overrides lookup). */
  hazard?: EtchantHazard
  /** "compact" hides the storage section to keep the callout short. */
  variant?: 'full' | 'compact'
}

const levelStyles: Record<
  HazardLevel,
  { border: string; bg: string; iconColor: string; pillBg: string; pillText: string; label: string; Icon: typeof AlertTriangle }
> = {
  caution: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    pillBg: 'bg-amber-100',
    pillText: 'text-amber-900',
    label: 'CAUTION',
    Icon: AlertTriangle,
  },
  danger: {
    border: 'border-red-600',
    bg: 'bg-red-50',
    iconColor: 'text-red-700',
    pillBg: 'bg-red-100',
    pillText: 'text-red-900',
    label: 'DANGER',
    Icon: ShieldAlert,
  },
  extreme: {
    border: 'border-red-900',
    bg: 'bg-red-100',
    iconColor: 'text-red-900',
    pillBg: 'bg-red-900',
    pillText: 'text-white',
    label: 'EXTREME HAZARD',
    Icon: Skull,
  },
}

export default function EtchantSafetyWarning({ etchant, hazard, variant = 'full' }: Props) {
  const record: EtchantHazard = hazard ?? resolveHazards(etchant) ?? genericEtchantSafety
  const style = levelStyles[record.level]
  const { Icon } = style

  return (
    <aside
      className={`my-6 rounded-md border-l-4 ${style.border} ${style.bg} p-4 md:p-5`}
      role="note"
      aria-label={`${style.label}: ${record.name} safety information`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${style.iconColor}`} aria-hidden="true" />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span
              className={`inline-block text-[11px] font-bold tracking-wider px-2 py-0.5 rounded ${style.pillBg} ${style.pillText}`}
            >
              {style.label}
            </span>
            <span className="font-semibold text-gray-900">{record.name}</span>
          </div>

          <p className="text-sm text-gray-800 mb-3 leading-snug">{record.headline}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold text-gray-900 text-xs uppercase tracking-wide mb-1">Specific hazards</p>
              <ul className="space-y-1 text-gray-800 list-disc list-outside ml-4">
                {record.hazards.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs uppercase tracking-wide mb-1">PPE &amp; handling</p>
              <ul className="space-y-1 text-gray-800 list-disc list-outside ml-4">
                {record.handling.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {variant === 'full' && record.storage && record.storage.length > 0 && (
            <div className="mt-3 pt-3 border-t border-black/10">
              <p className="font-semibold text-gray-900 text-xs uppercase tracking-wide mb-1">Storage &amp; disposal</p>
              <ul className="space-y-1 text-sm text-gray-800 list-disc list-outside ml-4">
                {record.storage.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-3 text-xs text-gray-600 italic">
            This callout is a summary, not a substitute for the SDS. Review the manufacturer's safety data
            sheet and your institution's chemical-handling SOP before mixing or applying any etchant.
          </p>
        </div>
      </div>
    </aside>
  )
}

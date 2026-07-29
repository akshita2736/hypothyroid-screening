export default function ProbabilityChart({ probabilities }) {
  const entries = Object.entries(probabilities).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Probability breakdown</p>
      {entries.map(([label, value]) => (
        <div key={label} className="flex items-center gap-3 text-sm">
          <span className="w-48 shrink-0 text-gray-600">{label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-clinical-500/70"
              style={{ width: `${value * 100}%` }}
            />
          </div>
          <span className="w-12 shrink-0 text-right text-gray-500">
            {Math.round(value * 100)}%
          </span>
        </div>
      ))}
    </div>
  )
}

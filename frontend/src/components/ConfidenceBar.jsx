export default function ConfidenceBar({ confidence }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-gray-700">Confidence</span>
        <span className="font-semibold text-clinical-700">{confidence}%</span>
      </div>
      <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-clinical-500 transition-all duration-500"
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  )
}

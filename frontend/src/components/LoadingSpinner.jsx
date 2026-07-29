import { useEffect, useState } from 'react'

/**
 * Cycles through `steps` (e.g. ["Running prediction...", "Generating clinical summary..."])
 * while a request is in flight. The backend does this in one request, but showing sequential
 * steps gives the user a more accurate sense of what's happening than a single static spinner.
 */
export default function LoadingSpinner({ steps }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (steps.length <= 1) return
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1))
    }, 1200)
    return () => clearInterval(interval)
  }, [steps])

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-clinical-100 border-t-clinical-500" />
      <p className="text-sm text-gray-600">{steps[stepIndex]}</p>
    </div>
  )
}

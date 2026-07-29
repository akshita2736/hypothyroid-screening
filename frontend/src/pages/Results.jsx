import { useLocation, useNavigate } from 'react-router-dom'
import ConfidenceBar from '../components/ConfidenceBar.jsx'
import ProbabilityChart from '../components/ProbabilityChart.jsx'
import Disclaimer from '../components/Disclaimer.jsx'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-gray-600">No result to show yet.</p>
        <button
          onClick={() => navigate('/screening')}
          className="mt-4 rounded-md bg-clinical-500 px-5 py-2 font-medium text-white hover:bg-clinical-600"
        >
          Start a Screening
        </button>
      </div>
    )
  }

  const { prediction, confidence, probabilities, summary, diet_do, diet_avoid, disclaimer } =
    result

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 print:py-0">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <span className="inline-block rounded-full bg-clinical-50 px-4 py-1 text-sm font-semibold text-clinical-700">
          Prediction
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-gray-900">{prediction}</h2>

        <div className="mt-5">
          <ConfidenceBar confidence={confidence} />
        </div>

        <div className="mt-6">
          <ProbabilityChart probabilities={probabilities} />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-gray-800">
          Clinical Summary <span className="font-normal text-gray-400">(Generated using Llama 3.3)</span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">{summary}</p>
      </div>

      {(diet_do?.length > 0 || diet_avoid?.length > 0) && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {diet_do?.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-clinical-700">Foods to Favor</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                {diet_do.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {diet_avoid?.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-red-600">Foods to Limit</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                {diet_avoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex gap-3 print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Print
        </button>
        <button
          onClick={() => navigate('/screening')}
          className="rounded-md bg-clinical-500 px-5 py-2 text-sm font-medium text-white hover:bg-clinical-600"
        >
          New Screening
        </button>
      </div>

      <Disclaimer text={disclaimer} />
    </div>
  )
}

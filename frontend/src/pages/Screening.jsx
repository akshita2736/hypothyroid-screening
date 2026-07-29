import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorBanner from '../components/ErrorBanner.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { parseReport, predict, ApiError } from '../api.js'
import { HORMONE_FIELDS, MEDICAL_HISTORY_FIELDS, buildDefaultFormState } from '../formFields.js'

const PARSE_STEPS = ['Extracting report...']
const PREDICT_STEPS = ['Running prediction...', 'Generating clinical summary...']

export default function Screening() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState(buildDefaultFormState())
  const [parseNote, setParseNote] = useState(null)
  const [error, setError] = useState(null)
  const [loadingSteps, setLoadingSteps] = useState(null) // null = not loading

  function updateField(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setParseNote(null)
    setLoadingSteps(PARSE_STEPS)

    try {
      const result = await parseReport(file)
      setFormData((prev) => {
        const next = { ...prev }
        HORMONE_FIELDS.forEach(({ key }) => {
          const value = result.extracted?.[key]
          if (value !== null && value !== undefined) next[key] = value
        })
        return next
      })
      if (result.note) setParseNote(result.note)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not process that file.')
    } finally {
      setLoadingSteps(null)
    }
  }

  function validate() {
    const age = Number(formData.age)
    if (formData.age === '' || Number.isNaN(age) || age < 0 || age > 120) {
      return 'Age must be between 0 and 120.'
    }
    for (const { key, label } of HORMONE_FIELDS) {
      const value = Number(formData[key])
      if (formData[key] === '' || Number.isNaN(value) || value < 0) {
        return `${label} must be a number of 0 or greater.`
      }
    }
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    const payload = { age: Number(formData.age) }
    HORMONE_FIELDS.forEach(({ key }) => (payload[key] = Number(formData[key])))
    MEDICAL_HISTORY_FIELDS.forEach(({ key }) => (payload[key] = Boolean(formData[key])))

    setLoadingSteps(PREDICT_STEPS)
    try {
      const result = await predict(payload)
      navigate('/results', { state: { result } })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoadingSteps(null)
    }
  }

  if (loadingSteps) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <LoadingSpinner steps={loadingSteps} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-900">Screening</h2>
      <p className="mt-1 text-sm text-gray-500">
        Upload a lab report or enter your values manually below.
      </p>

      <ErrorBanner message={error} onDismiss={() => setError(null)} />

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        <label className="block text-sm font-medium text-gray-700">
          Upload Report (PDF)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-clinical-50 file:px-4 file:py-2 file:text-clinical-700 hover:file:bg-clinical-100"
        />
        {parseNote && <p className="mt-2 text-sm text-amber-600">{parseNote}</p>}
        <p className="mt-2 text-xs text-gray-400">
          Only the hormone values below can be auto-filled from a report. Medical history must
          be entered manually.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <fieldset className="rounded-lg border border-gray-200 bg-white p-5">
          <legend className="px-1 text-sm font-semibold text-gray-800">Patient Details</legend>
          <div className="mt-3">
            <label className="block text-sm text-gray-600">Age</label>
            <input
              type="number"
              min={0}
              max={120}
              value={formData.age}
              onChange={(e) => updateField('age', e.target.value)}
              className="mt-1 w-32 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500"
            />
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-200 bg-white p-5">
          <legend className="px-1 text-sm font-semibold text-gray-800">Hormone Values</legend>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {HORMONE_FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm text-gray-600">{label}</label>
                <input
                  type="number"
                  step="any"
                  min={0}
                  value={formData[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500"
                />
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-200 bg-white p-5">
          <legend className="px-1 text-sm font-semibold text-gray-800">Medical History</legend>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {MEDICAL_HISTORY_FIELDS.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={Boolean(formData[key])}
                  onChange={(e) => updateField(key, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-clinical-600 focus:ring-clinical-500"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full rounded-md bg-clinical-500 py-3 font-medium text-white transition hover:bg-clinical-600"
        >
          Predict
        </button>
      </form>
    </div>
  )
}

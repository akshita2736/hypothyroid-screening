import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
        Women's Hypothyroidism Screening
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-gray-600">
        Upload a lab report or enter your hormone panel values manually to get a screening
        estimate, powered by a machine learning model trained on clinical thyroid data — plus a
        plain-language summary and general dietary guidance.
      </p>
      <button
        onClick={() => navigate('/screening')}
        className="mt-8 rounded-md bg-clinical-500 px-6 py-3 font-medium text-white transition hover:bg-clinical-600"
      >
        Start Screening
      </button>
      <p className="mt-10 text-xs text-gray-400">
        This tool is intended for informational and educational purposes only. It is not a
        substitute for professional medical advice, diagnosis, or treatment.
      </p>
    </div>
  )
}

export default function Disclaimer({ text }) {
  return (
    <p className="mt-8 rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-600">
      {text || 'This is a screening estimate, not a medical diagnosis. Consult a doctor for confirmation.'}
    </p>
  )
}

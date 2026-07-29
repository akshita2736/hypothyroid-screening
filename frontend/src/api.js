const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export class ApiError extends Error {}

async function handleResponse(res) {
  if (!res.ok) {
    let detail = 'Something went wrong. Please try again.'
    try {
      const data = await res.json()
      if (res.status === 422) {
        detail = 'Please check your inputs — one or more values are out of the expected range.'
      } else if (data?.detail) {
        detail = typeof data.detail === 'string' ? data.detail : detail
      }
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new ApiError(detail)
  }
  return res.json()
}

export async function parseReport(file) {
  const formData = new FormData()
  formData.append('file', file)

  let res
  try {
    res = await fetch(`${API_URL}/parse-report`, {
      method: 'POST',
      body: formData,
    })
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.')
  }
  return handleResponse(res)
}

export async function predict(payload) {
  let res
  try {
    res = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.')
  }
  return handleResponse(res)
}

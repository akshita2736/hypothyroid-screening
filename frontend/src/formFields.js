// These keys must match backend/schemas.py PredictionRequest exactly.
export const HORMONE_FIELDS = [
  { key: 'TSH', label: 'TSH' },
  { key: 'T3', label: 'T3' },
  { key: 'TT4', label: 'TT4' },
  { key: 'T4U', label: 'T4U' },
  { key: 'FTI', label: 'FTI' },
]

export const MEDICAL_HISTORY_FIELDS = [
  { key: 'on_thyroxine', label: 'On Thyroxine' },
  { key: 'query_on_thyroxine', label: 'Query on Thyroxine' },
  { key: 'on_antithyroid_meds', label: 'On Antithyroid Medication' },
  { key: 'sick', label: 'Currently Sick' },
  { key: 'pregnant', label: 'Pregnant' },
  { key: 'thyroid_surgery', label: 'Thyroid Surgery' },
  { key: 'I131_treatment', label: 'I131 Treatment' },
  { key: 'query_hypothyroid', label: 'Query Hypothyroid' },
  { key: 'query_hyperthyroid', label: 'Query Hyperthyroid' },
  { key: 'lithium', label: 'On Lithium' },
  { key: 'goitre', label: 'Goitre' },
  { key: 'tumor', label: 'Tumor' },
  { key: 'hypopituitary', label: 'Hypopituitary' },
  { key: 'psych', label: 'Psychiatric Condition' },
]

export function buildDefaultFormState() {
  const defaults = { age: '' }
  HORMONE_FIELDS.forEach((f) => (defaults[f.key] = ''))
  MEDICAL_HISTORY_FIELDS.forEach((f) => (defaults[f.key] = false))
  return defaults
}

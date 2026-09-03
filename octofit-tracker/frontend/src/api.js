import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  return []
}

export function useCollection(endpoint) {
  const [state, setState] = useState({ items: [], loading: true, error: '' })

  useEffect(() => {
    let active = true

    async function loadCollection() {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`)
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        const payload = await response.json()
        if (active) setState({ items: normalizeCollection(payload), loading: false, error: '' })
      } catch (error) {
        if (active) setState({ items: [], loading: false, error: error.message })
      }
    }

    loadCollection()
    return () => { active = false }
  }, [endpoint])

  return state
}

export function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value))
}
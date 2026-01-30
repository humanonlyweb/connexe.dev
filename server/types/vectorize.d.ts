export interface Match {
  id: string
  score: number
  values?: number[] | null
  metadata?: unknown
  namespace?: string | null
}

export interface IndexQueryResponse {
  count?: number
  matches?: Match[]
}

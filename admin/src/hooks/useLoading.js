import { useContext } from 'react'
import { LoadingContext } from 'providers/LoadingProvider'

export default function useLoading() {
  const { setShowLoading } = useContext(LoadingContext)
  return setShowLoading
}

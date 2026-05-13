import { useSearchParams } from "react-router-dom"

export default function useSearch() {


  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get('search') || ''

  const updateSearchQuery = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('search', query)
      params.delete('page')
      params.delete('category')
    } else {
      params.delete('search')
    }
     setSearchParams(params, { replace: true })
  }

  return { searchQuery, updateSearchQuery };

}

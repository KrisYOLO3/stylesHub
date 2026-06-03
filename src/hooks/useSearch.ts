import { useSearchParams } from "react-router-dom"

export function useSearch() {

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const updateSearchQuery = (query: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete('page');
    if (query) {
      params.set('search', query)
      params.delete('category')
    } else {
      params.delete('search')
    }
     setSearchParams(params, { replace: true })
  }

  return { searchQuery, updateSearchQuery };

}

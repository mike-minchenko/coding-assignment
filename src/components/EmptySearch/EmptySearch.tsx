const EmptySearch = ({ searchValue }: EmptySearchProps) => {
  return (
    <div className="text-center" aria-live="polite">
      <span>No results found for "{searchValue}".</span>
    </div>
  )
}

export default EmptySearch

interface EmptySearchProps {
  searchValue: string
}

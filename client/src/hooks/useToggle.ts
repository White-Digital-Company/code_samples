import { useState } from 'react'

interface UseToggleProps {}

const useToggle = (): [string[], (itemId: string) => void] => {
  const [ids, setIds] = useState<string[]>([])

  const toggle = (itemId: string) => {
    setIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((elId) => elId !== itemId)
        : [...prev, itemId],
    )
  }

  return [ids, toggle]
}

export default useToggle

import { useEffect, useState } from "react"
import styles from "./search.module.css"

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza")
  const URL = "https://api.spoonacular.com/recipes/complexSearch"
  const API_KEY = import.meta.env.VITE_API_KEY
  useEffect(() => {
    const fetchRecipe = async () => {
      const respone = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
      const data = await respone.json()
      setFoodData(data.results)
    }
    fetchRecipe()
  }, [query])

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputField}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        type="text"
        value={query}
      />
    </div>
  )
}

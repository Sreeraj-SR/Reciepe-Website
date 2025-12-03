import React, { useEffect, useState } from "react"
import styles from "./fetchRecipe.module.css"

export default function FetchRecipe({ recipeId }) {
  const [recipe, setRecipe] = useState(null)
  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    if (recipeId) {
      const fetchRecipe = async () => {
        const respone = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
        )
        const data = await respone.json()

        setRecipe(data)
        console.log(recipe.title)
      }
      fetchRecipe()
    }
  }, [recipeId])

  if (!recipe) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <h2>{recipe.title}</h2>
      <div className="imgContainer">
        <img
          className={styles.imge}
          src={recipe.image}
          alt={recipe.title}
          style={{ width: "100%" }}
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  )
}

import { useState } from "react"
import FoodItem from "./FoodItem"
import styles from "./foodlist.module.css"
import Popup from "./Popup"
import FetchRecipe from "./FetchRecipe"

export default function Foodlist({ foodData }) {
  const [selectedId, setSelectedId] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleView = (id) => {
    setSelectedId(id)
    setShowPopup(true)
  }

  const handleClose = () => {
    setShowPopup(false)
    setSelectedId(null)
  }
  return (
    <div className={styles.foodListContainer}>
      {foodData.map((food) => (
        <FoodItem key={food.id} foodItem={food} onView={handleView} />
      ))}
      <Popup show={showPopup} onClose={handleClose}>
        {selectedId && <FetchRecipe recipeId={selectedId} />}
      </Popup>
    </div>
  )
}

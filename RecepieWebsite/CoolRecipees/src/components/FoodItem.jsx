import styles from "./foodItem.module.css"

export default function FoodItem({ foodItem, onView }) {
  return (
    <div className={styles.itemContainer}>
      <img className={styles.rimg} src={foodItem.image} />
      <div className={styles.bottomContainer}>
        <p className={styles.name}>{foodItem.title}</p>
        <div className={styles.btnContainer}>
          <button className={styles.btn} onClick={() => onView(foodItem.id)}>
            View Recipe
          </button>
        </div>
      </div>
    </div>
  )
}

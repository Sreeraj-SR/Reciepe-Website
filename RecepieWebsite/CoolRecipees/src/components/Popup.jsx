import { useEffect, useRef } from "react"
import styles from "./popup.module.css"

export default function Popup({ show, onClose, children }) {
  const popupRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose()
      }
    }
    if (show) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className={styles.popupContainer}>
      <div ref={popupRef} className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  )
}

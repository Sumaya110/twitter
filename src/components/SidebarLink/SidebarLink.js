import React from 'react'
import styles from "@/components/SidebarLink/SidebarLink.module.css"

const SidebarLink = ({Icon, text}) => {
  return (
    <div className={styles.container}>
    <Icon /> <span className={styles.hidden}>{text}</span>
  </div>
  
  )
}

export default SidebarLink
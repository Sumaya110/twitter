import React from 'react'
import styles from "@/components/SidebarLink/SidebarLink.module.css"

const SidebarLink = ({Icon, text}) => {
  return (
    <div >
    <Icon /> <span >{text}</span>
  </div>
  
  )
}

export default SidebarLink
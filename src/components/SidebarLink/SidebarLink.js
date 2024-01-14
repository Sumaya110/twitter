import React from 'react'

const SidebarLink = ({Icon, text}) => {
  return (
    <div class="container">
    <Icon /> <span class="hidden">{text}</span>
  </div>
  
  )
}

export default SidebarLink
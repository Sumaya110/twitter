import React from "react";
import styles from "@/components/SidebarLink/SidebarLink.module.css";

const SidebarLink = ({ Icon, text, notification }) => {
  return (
    <div className={styles.container}>
      <Icon className={styles.icon} />
      {notification && notification.length > 0 && (
        <span className={`${styles.notificationCount} ${styles.red}`}>
          {notification.length}
        </span>
      )}
      <span className={styles.hidden}>{text}</span>
      
    
    </div>
  );
};

export default SidebarLink;

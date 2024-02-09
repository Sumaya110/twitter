import React from "react";
import { FiSearch } from "react-icons/fi";
import TrendingList from "../TrendingList/TrendingList";
import styles from "@/components/Trending/Trending.module.css";
import FollowUser from "@/components/FollowUser/FollowUser";

const Trending = ( {user} ) => {

  return (
    <div className={styles.combined}>

      <div className={styles.combined2}>
        <FiSearch />
        <input className={styles.combined3} type="text" placeholder="Search" />
       </div>


      <div className={styles.combined4}>
        <h1 className="text"> You might like</h1>
        <FollowUser  user={user} />

        <h1 className={styles.combined5}>Trends for you</h1>

        <TrendingList />
        <TrendingList />
        <TrendingList />
        <TrendingList />
      
      </div>
    </div>
  );
};

export default Trending;

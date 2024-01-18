import Image from "next/image";
import React from "react";
import styles from "@/components/TrendingList/TrendingList.module.css";

const TrendingList = () => {
  return (
    <div className={styles.combined}>
      <div>
        <p className={styles.combined2}>Entertainment · LIVE</p>
        <h1 className={styles.combined3}>
          Bigg Boss 16: Salman Khan returns with a brand new season
        </h1>
      </div>

      <div>
      {/* <Image
  className={styles.rounded}
  src="/trending-1.jfif"
  height={120} // Remove "px" from height and width
  width={120}
  alt="Description of the image"
/> */}

      </div>
    </div>
  );
};

export default TrendingList;

import { getUsers } from '@/libs/action/userAction';
import React, { useEffect, useState } from 'react'
import EachFollowUser from '../EachFollowUser/EachFollowUser';
import styles from "@/components/FollowUser/FollowUser.module.css"

const FollowUser = ( {user} ) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredUsers = users.filter((fuser) => fuser?._id!== user?._id);

  return (
    <div>
      <ul className={styles.userList}>
        {filteredUsers.map((fuser) => (
          <EachFollowUser key={fuser?._id} fuser={fuser} user={user}/>
        ))}
      </ul>
    </div>
  );
}

export default FollowUser
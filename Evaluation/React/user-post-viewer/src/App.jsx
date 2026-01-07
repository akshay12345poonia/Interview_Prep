import React, { useState, useEffect, useCallback } from "react";
import UserDropdown from "./components/UserDropdown";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelecttedUserName] = useState("");
  const {data: users} = useFetch();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal
        });
        const data = await response.json();
      }
      catch (error){
        if (error.name !== "AbortError") {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchUsers();
    return () => {
      controller.abort();
    };
  }, []);

  const handleUserSelect = useCallback((userId) => {
    setSelectedUserId(userId);
    if(users && userId){
      const user = users.find(u => u.id.toString() === userId);
      setSelecttedUserName(user ? user.name : "");
    } else {
      setSelecttedUserName("");
    }
  }, [users]);
}

export default App;
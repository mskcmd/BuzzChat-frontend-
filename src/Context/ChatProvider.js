import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the ChatContext
const ChatContext = createContext();

// Create the ChatProvider component
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  // Fetch user information from localStorage and set the user state
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userInfo) {
          setUser(userInfo);
        } else {
          navigate("/"); // Redirect to home if no user info found
        }
      } catch (err) {
        setError("Error fetching user information");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // Display error if any
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Provide the user state and setUser function to the entire app
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

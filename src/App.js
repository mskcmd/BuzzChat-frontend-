import React from "react";  
import "./App.css";  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import HomePage from "./Pages/HomePage";  
import ChatPage from "./Pages/ChatPage";  
import ChatProvider from "./Context/ChatProvider";  

function App() {  
  return (  
    <Router>  
      <ChatProvider>  
        <div className="App">  
          <Routes>  
            <Route path="/" element={<HomePage />} />  
            <Route path="/chat" element={<ChatPage />} />  
          </Routes>  
        </div>  
      </ChatProvider>  
    </Router>  
  );  
}  

export default App;

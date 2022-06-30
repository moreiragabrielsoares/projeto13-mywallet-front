import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext";

import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import WalletPage from "./components/WalletPage";
import NewIncomePage from "./components/NewIncomePage";
import NewExpensePage from "./components/NewExpensePage";



function App() {
  
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");
    
    return (
      <BrowserRouter>
        <UserContext.Provider value = {{token, setToken, userName, setUserName}}>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/newincome" element={<NewIncomePage />} />
              <Route path="/newexpense" element={<NewExpensePage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
  
  export default App;
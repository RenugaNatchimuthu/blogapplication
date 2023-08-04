
import './App.css';
import Login from "./Components/Login";
import Home from "./Components/Home";
import Createpost from "./Components/Createpost";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import { auth } from "./Components/firebase-config";
import { useState } from "react";
import {signOut} from "firebase/auth";
import CommentSection from "./Components/CommentSection";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>

        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createpost"> Create Post </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<Createpost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/CommentSection" element={<CommentSection/>} />
      </Routes>
    </Router>
  );
}

export default App;
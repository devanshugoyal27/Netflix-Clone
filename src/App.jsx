import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import MoviePageBody from "./MoviePageBody";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./components/redux/userSlice";
import MovieInfo from "./components/moviesInfo/MovieInfo";
import ErrorPage from "./components/errorPage/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        if (window.location.pathname.startsWith("/browse/")) {
          return;
        }

        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />} />

        <Route path="/browse" element={<MoviePageBody />} />
        <Route path="/browse/:id/*" element={<MovieInfo />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

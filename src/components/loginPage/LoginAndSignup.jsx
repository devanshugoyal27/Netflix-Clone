import React, { useState, useRef, useEffect } from "react";
import { validateData } from "../formValidation/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { lang } from "../multiLanguage/lang";
// import { useNavigate } from "react-router-dom";

const LoginAndSignup = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [errmessage, setErrMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const langkey = useSelector((store) => store.multilang.lang);

  const handleclick = () => {
    const message = validateData(email.current.value, password.current.value);
    setErrMessage(message);
    if (message) return;

    if (!isSignin) {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "" + errmessage);
          // ..
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "" + errorMessage);
        });
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
      <div className="lg:w-[28vw] md:w-[50vw] bg-black lg:h-[60vh] md:h-[50vh] bg-opacity-70 rounded-md px-14 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {isSignin ? lang[langkey].title : lang[langkey].title2}
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-5">
            {!isSignin && (
              <input
                type="text"
                ref={name}
                placeholder={lang[langkey].namePlaceholder}
                className="p-2 bg-transparent border-[1px] border-gray-500 rounded-sm"
              />
            )}

            <input
              type="text"
              ref={email}
              placeholder={lang[langkey].emailPlaceholder}
              className="p-2 bg-transparent border-[1px] border-gray-500 rounded-sm"
            />
            <input
              type="password"
              ref={password}
              placeholder={lang[langkey].passPlaceholder}
              className="p-2 bg-transparent border-[1px] border-gray-500 rounded-sm"
            />
            <p className="text-red-500">{errmessage}</p>
            <button
              type="submit"
              className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg "
              onClick={handleclick}
            >
              {isSignin ? lang[langkey].title : lang[langkey].title2}
            </button>
          </div>
        </form>
        <p
          className="mt-4 cursor-pointer"
          onClick={() => setIsSignin(!isSignin)}
        >
          {isSignin ? lang[langkey].loginText : lang[langkey].signupText}
        </p>
      </div>
    </div>
  );
};

export default LoginAndSignup;

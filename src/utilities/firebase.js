import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onIdTokenChanged } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ9w6vR9jhKbBfYViiqhnPbwOuv6HtYHQ",
    authDomain: "scheduler-1fe90.firebaseapp.com",
    databaseURL: "https://scheduler-1fe90-default-rtdb.firebaseio.com",
    projectId: "scheduler-1fe90",
    storageBucket: "scheduler-1fe90.appspot.com",
    messagingSenderId: "1076798608142",
    appId: "1:1076798608142:web:41d1d87b4ea1489cb5bd5f",
    measurementId: "G-90511T9P4N"
  };
  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development";
      if (devMode) {
        console.log(`loading ${path}`);
      }
      return onValue(
        dbRef,
        (snapshot) => {
          const val = snapshot.val();
          if (devMode) {
            console.log(val);
          }
          setData(transform ? transform(val) : val);
          setLoading(false);
          setError(null);
        },
        (error) => {
          setData(null);
          setLoading(false);
          setError(error);
        }
      );
    }, [path, transform]);
  
    return [data, loading, error];
  };
  
  export const setData = (path, value) => set(ref(database, path), value);
  
  export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };
  
  const firebaseSignOut = () => signOut(getAuth(firebase));
  
  export { firebaseSignOut as signOut };
  
  export const useUserState = () => {
    const [user, setUser] = useState();
  
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []);
  
    return [user];
  };
  
  const firebase = initializeApp(firebaseConfig);
  const database = getDatabase(firebase);
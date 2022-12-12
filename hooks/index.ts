import { auth } from "@utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";

export function useFirebaseAuth<T>() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return { user, setUser };
}

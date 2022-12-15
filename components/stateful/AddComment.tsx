import { useFirebaseAuth } from "@hooks/index";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { auth, db } from "@utils/firebase";
import { useState } from "react";
import { setTimeout } from "timers";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";

export default function AddComment() {
  const { user, setUser } = useFirebaseAuth();
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const handleAuth = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithRedirect(auth, provider).then(() => {
      getRedirectResult(auth)
        .then((result) => {
          const user = result!.user;
          setUser(user as User);
        })
        .catch((error) => {});
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const comment = document.getElementById(
      "add-comment"
    ) as HTMLTextAreaElement;
    const text = comment.value;
    const slugName = window.location.pathname.split("/")[2].split("#")[0];
    const date = new Date();
    const createdAt = date.getTime();
    const edited = false;
    const editedAt = createdAt;
    const userId = user!.uid;
    const username = user!.displayName;
    const userPhoto = user!.photoURL;

    const commentData = {
      text,
      slugName,
      edited,
      createdAt,
      editedAt,
      userId,
      username,
      userPhoto,
    };

    try {
      const docRef = await addDoc(
        collection(db, "comments"),
        commentData
      );
      await updateDoc(doc(db, "comments", docRef.id), {
        id: docRef.id,
      });
      setSuccessful(true);
      comment.value = "";
      const timeout = setTimeout(() => {
        setSuccessful(false);
        clearTimeout(timeout);
      }, 3000);
    } catch (e) {
      console.log(e);
      setError(true);
      const timeout = setTimeout(() => {
        setError(false);
        clearTimeout(timeout);
      }, 3000);
    }
  };

  return (
    <section className="w-full rounded mt-5 bg-gray-800 grid grid-cols-1 gap-3">
      <div className="prose prose-invert prose-headings:font-helvetica">
        <h4 className="m-0">Add Comment</h4>
      </div>
      <div className="flex flex-row gap-3 p-3 pt-0 items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user ? (
            <Image
              src={user.photoURL!}
              alt="profile picture"
              width={40}
              height={40}
            />
          ) : (
            <span className="text-[40px] cursor-default material-symbols-sharp">
              person
            </span>
          )}
        </div>
        <div
          className="flex flex-col justify-center"
          style={{
            flexGrow: user ? 1 : 0,
          }}
        >
          {user ? (
            <>
              <p className="text-gray-200">{user.displayName}</p>
              <p className="text-gray-400 text-xs">{user.email}</p>
            </>
          ) : (
            <button
              className="bg-transparent text-red-400 hover:text-gray-200 transition"
              onClick={handleAuth}
            >
              Sign in with Google
            </button>
          )}
        </div>
        {user && (
          <button
            className="text-red-400 hover:text-gray-200 justify-self-end transition"
            onClick={() => auth.signOut()}
          >
            Logout
          </button>
        )}
      </div>
      <form className="flex flex-col gap-3">
        <textarea
          className="w-full h-40 bg-gray-900 rounded p-3 text-gray-200 outline-none focus:ring focus:ring-red-400 transition"
          placeholder="Your comment here..."
          id="add-comment"
        ></textarea>
        <div className="flex flex-row justify-end items-center gap-3">
          <button
            type="reset"
            className="w-fit text-sm hover:bg-gray-900 transition hover:text-gray-200 px-5 self-end font-mono bg-gray-700 text-gray-200 font-bold py-2 rounded"
          >
            CLEAR
          </button>
          <button
            type="submit"
            className="w-fit text-sm hover:bg-gray-700 transition hover:text-gray-200 px-5 self-end font-mono bg-red-400 text-gray-900 font-bold py-2 rounded disabled:hover:bg-red-400 disabled:hover:text-gray-900 disabled:cursor-default disabled:opacity-50"
            onClick={handleSubmit}
            disabled={user ? false : true}
          >
            SUBMIT
          </button>
        </div>
      </form>

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {successful && (
            <m.div
              className="fixed top-5 right-5 bg-green-200 flex flex-row gap-5 px-5 py-2 rounded justify-center items-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-900">Comment successfully added!</p>
              <button
                className="text-green-500 w-10 h-10 flex flex-row justify-center items-center transition hover:bg-green-300 rounded-full"
                onClick={() => setSuccessful(false)}
              >
                <span className="material-symbols-sharp">close</span>
              </button>
            </m.div>
          )}
          {error && (
            <m.div
              className="fixed top-5 right-5 bg-red-300 flex flex-row gap-5 px-5 py-2 rounded justify-center items-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-900">Failed to add comment.</p>
              <button
                className="text-red-500 w-10 h-10 flex flex-row justify-center items-center transition hover:bg-red-400 rounded-full"
                onClick={() => setError(false)}
              >
                <span className="material-symbols-sharp">close</span>
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </section>
  );
}

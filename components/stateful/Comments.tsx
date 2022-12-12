import AddComment from "./AddComment";
import Comment from "./Comment";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "@utils/firebase";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";

export default function Comments() {
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [slugName, setSlugName] = useState("");

  const getComments = useCallback(async () => {
    onSnapshot(collection(db, "todolist-irvanma"), (querySnapshot) => {
      const comments: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      comments.sort((a, b) => b.createdAt - a.createdAt);
      setComments(comments.filter((comment) => comment.slugName === slugName));
    });
  }, [slugName]);

  useEffect(() => {
    setSlugName(window.location.pathname.split("/")[2].split("#")[0]);
    getComments();
  }, [getComments]);

  return (
    <section className="w-full rounded mt-5 bg-gray-800 p-5 grid grid-cols-1 gap-3">
      <div className="prose prose-invert prose-headings:font-helvetica flex flex-row justify-between min-w-full items-center">
        <h3 className="m-0">Comments</h3>
        <p className="text-gray-400 text-sm">
          {comments.length} comment{comments.length > 1 && "s"}
        </p>
      </div>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait" initial={false}>
          {comments.length === 0 && (
            <m.div
              className="prose prose-invert min-w-full flex justify-center items-center prose-headings:font-helvetica"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center w-fit px-3 py-2 flex flex-row justify-center items-center gap-3 bg-gray-900 rounded-full">
                <span className="material-symbols-sharp">info</span>
                <p className="m-0 pr-2 text-sm">No comments yet, sadly.</p>
              </div>
            </m.div>
          )}
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment key={comment.commentId} comment={comment} />
            ))}
        </AnimatePresence>
      </LazyMotion>
      <AddComment />
    </section>
  );
}

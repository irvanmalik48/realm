import { useFirebaseAuth } from "@hooks/index";
import Image from "next/image";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@utils/firebase";
import { m } from "framer-motion";

export default function Comment(props: any) {
  const { user } = useFirebaseAuth();
  const [buttonDeleteSelected, setButtonDeleteSelected] = useState(false);
  const [buttonEditSelected, setButtonEditSelected] = useState(false);
  const [showDeleteSuccessful, setShowDeleteSuccessful] = useState(false);
  const [showEditSuccessful, setShowEditSuccessful] = useState(false);
  const [showDeleteFailed, setShowDeleteFailed] = useState(false);
  const [showEditFailed, setShowEditFailed] = useState(false);

  const handleDeleteButton = async () => {
    setButtonDeleteSelected(true);
    setButtonEditSelected(false);
  };

  const handleEditButton = async () => {
    setButtonEditSelected(true);
    setButtonDeleteSelected(false);
  };

  const handleCancelButton = async () => {
    setButtonEditSelected(false);
    setButtonDeleteSelected(false);
  };

  const handleDeleteComment = async () => {
    setButtonDeleteSelected(false);
    await deleteDoc(doc(db, "todolist-irvanma", props.comment.id))
      .then(() => {
        deleteCommentSuccessful();
      })
      .catch(() => {
        deleteCommentFailed();
      });
  };

  const handleEditComment = async () => {
    setButtonEditSelected(false);
    await updateDoc(doc(db, "todolist-irvanma", props.comment.id), {
      text: (document.getElementById("edit-comment") as HTMLTextAreaElement)
        .value,
      editedAt: new Date().toISOString(),
      edited: true,
    })
      .then(() => {
        editCommentSuccessful();
      })
      .catch(() => {
        editCommentFailed();
      });
  };

  const editCommentSuccessful = () => {
    setShowEditSuccessful(true);
    const timeout = setTimeout(() => {
      setShowEditSuccessful(false);
      clearTimeout(timeout);
    }, 3000);
  };

  const deleteCommentSuccessful = () => {
    setShowDeleteSuccessful(true);
    const timeout = setTimeout(() => {
      setShowDeleteSuccessful(false);
      clearTimeout(timeout);
    }, 3000);
  };

  const editCommentFailed = () => {
    setShowEditFailed(true);
    const timeout = setTimeout(() => {
      setShowEditFailed(false);
      clearTimeout(timeout);
    }, 3000);
  };

  const deleteCommentFailed = () => {
    setShowDeleteFailed(true);
    const timeout = setTimeout(() => {
      setShowDeleteFailed(false);
      clearTimeout(timeout);
    }, 3000);
  };

  return (
    <>
      <m.article
        className="w-full p-5 bg-gray-900 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-3">
          <Image
            src={props.comment.userPhoto}
            alt={props.comment.username}
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <p className="text-gray-200 font-bold">{props.comment.username}</p>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-gray-400 text-sm">
                {new Date(props.comment.createdAt).toLocaleDateString() +
                  " " +
                  new Date(props.comment.createdAt).toLocaleTimeString()}
              </p>
              {props.comment.edited && (
                <p className="text-gray-400 text-sm">
                  (edited at{" "}
                  {new Date(props.comment.editedAt).toLocaleDateString() +
                    " " +
                    new Date(props.comment.editedAt).toLocaleTimeString()}
                  )
                </p>
              )}
            </div>
          </div>
        </div>
        <p className="text-gray-200 mt-3">{props.comment.text}</p>
        <div className="w-full flex flex-row justify-end gap-5 px-0 mt-3">
          {user?.uid === props.comment.userId ? (
            <>
              <button
                className="text-gray-400 font-bold flex flex-row items-center justify-center gap-2 font-mono uppercase text-xs"
                onClick={handleEditButton}
              >
                <span className="material-symbols-sharp text-lg">edit</span>
                <p className="">Edit</p>
              </button>
              <button
                className="text-gray-400 font-bold flex flex-row items-center justify-center gap-2 font-mono uppercase text-xs"
                onClick={handleDeleteButton}
              >
                <span className="material-symbols-sharp text-lg">delete</span>
                <p className="">Delete</p>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        {buttonDeleteSelected && (
          <section className="w-full rounded mt-5 bg-gray-800 grid grid-cols-1 gap-3 p-5 ring ring-opacity-30 ring-gray-900">
            <div className="prose prose-invert prose-headings:font-helvetica">
              <h4>Delete Comment</h4>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-300">
                Are you sure you want to delete this comment?
              </p>
              <div className="flex flex-row justify-end gap-5 px-0">
                <button
                  type="submit"
                  className="w-fit text-sm hover:bg-gray-700 transition hover:text-gray-200 px-5 self-end font-mono text-gray-400 font-bold py-2 rounded"
                  onClick={handleCancelButton}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-fit text-sm hover:bg-gray-700 transition hover:text-gray-200 px-5 self-end font-mono bg-red-400 text-gray-900 font-bold py-2 rounded"
                  onClick={handleDeleteComment}
                >
                  DELETE
                </button>
              </div>
            </div>
          </section>
        )}
        {buttonEditSelected && (
          <section className="w-full rounded mt-5 bg-gray-800 grid grid-cols-1 gap-3 p-5 ring ring-opacity-30 ring-gray-900">
            <div className="prose prose-invert prose-headings:font-helvetica">
              <h4>Edit Comment</h4>
            </div>
            <form className="flex flex-col gap-3">
              <textarea
                className="w-full h-40 bg-gray-900 rounded p-3 text-gray-200 outline-none focus:ring focus:ring-red-400 transition"
                contentEditable="true"
                id="edit-comment"
              >
                {props.comment.text}
              </textarea>
              <div className="flex flex-row justify-end gap-5 px-0">
                <button
                  type="submit"
                  className="w-fit text-sm hover:bg-gray-700 transition hover:text-gray-200 px-5 self-end font-mono text-gray-400 font-bold py-2 rounded"
                  onClick={handleCancelButton}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-fit text-sm hover:bg-gray-700 transition hover:text-gray-200 px-5 self-end font-mono bg-red-400 text-gray-900 font-bold py-2 rounded"
                  onClick={handleEditComment}
                >
                  SAVE
                </button>
              </div>
            </form>
          </section>
        )}
      </m.article>
      {showEditSuccessful && (
        <m.div
          className="fixed top-5 right-5 bg-green-200 flex flex-row gap-5 px-5 py-2 rounded justify-center items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-900">Comment successfully edited!</p>
          <button
            className="text-green-500 w-10 h-10 flex flex-row justify-center items-center transition hover:bg-green-300 rounded-full"
            onClick={() => setShowEditSuccessful(false)}
          >
            <span className="material-symbols-sharp">close</span>
          </button>
        </m.div>
      )}
      {showDeleteSuccessful && (
        <m.div
          className="fixed top-5 right-5 bg-green-200 flex flex-row gap-5 px-5 py-2 rounded justify-center items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-900">Comment successfully deleted!</p>
          <button
            className="text-green-500 w-10 h-10 flex flex-row justify-center items-center transition hover:bg-green-300 rounded-full"
            onClick={() => setShowDeleteSuccessful(false)}
          >
            <span className="material-symbols-sharp">close</span>
          </button>
        </m.div>
      )}
      {showEditFailed && (
        <m.div
          className="fixed top-5 right-5 bg-red-200 flex flex-row gap-5 px-5 py-2 rounded justify-center items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-900">Comment failed to edit!</p>
          <button
            className="text-red-500 w-10 h-10 flex flex-row justify-center items-center transition hover:bg-red-300 rounded-full"
            onClick={() => setShowEditFailed(false)}
          >
            <span className="material-symbols-sharp">close</span>
          </button>
        </m.div>
      )}
      {showDeleteFailed && (
        <m.div
          className="fixed top-5 right-5 bg-red-200 flex flex-row gap-5 px-5 py-2 rounded justify-center items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-900">Comment failed to delete!</p>
          <button
            className="text-red-500 w-10 h-10 flex flex-row justify-center items-center transition hover:bg-red-300 rounded-full"
            onClick={() => setShowDeleteFailed(false)}
          >
            <span className="material-symbols-sharp">close</span>
          </button>
        </m.div>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../firebase/firebaseAuth";
import { useAuthContext } from "../Hooks/AuthContext";
import { v4 as uuidV4 } from "uuid";
import { read, update } from "../firebase/firestore";

const Home = () => {
  const [doc, setDoc] = useState();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const sub = async () => {
      try {
        const d = await read(currentUser.uid);
        console.log("222222222222222log:");
        setDoc(d);
      } catch (error) {
        console.error("error:", error);
      }
    };

    console.log("1111111111log:");

    return () => sub();
  }, []);

  async function handleDelete(id) {
    const afterDeleted = doc.doc.filter((obj) => obj.id !== id);
    try {
      await update(currentUser.uid, { doc: afterDeleted });
      setDoc({ doc: afterDeleted });
    } catch (error) {
      console.error("error:", error);
    }
  }

  return (
    <main>
      <div
        className="w-[100vw] bg-[#2f2f2f] flex flex-row justify-between items-center p-[2em]"
        style={{ padding: ".5em 2em" }}
      >
        <h2 className="text-white font-bold text-3xl">{`Hello ${currentUser.email}!`}</h2>
        <button
          className="w-[10%]"
          onClick={async () => {
            try {
              await logOut();
            } catch (error) {
              console.log("error:", error);
              alert(error);
            }
          }}
        >
          Log out
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to={"/documentView/" + uuidV4()}>
          Create a document with random id
        </Link>
        <h3>Existing documents</h3>
        {doc?.doc?.length > 0 ? (
          doc?.doc.map(({ id, quillData }) => (
            <div
              key={id}
              className="w-[30%] bg-gray-500 text-white cursor-pointer flex-row flex justify-between items-center"
              style={{
                padding: ".5em",
                borderRadius: "10px",
              }}
            >
              {/* OPS TO GETTING PLAIN TEXT AND DISPLAY INDEX 0 (FIRST WORD)*/}
              <Link
                to={"/documentView/" + id}
                className="overflow-x-hidden overflow-ellipsis text-white items-center"
                style={{ color: "white", alignItems: "center" }}
              >
                {
                  quillData
                    .map((op) => op.insert)
                    .join("")
                    .split(" ")[0]
                }
              </Link>
              <span
                className="bg-red-500 rounded-full h-full"
                style={{ padding: ".5em" }}
                onClick={() => handleDelete(id)}
              >
                🗑
              </span>
            </div>
          ))
        ) : (
          <h1>Yo! you don't have any document yo!!!</h1>
        )}
      </div>
    </main>
  );
};

export default Home;

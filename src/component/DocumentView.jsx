import { useState, useEffect, useCallback } from "react";
import Quill from "quill";
import undo from "../assets/undo.svg";
import redo from "../assets/redo.svg";
import printDoc from "../assets/print.svg";
import { create, read, update } from "../firebase/firestore";
import { useAuthContext } from "../Hooks/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";
import "./css/documentView.css";
import "./css/documentViewQuill.css";

const DocumentView = () => {
  const [quill, setQuill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doc, setDoc] = useState();
  const [type, setType] = useState(""); //NOTE: save,close
  const [isUpdateType, setIsUpdateType] = useState(false); //NOTE: is edit or update
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const params = useParams();

  const ToolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ];
  const modalConfig = {
    saveBtn: {
      title: "Are sure want to save this document?",
      yesBtn: isUpdateType ? "Update" : "Save",
    },
    closeBtn: {
      title: "Are you sure you want to save this document before it close?",
      yesBtn: "Close",
    },
  };

  //NOTE: We are using useCallback instead of useEffect that's because sometimes useEffect render before useRef properly set.
  const wrapperRef = useCallback((refEle) => {
    if (refEle === null) return;

    refEle.innerHTML = "";
    const editor = document.createElement("div");
    refEle.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: ToolbarOptions },
    });

    setQuill(q);
  }, []);

  useEffect(() => {
    if (!quill) return;
    const handler = (deltaVarum, oldDelta, source) => {
      if (source !== "user" && source !== "api") {
        alert("You are not user!");
        navigate("/");
        return;
      }
      // Save to db//////////////////////////////////////////////////////////////////
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  useEffect(() => {
    const sub = async () => {
      try {
        const d = await read(currentUser.uid);
        d.doc.find((element) => {
          if (element.id === params.id) {
            // if match with params?then
            if (quill) {
              quill.setContents(element.quillData);
            }
            // console.log("element.quillData:", element.quillData);
            setIsUpdateType(true);
            return;
          }
        });
        setDoc(d);
      } catch (error) {
        console.error("error:", error);
      }
    };

    sub();
  }, [quill, isUpdateType]);

  const Modal = () => {
    const { title, yesBtn } =
      type === "save" ? modalConfig.saveBtn : modalConfig.closeBtn;

    async function handleYesBtn() {
      if (type === "save") {
        // NOTE: save to db
        if (isUpdateType) {
          //Update the document
          const d = [];
          doc.doc.forEach((e) => {
            if (e.id === params.id) {
              d.push({ id: e.id, quillData: quill.getContents().ops });
            } else {
              d.push(e);
            }
          });
          await update(currentUser.uid, { doc: d });
          setDoc(d);
          setIsModalOpen(false);
        } else {
          // save the document
          // console.log("quill.getText():", quill.getText());
          const dataObj = { id: params.id, quillData: quill.getContents().ops };
          await create(currentUser.uid, dataObj);
          setIsModalOpen(false);
          setIsUpdateType(true);
        }
      } else {
        // NOTE: save and close saving if change else just exit
        navigate("/");
        return;
      }
    }

    return (
      <section
        className="w-[98.79vw] h-screen  z-10 fixed top-0 left-0"
        style={{ backgroundColor: "rgba(0,0,0,.5)" }}
      >
        <div className="dialog bg-[#f2f2f2] absolute top-[50%] left-[50%] translate-[-50%] rounded-2xl">
          <div className="flex flex-col" style={{ padding: "1em" }}>
            <p className="text-2xl" style={{ marginBottom: "2em" }}>
              {title}
            </p>
            <div className="flex flex-row justify-end">
              <div className="group w-fit">
                <div className="yesBtn saveBtn" onClick={handleYesBtn}>
                  {yesBtn}
                </div>
                <div
                  className="closeBtn"
                  onClick={() => {
                    setIsModalOpen(false);
                    return;
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <main>
      <div className="customizeTool">
        {isModalOpen && <Modal />}
        <div className="group text-3xl text-blue-500 font-bold">cwDocClone</div>
        <div className="group">
          <div className="group">
            <div className="icon" onClick={() => quill.history.undo()}>
              <img src={undo} alt="undoBtn" />
            </div>
            <div className="icon" onClick={() => quill.history.redo()}>
              <img src={redo} alt="redoBtn" />
            </div>
          </div>
          <div className="group">
            <div className="icon" onClick={() => window.print()}>
              <img src={printDoc} alt="printDocument" />
            </div>
          </div>
          <div
            className="saveBtn"
            onClick={() => {
              setIsModalOpen(true);
              setType("save");
            }}
          >
            {isUpdateType ? "Update" : "Save"}
          </div>
          <div
            className="closeBtn"
            onClick={() => {
              setIsModalOpen(true);
              setType("close");
            }}
          >
            X
          </div>
        </div>
      </div>
      <div className="editContainer" ref={wrapperRef}></div>
    </main>
  );
};

export default DocumentView;

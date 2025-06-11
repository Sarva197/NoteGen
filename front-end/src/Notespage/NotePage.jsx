import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";

// Optional: Register font whitelist (for font picker)
const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "times-new-roman",
];
ReactQuill.Quill.register(Font, true);

// Quill toolbar config
const modules = {
  toolbar: [
    [{ font: Font.whitelist }, { size: ["small", false, "large", "huge"] }],
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
  ],
};

function NotePage() {
  const { user } = useAuth();
  const [note, setNote] = useState({});
  const [value, setValue] = useState("");
  const { userId, noteId } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/notes/${userId}/${noteId}`,
          { withCredentials: true }
        );
        setNote(res.data.note); // Set full note object
        setValue(res.data.note.content); // Set editor content
      } catch (err) {
        console.error("Error fetching note:", err);
      }
    };

    if (user?._id) fetchNote();
  }, [userId, noteId, user]);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/user/notes/${user._id}/update/${noteId}`,
        {
          content: value,
          title: note.title,
        },
        { withCredentials: true }
      );
      toast.success("Note saved successfully!");
      console.log("Updated note:", res.data);
      setValue(res.data.updatedNote.content);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    }
  };

  const handleDownload = () => {
    const element = document.createElement("div");
    element.innerHTML = value; // Quill HTML

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right (in inches)
      filename: `${note.title || "note"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // for improving quality
        useCORS: true, // for external images
      },
      jsPDF: {
        unit: "in", // inches
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(opt).from(element).save();
    toast.success("Notes downloading successfully!");
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col p-1">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mb-0">{note.title || "Loading..."}</h2>
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
              onClick={handleDownload}
            >
              <span>Download</span>
              <i className="fa-solid fa-download"></i>
            </button>
          </div>

          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            style={{ height: "75vh", marginBottom: "1rem" }}
          />

          <button className="btn btn-success mt-5" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotePage;

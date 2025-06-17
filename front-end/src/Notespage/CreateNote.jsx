import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import parse from "html-react-parser";
import { toast } from "react-toastify";

function CreateNote() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const { user } = useAuth();
  const { noteId } = useParams();

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/${user._id}/notes/${noteId}/chat`,
        { query },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const llmAnswer = res.data.answer;
        setMessages((prev) => [...prev, { role: "bot", content: llmAnswer }]);
      } else {
        toast.error("Failed to fetch answer");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToNotes = async (content) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/${user._id}/notes/${noteId}/add`,
        { content },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Note added successfully!");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to add note.";
      toast.error(errMsg);
    }
  };

  return (
    <div
      className="container d-flex flex-column py-4"
      style={{ height: "90vh", maxHeight: "90vh" }}
    >
      <h3 className="text-primary mb-3">
        <i className="bi bi-chat-dots me-2"></i>Note Chat Assistant
      </h3>

      {/* Chat Box */}
      <div
        className="border rounded shadow-sm p-3 mb-3 overflow-auto"
        style={{
          flexGrow: 1,
          background: "#f4f6f8",
          scrollBehavior: "smooth",
          borderRadius: "1rem",
        }}
        ref={chatRef}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex mb-3 ${
              msg.role === "user"
                ? "justify-content-start"
                : "justify-content-end"
            }`}
          >
            <div
              className={`p-3 rounded-4 shadow-sm ${
                msg.role === "user"
                  ? "bg-light text-dark"
                  : "bg-success text-white"
              }`}
              style={{
                maxWidth: "75%",
                borderRadius: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              <div className="fw-semibold mb-1">
                {msg.role === "user" ? (
                  <i className="bi bi-person-circle me-1"></i>
                ) : (
                  <i className="bi bi-robot me-1"></i>
                )}
                {msg.role === "user" ? "You" : "NoteGen AI"}
              </div>

              <div className="message-content">
                {msg.role === "bot" ? parse(msg.content) : msg.content}
              </div>

              {msg.role === "bot" && (
                <button
                  className="btn btn-outline-light btn-sm mt-2"
                  title="Add this response to your notes"
                  onClick={() => handleAddToNotes(msg.content)}
                >
                  <i className="bi bi-journal-plus me-1"></i>Add to Notes
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="d-flex justify-content-center mt-4">
            <div className="text-center">
              <BeatLoader color="#0d6efd" loading={true} size={12} />
              <div className="mt-2 text-muted">Thinking...</div>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="input-group mt-auto">
        <input
          type="text"
          className="form-control rounded-start-pill"
          placeholder="Ask something about this note..."
          value={query}
          onChange={handleQueryChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="btn btn-primary rounded-end-pill px-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          <i className="bi bi-send-fill me-2"></i>Send
        </button>
      </div>
    </div>
  );
}

export default CreateNote;

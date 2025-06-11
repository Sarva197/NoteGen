import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { BeatLoader } from "react-spinners";
import parse from "html-react-parser";
import { toast } from "react-toastify";

function CreateNote() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
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

    const userId = user._id;

    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/${userId}/notes/${noteId}/chat`,
        { query },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const llmAnswer = res.data.answer;
        setMessages((prev) => [...prev, { role: "bot", content: llmAnswer }]);
        setAnswer(llmAnswer);
      } else {
        console.error("Failed to fetch answer");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "Something went wrong while fetching answer.";
      toast.error(errMsg);
      console.error("Error fetching answer:", errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToNotes = async (content) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/${user._id}/notes/${noteId}/add`,
        {
          content,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Notes added sucessfully");
      }
    } catch (err) {
      const errMsg =
        error.response?.data?.message ||
        "Something went wrong while fetching answer.";
      toast.error(errMsg);
      console.error("Error fetching answer:", errMsg);
    }
  };

  return (
    <div
      className="container mt-2 d-flex flex-column mb-4"
      style={{ height: "85vh" }}
    >
      <h2 className="mb-3">Note Chat Assistant</h2>

      {/* Chat Area */}
      <div
        className="flex-grow-1 overflow-auto p-3 border rounded"
        style={{ background: "#f8f9fa" }}
        ref={chatRef}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 mb-2 rounded-3 ${
              msg.role === "user"
                ? "bg-info-subtle align-self-start"
                : "bg-success-subtle align-self-end"
            }`}
            style={{ maxWidth: "100%", wordWrap: "break-word" }}
          >
            {msg.role === "bot" ? (
              <>
                <strong>LLM:</strong>
                <div>{parse(msg.content)}</div>
                <button
                  className="btn btn-success btn-sm mt-2 px-3 py-1"
                  onClick={() => handleAddToNotes(msg.content)}
                >
                  <i className="bi bi-journal-plus me-2"></i>
                  Add to Notes
                </button>
              </>
            ) : (
              <strong>{msg.content}</strong>
            )}
          </div>
        ))}

        {/* loading screen */}
        {loading && (
          <div className="d-flex justify-content-center my-3">
            <BeatLoader color="#007bff" loading={loading} size={15} />
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="mt-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Ask a question..."
          value={query}
          onChange={handleQueryChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default CreateNote;

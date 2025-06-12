import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { slugify } from "../utils/slugify";
import { useAuth } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function WelcomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/notes/${user._id}`,
          {
            withCredentials: true,
          }
        );
        setSubjects(res.data.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateSubject = async () => {
    // 1. Generate inputOptions from subjects
    const inputOptions = {};
    subjects.forEach((subject) => {
      inputOptions[subject._id] = subject.title;
    });
    inputOptions["new"] = "➕ Create New Subject";

    // 2. Show select dropdown
    const { value: noteId } = await Swal.fire({
      title: "Choose Subject",
      input: "select",
      inputOptions,
      inputPlaceholder: "Select or create a subject",
      showCancelButton: true,
    });

    if (!noteId) return;

    if (noteId === "new") {
      // 3. Ask for new subject name
      const { value: newSubjectName } = await Swal.fire({
        title: "Enter New Subject Name",
        input: "text",
        inputPlaceholder: "e.g. Operating Systems",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "Subject name cannot be empty";
        },
      });

      if (!newSubjectName) return;

      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/user/notes/${user._id}/create`,
          { title: newSubjectName, user: user._id },
          { withCredentials: true }
        );

        if (res.status !== 201) throw new Error("Failed to create subject");

        const noteId = res.data.newNote._id;
        setSubjects([...subjects, res.data.newNote]);
        navigate(`/user/${user._id}/notes/${noteId}/create`);
        toast.success("New subject created!");
      } catch (err) {
        console.error("Failed to create subject:", err);
        Swal.fire("Error", "Could not create subject", "error");
      }
    } else {
      // 4. Navigate to existing subject
      navigate(`/user/${user._id}/notes/${noteId}/create`);
    }
  };

const handleDeleteSub = async (id) => {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const req = await axios.delete(
        `http://localhost:3000/api/v1/user/notes/${user._id}/delete/${id}`,
        { withCredentials: true }
      );

      if (req.status === 200) {
        setSubjects(subjects.filter((subject) => subject._id !== id));
        toast.success("Subject deleted successfully!");
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your subject has been deleted.",
          icon: "success",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your subject is safe :)",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Failed to delete subject:", error.response?.data || error.message);
    toast.error("Failed to delete subject.");
  }
};


  const goToSubject = (id) => {
    navigate(`user/${user._id}/notes/${id}`);
  };

  return (
    <div className="p-6 container">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome,{" "}
        <span className="text-blue-600">{user ? user.username : "User"}</span>
      </h1>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h5 mb-0 fw-semibold">Your Subjects</h2>
        <button
          onClick={handleCreateSubject}
          className="btn btn-outline-success d-flex align-items-center gap-1"
        >
          <span>➕</span>Create Notes
        </button>
      </div>

      <div className="row">
        {subjects.map((subject) => (
          <div className="col-sm-6 col-lg-4 mb-4" key={subject._id}>
            <div className="card shadow-sm h-100 rounded-4 border-0">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-semibold text-primary">
                    {subject.title}
                  </h5>
                  <p className="card-text text-muted small">
                    {subject.description || "No description available."}
                  </p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-outline-primary w-50 me-2"
                    onClick={() => goToSubject(subject._id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleDeleteSub(subject._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomePage;

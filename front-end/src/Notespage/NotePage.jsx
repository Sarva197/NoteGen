import React, { useState , useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import parse from 'html-react-parser';


// const Font = ReactQuill.Quill.import("formats/font");
// Font.whitelist = [
//   "arial",
//   "comic-sans",
//   "courier-new",
//   "georgia",
//   "helvetica",
//   "times-new-roman",
// ];
// ReactQuill.Quill.register(Font, true);

// // Custom toolbar
// const modules = {
//   toolbar: [
//     [{ font: Font.whitelist }],
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     [{ "code-block": true }],
//     [{ align: [] }],
//     ["clean"],
//   ],
// };

function NotePage() {
  const [value, setValue] = useState("");
  // const [subjects] = useState([
  //   "Math",
  //   "Science",
  //   "History",
  //   "Computer Science",
  //   "English",
  // ]);
  // const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const formatString = (text)=>{
    const paragraphs = text.match(/(<[^>]+>|[^<]+)/g);
    return paragraphs;
  }

  useEffect(()=>{
    axios.get("http://localhost:3000/")
      .then(response => {
        console.log(response.data);

        const text = response.data;
        // setValue(response);
        setValue(text)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  },[])

  return (
    // <div className="container-fluid">
    //   <div className="row vh-100">
    //     {/* Left Side - Subject List */}
    //     <div className="col-3 bg-light border-end p-3">
    //       <h4 className="mb-3">Subjects</h4>
    //       <ul className="list-group">
    //         {subjects.map((subject, index) => (
    //           <li
    //             key={index}
    //             className={`list-group-item ${
    //               selectedSubject === subject ? "active" : ""
    //             }`}
    //             onClick={() => setSelectedSubject(subject)}
    //             style={{ cursor: "pointer" }}
    //           >
    //             {subject}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     {/* Right Side - Editor */}
    //     <div className="col-9 p-4">
    //       <h2 className="mb-3">{selectedSubject}</h2>
    //       <ReactQuill
    //         theme="snow"
    //         value={value}
    //         onChange={setValue}
    //         modules={modules}
    //         style={{height:"80vh"}}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="container p-5">
      <div className="row">
        <div className="col">
          {parse(value)}
        </div>
      </div>
    </div>
  );
}

export default NotePage;

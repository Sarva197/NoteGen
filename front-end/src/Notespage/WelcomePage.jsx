import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { slugify } from '../utils/slugify';
import { useContext } from "react";
import { useAuth } from '../contexts/AuthContext.jsx';



 

function WelcomePage() {
  const { user } = useAuth(); // ✅ Correct

  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  const handleCreateSubject = () => {
    const newSubjectName = prompt('Enter new subject name:');
    const newDes = prompt('Enter desc:');
    if (newSubjectName) {
      const newId = slugify(newSubjectName);
      console.log(newId);
      setSubjects([...subjects, { id: newId, name: newSubjectName , desc:newDes}]);
    }
  };

  const handleDeleteSub = (id)=>{
    const updatedSub = subjects.filter((sub)=> sub.id !== id);
    setSubjects(updatedSub);
  }

  const goToSubject = (id) => {
    navigate(`/subject/${id}`);
  };

  return (
     <div className="p-6 container">
      <h1 className="text-3xl font-bold mb-4 mt-3 offset-5">Welcome to {user ? user.username : "user"}</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Subjects</h2>
        <button
          onClick={handleCreateSubject}
          className="btn btn-primar"
        >
          ➕ Create New Subject
        </button>
      </div>

<div className="row">
  {subjects.map((subject) => (
    <div className="col-sm-6 mb-3 mb-sm-0 col-lg-4 mt-4" key={subject.id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{subject.name}</h5>
          <p className="card-text">{subject.desc}</p>
          <button className="btn btn-primary" onClick={() => goToSubject(subject.id)}>
            Go to {subject.name}
          </button>
          <button className="btn btn-primary ms-5" onClick={()=> handleDeleteSub(subject.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default WelcomePage
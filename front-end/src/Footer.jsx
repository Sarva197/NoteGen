import React from "react";

function Footer() {
  return (
    <footer className="text-white mt-5 p-5 fs-6" style={{ background: "linear-gradient(45deg, #4facfe, #00f2fe)",position:'relative', top:'', width:'100%' }}>
      <div className="container text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} NoteGen. All Rights Reserved.</p>
        
        <div className="d-flex justify-content-center gap-3">
          <a href="/about" className="text-white text-decoration-none">About</a>
          <a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a>
          <a href="/contact" className="text-white text-decoration-none">Contact</a>
        </div>

        <div className="mt-3">
          <a href="https://github.com/Sarva197/NoteGen" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-facebook" style={{width:'2rem'}}></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

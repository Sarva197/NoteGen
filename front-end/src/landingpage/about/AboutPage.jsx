import React from "react";

function AboutPage() {
  return (
    <div className="container">
      <div className="row p-5">
        <div className="fs-2 text-center w-100">
          <h2>About Me</h2>
        </div>
      </div>
      <div
        className="row p-2 mb-5 fs-6 text-muted d-flex align-items-center justify-content-center"
        style={{ lineHeight: "1.8" }}
      >
        {/* Use col-12 for small screens and col-md-5 for medium+ */}
        <div className="col-12 col-md-5 d-flex align-items-center justify-content-center flex-column mb-4 mb-md-0">
          <img
            src="images/image.png"
            alt="founder-img"
            style={{ width: "60%", height: "auto", borderRadius: "50%" }}
          />
          <h3 className="mt-3">Sarvagna Lv</h3>
          <p>Developer</p>
        </div>

        <div className="col-12 col-md-5">
          <p>
            Hi, I’m Sarvagna Lv, the creator of NoteGen! As a passionate web
            developer and student, I built NoteGen to solve a problem I faced
            every day — managing notes and organizing ideas efficiently. I
            wanted a tool that could harness the power of AI to make note-taking
            smarter and faster, all while keeping things simple and intuitive.
          </p>
          <p>
            NoteGen is more than just a project for me; it’s a reflection of my
            journey in tech, from learning the MERN stack to building real-world
            applications. I believe technology should empower learning, and
            NoteGen is my step toward making that a reality. I hope it helps you
            stay organized, inspired, and always ready to learn.
          </p>
          <p>
            Connect on{" "}
            <a href="" style={{ color: "#387ed1", textDecoration: "none" }}>
              LinkedIn
            </a>{" "}
            /{" "}
            <a href="" style={{ color: "#387ed1", textDecoration: "none" }}>
              GitHub
            </a>{" "}
            /{" "}
            <a href="" style={{ color: "#387ed1", textDecoration: "none" }}>
              Email: sarvagnalv19@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

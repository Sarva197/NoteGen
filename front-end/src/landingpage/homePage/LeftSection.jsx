import React from "react";

function LeftSection({
  imgUrl,
  title,
  Desc,
  tryDemo,
  tryName,
}) {
  return (
    <div className="container mt-5 mb-3 p-5">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-6 p-1 ms-auto">
          <img src={imgUrl} alt="product-img" style={{ width: '70%' , borderRadius:'2rem' , marginLeft:'1rem' }} />
        </div>
        <div
          className="col-5 p-1 d-flex align-items-start justify-content-center flex-column fs-5"
          style={{ lineHeight: "1.7" }}
        >
          <h1 className="fw-semibold">{title}</h1>
          <p>{Desc}</p>
          <div>
            {tryName.length > 0 && (
              <a
                href={tryDemo}
                style={{ color: "#387ed1", textDecoration: "none" }}
                className="fw-medium"
              >
                {tryName} <i className="fa-solid fa-arrow-right"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;

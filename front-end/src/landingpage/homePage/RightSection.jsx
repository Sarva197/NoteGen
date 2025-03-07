import React from 'react'

function RightSection({
    imgUrl,
    productName,
    prodDesc,
    tryDemo,
    tryName,
  }) {
  return (
    <div className="container mt-5 mb-3 p-5">
        <div className="row d-flex align-items-center justify-content-around ms-4">
        <div
          className="col-4 p-3 d-flex align-items-start justify-content-center flex-column ms-1"
          style={{ lineHeight: "1.7" }}
        >
          <h1 className="fw-semibold">{productName}</h1>
          <p>{prodDesc}</p>
          <div>
            {tryName.length > 0 && (
              <a
                href={tryDemo}
                style={{ color: "#387ed1", textDecoration: "none" }}
                className="fw-medium"
              >
                {" "}
                {tryName} <i class="fa-solid fa-arrow-right"></i>
              </a>
            )}
          </div>
        </div>
        <div className="col-6 p-3">
          <img src={imgUrl} alt="product-img" style={{ width: '70%' , borderRadius:'2rem' }} />
        </div>
        </div>
    </div>
  )
}

export default RightSection
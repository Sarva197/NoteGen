import React from 'react'

function Plans({planType , payMonth , payYear  , btnText , features , midDes}) {
  return (
        <div className="col border p-3">
          <div className="mt-5">
            <h3>{planType}</h3>
            <p>
              ₹{payMonth} <span>/ Month</span>
            </p>
            <p>Pay ₹{payYear} Year</p>
          </div>
          <div className="border-top mt-5">
            <p className="mb-5 mt-2">{midDes}</p>
            <button
              className="btn btn-primary p-3 fs-6 mb-5"
              style={{ width: "13rem" }}
            >
              {btnText}
            </button>
          </div>
          <div className="mt-4">
            <h4>What's included:</h4>
            {features.map((feature)=>(
              <p><i class="fa-solid fa-check" style={{color:'greenyellow'}}></i>{feature}</p>
            ))}
          </div>
        </div>
  )
}

export default Plans
 import React from 'react'
import { Link } from 'react-router-dom'
 
 function Hero() {
   return (
     <div className="container-fluid mt-3 p-5">
        <div className="row text-center offset-3 p-5">
            <div className="col-8" style={{lineHeight:'1.8'}}>
                <h1 style={{fontSize:'4rem'}} className='mb-4'>What will you <br />
                <span style={{color:'#34ab5d'}}>note</span> today?</h1>
                <p className='fs-5 ms-3'>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</p>
                <a href="" type='button' className='mt-3 mb-4'><button className='btn btn-primary p-3 fs-6' style={{width:'13rem'}}>Get NoteGen for free</button></a><br />
                <Link to="/login" className='mb-3 fs-5' style={{color:'black'}}>Already have an account? Log in</Link>
            </div>
        </div>
     </div>
   )
 }
 
 export default Hero
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return <section>
    <section className="hero is-fullheight" id="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 id="h1" className="title has-text-white has-text-centered is-family-code">
            Welcome to the movie site
          </h1>
          <Link className="button is-family-code is-light subtitle" to="/project-2/search">Click here to search 🎬</Link>
        </div>
      </div>
    </section>

    <h1></h1>

  </section>

}

// Style it 
// Carasel for featured movie?
export default Welcome
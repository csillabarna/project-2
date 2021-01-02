import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Pagination from 'bulma-pagination-react'



const Search = () => {
  // States being used throughout the component. 
  const [search, updateSearch] = useState('')
  const [searched, updateSearched] = useState('')
  const [displaySearch, updateDisplaySearch] = useState([])
  const [category, updateCategory] = useState('')
  const [year, updateYear] = useState('')
  const [error, updateError] = useState('')
  const [numResults, updateNumResults] = useState([])

  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = 10

  // For the pagination once the API results load. 
  const Pager = ({ currentPage }) => {
    const pages = Math.ceil(numResults / POSTS_PER_PAGE)
    return (
      <Pagination
        pages={pages}
        currentPage={currentPage}
        onChange={page => updatePage(page)}
      />
    )
  }

  // Function being called depending on the search filter used. 
  // 1000 daily limit on the API

  function buildUrl(category, year, page) {
    const plainUrl = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${searched}&page=${page}`

    if (year && !category) {
      return `${plainUrl}&y=${year}`
    } else if (category && !year) {
      return `${plainUrl}&type=${category}`
    } else if (year && category) {
      return `${plainUrl}&type=${category}&y=${year}`
    } else {
      return plainUrl
    }
  }

  const searchFunction = (searched, category, year, page) => {
    const url = buildUrl(category, year, page)
    if (searched) {
      axios.get(url)
        .then(res => {
          updateDisplaySearch(res.data.Search || [])
          updateError(res.data.Error || '')
          updateNumResults(res.data.totalResults)
        })
    }
  }

  useEffect(() => searchFunction(searched, category, year, page), [searched, category, year, page])

  // Rendering the elements onto the page 
  return <section id="search">
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <h1 className="title is-family-code">Search your movie here</h1>
            </div>
          </div>
          <div className="columns">
            <div className="field has-addons column">
              <div className="control">
                <input className="input is-family-code searchi"
                  placeholder="Search"
                  onChange={(event) => updateSearch(event.target.value)}
                  value={search} />
              </div>
              <div className="control">
                <button className="button is-family-code is-dark"
                  onClick={() => {
                    updateSearched(search)
                  }}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Elements for filtering the radio - radio and year input*/}
    <div className="container">
      <div className="columns is-mobile is-vcentered">
        <div className="control column is-one-quarter is-one-mobile" onChange={(e) => {
          updateCategory(e.target.value)
        }}>
          <label className="is-family-code radio">
            <input value="movie" type="radio" name="category" />
               Movies
          </label>
          <label className="is-family-code radio">
            <input value="series" type="radio" name="category" />
               Series
          </label>
          <label className="is-family-code radio">
            <input value="" type="radio" name="category" />
               All
          </label>
        </div>
        <input id="inputYear" className="is-family-code input is-small is-half column" placeholder="YYYY"
          onChange={(event) => updateYear(event.target.value)}
          value={year}
        />
      </div>
    </div>

    {/* Mapping of the API to display searched for results, link used to take take user to further info of selected item */}
    <section>
      <div className="our is-family-code container is-centered has-text-white is-size-3 my-6">
        <h1> {error !== '' && error} </h1>
      </div>
      <div className="container">
        <div className="columns px-6 is-multiline is-centered is-mobile">
          {displaySearch.map((movie, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <Link key={index} to={`/project-2/search/${movie.imdbID}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by5">
                      <img src={movie.Poster} alt={movie.Title} className="image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <h1 className="title has-text-centered has-text-black is-4 is-family-code">{movie.Title}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>

    </section>
    <div className="container my-6 pager">
      <Pager currentPage={page} />
    </div>
  </section >
}

export default Search



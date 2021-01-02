### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# Movie Search 🎬 

## Overview
For my second General Assembly project we paired up and were tasked to create a multi-page app using an API of our choosing within 48 hours. 

## Brief 

* **Consume a public API** – this could be anything but it must make sense for your project.
* Have several components
* **The app should include a router** - with several "pages".
* Have **semantically clean HTML** - you make sure you write HTML that makes structural sense rather than thinking about how it might look, which is the job of CSS.
* Deploy it online so it's publicly accessible

# Technologies Used
 - React.js
 - GitHub
 - Babel
 - Webpack
 - SCSS
 - Bulma
 - Insomnia
 - REST API - OMDB 

## Approach Taken 
The first step for this paired project was to decide on a theme for our app and the best API to use to bring our vision to life. 
We wanted to create an app that would search for movies and TV programmes not only by name, but with additional filters by type and/or year. We would display the results on the page, each card being a link to more information on the movie.
Whiteboarding out the basic structure along with the functions and components.
Next we created the basic React structure and built the logic to our main component the `search`. 

## Challenges 
 - Make the search filters work nicely together
 - Adding pagination
   - Might be a large number of results for a single query
   - The API has a limit of 10 results per page. 

**Search**

In order to store the relevant property values in the Search component, we used the `useState` React hook. Whenever the user updates their filters or search keyword the corresponding update functions are called and the state will change. 

``` javaScript
  const [searched, updateSearched] = useState('')
  const [category, updateCategory] = useState('')
  const [year, updateYear] = useState('')
```

If we have the keyword and the filters set, the next step is to build the correct URL. This is encapsulated in a separate function for clarity. 
```javaScript
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
  ```

  Now that we have the complete URL we can utilise `axios` to make the HTTP request. Based on the response we update the user's view. As you can see below we do this in the `useEffect` react hook and do this every time the underlying state changes.

```javaScript
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
```
```javaScript
useEffect(() => searchFunction(searched, category, year, page), [searched, category, year, page])
```

Working example of the search function: 

![search function working](./src/images/movieSearch.gif)
 
 


  **Pagination**

  We imported the `Pagination` package component
  to manage the API limit 10/page we used the the total results to work out the total number of pages in the pagination component.

```javaScript
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
```
After refactoring our plain URL to include the page number, we were able to implement the pagination to track and update the current page.

To make this component work within the boundaries of this API was a bit of a challenge, however we managed to get it working well. 


## Movie Page

 We used props to pull through the movie ID needed that would render the specific information for that film/programme onto the single movie page.
 We used react-router to link pages throughout our app.

```javaScript
  const Movie = (props) => {
  const movieId = props.match.params.movieId
  ...
}
  ```
  
# Future enhancements.
 - We think this project would benefit from a moving carousel on the search page which could display featured movies that the user could explore.

- create a wishlist. 

- With more time we would have liked to combine it with another API to provide more information 

## Summary

Over the course of this hackathon, we became more comfortable with a variety of technical skills such as using APIs and pagination. 
We can now confidently read the documentation and collect  the information from a public API.
We solidified the knowledge to transfer information between `react` components and make `axios fetch` requests to specific URLs by utilizing `template literals`. 

Lessons Learned:
  - efficient ways to pair-program
  - meeting strict deadlines 
  - develop presentation skills through the demo process
  - using `REST API` and display it on `react` UI

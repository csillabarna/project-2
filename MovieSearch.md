### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# Movie Search 🎬 

## Overview
For my second General Assembly project we paired up and were tasked to create a multi-page app using an API of our choosing within 48 hours. 

## Brief 

* **Consume a public API** – this could be anything but it must make sense for your project.
* **Have several components** - At least one classical and one functional.
* **The app should include a router** - with several "pages".
* **Include wireframes** - that you designed before building the app.
* Have **semantically clean HTML** - you make sure you write HTML that makes structural sense rather than thinking about how it might look, which is the job of CSS.
***Be deployed online** and accessible to the public.

## Technologies Used
 - React.js
 - SCSS
 - GitHub
 - Babel
 - Webpack
 - Bulma
 - Insomnia
 - OMDB API

## Approach Taken 
The first step for this paired project was to decide on a theme for our app and the best API to use to bring our vision to life. We agreed on an app that would search for movies and TV programmes. After this decision, we then talked through what we wanted to achieve, whitboarding out the basic structure of the app as well as the functions we wanted to implement. 

We wanted to create an app that would search not only by name, but that could be filtered by type or by year. We then wanted to display the results on the page, which each movie/TV programme card being a link to another page which would display more information. 

### Method 

**The search function**.

In order to store the relevant property values to the Search component, we used the `useState` React hook. 
We used axios to fetch the data from the API

1. To search for a key word, we got the input value from the search bar which we put into the variable `{searched}`. This variable was then added to the URL to create the const plainUrl. 
2. We wanted to add a varity of filters onto our search function which we did using radio buttons to filter for movies, series or all as well as filtering by year. 
3. To achieve the filter as per the users request, we needed to implement an `if-else` statement to ensure that the function ran, no matter how many filters were being used at once. 
4. We needed to use the `useEffect` react hook to make the fetch only when needed - such as when a new filter or search was created. 

```
const searchFunction = (searched, category, year, page) => {
    const plainUrl = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${searched}&page=${page}`
    const urlCategory = `${plainUrl}&type=${category}`
    const urlYear = `${plainUrl}&y=${year}`
    const urlLong = `${urlCategory}&y=${year}`
    let url = ''

    if (year && !category) {
      url = urlYear
    } else if (category && !year) {
      url = urlCategory
    } else if (year && category) {¢
      url = urlLong
    } else {
      url = plainUrl
    }
    if (searched) {
      axios.get(url)
        .then(resp => {
          updateDisplaySearch(resp.data.Search || [])
          updateError(resp.data.Error || '')
          updateNumResults(resp.data.totalResults)
        })
    }
  }
  useEffect(() => {
    return searchFunction(searched, category, year, page)
  }, [searched, category, year, page])
  ```

Working example of the search function: 

![search function working](./src/images/movie_search.png)
 
 

 ## Challenges 
 Limited by the API - Would have liked to include more features such as actor search etc. 
 
  **Pagination**
We needed to import the `Pagination` package component
  The API limited us to only 10 results per page so we needed to have pagination to ensure that we could display all of the results. The API gave a number for the total results per search.  We used this information to work out the total number of pages in the pagination component.

```
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
After refactoring our plain URL to include the page number, we were able to implement the pagination to track the current page and to update. 

To make this component work within the boundaries of this API was a challenge, however with a little persistance we managed to get it working well. 

## Linking the pages
We used react-router to link pages throughout our app - including the invididual movie page from the search

````
`ink key={index} to={`/project-2/search/${movie.imdbID}`}

````#

We were able to change the searchURL depending on the movie selected. This would render specific information just to that film/TV programme onto the single movie page. 

## Movie Page

``` const Movie = (props) => {
  const movieId = props.match.params.movieId
  const [movie, updateMovie] = useState([])
  { console.log(movieId) }

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?apikey=a48a3d11&i=${movieId}`)
      .then(resp => {
        updateMovie(resp.data)
      })
  }, []) 
  
  ```


# Future enhancements.
We think this project would benefit from a moving carousel on the search page which could display featured movies theat theuser could explore.

Use local storage to create a wish list. 

With more time we would have like to have combined another API to provide more information 

## Summary

Over the course of this hackathon, we became more comfortable with a variety of technical skills such as using APIs and pagination. 
We can now confidently read the documentation and collect  theinformation from a publi
API. Additionally, we solidified the knowledge to transfer information between components and make `fetch` requests to specific URLs by utilising `template literals`. 

Lessons Learned:
  - efficient ways to pair-programming
  - meeting strict deadlines 
  - develop a presentation skills through the demo proccess

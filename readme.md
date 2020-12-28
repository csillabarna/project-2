For my second General Assembly project we paired up for a 48 hour hackathon to create a multi-page app using an external API of our choosing.

Brief
Consume a public API – this could be anything but it must make sense for the project.
The app should include a router - with several "pages".
Include wireframes - that you designed before building the app.
Have semantically clean HTML - to write HTML that makes structural sense rather than thinking about how it might look, which is the job of CSS. *Be deployed online and accessible to the public.
Technologies Used
React.js
SCSS
GitHub
Babel
Webpack
Bulma
Insomnia
OMDB API
Approach Taken
###Planning We quickly agreed to create an app that would search for films and TV programmes, not only by name but by type and year. We wanted each film or programme card to be a link to another page that contained more detailed information on the selected item. We then talked through how we would achieve this, whitboarding out the basic structure of the app as well as the functions and components that would be needed.

Method
After creating the basic React structure of our app, the main focus was to get the key component of the project working - the search function.

The search function

OMDB searchs for films by key word; using our input component we were able to extract the input value from the search bar which we placed into the variable {searched} This variable was then used to create our basic URL to fetch data from the OMDB API.


2. We wanted to add a varity of filters onto our search function which we did using radio buttons to filter for movies, series or all as well as another input to filter by year. 3. To filter the search as per the users request, we needed to implement an `if-else` statement to ensure that the correct function ran, no matter which filters were being used. 4. The `useEffect` react hook was used to make sure the fetch happened only when needed - such as when a new filter or search was created.


Working example of the search function:



Linking the pages We used react-router to link pages throughout our app - including the invididual movie page from the search



Single Movie Page

We used props to pull through the movie ID needed that would render the specific information for that film/programme onto the single movie page.



##Challenges

Pagination One of the most challenging aspects of our project was getting the pagination component to work correctly.

The API limited us to only 10 results per page so we needed pagination to ensure that we could display all of the results.

The API gave a number for the total results per search. We used this information to work out the total number of pages in the pagination component.



After refactoring our plain URL to include the page number, we were able to implement the pagination to track the current page and to update the search results depending on the page number button clicked.

To make this component work within the boundaries of this API was a challenge, however with a little persistance we managed to get it working well.



Limited by the API- There were several other features that would have liked to include more features such as actor search etc.

Future enhancements.
This project would benefit from a moving carousel on the search page which could display featured movies that the user could explore.
To utilize local storage that would allow the user to create and save a wish list of movies & programmes.
To intergrate other APIs so that more information could be provided - such as details on actors, links to external pages to watch the movie such as netflix etc.
To make the app more mobile friendly
Summary
Over the course of this hackathon, we became more comfortable with a variety of technical skills such as using APIs and pagination. Additionally, we solidified the knowledge to transfer information between components and make fetch requests to specific URLs by utilising template literals.

Lessons Learned:

efficient ways to pair-programming
meeting strict deadlines
develop a presentation skills through the demo proccess
# ID_Keerthana_S10194171A_Assignment_2

# Website Aim
This website allows prospective users to search for an entertainment with the title, which will in return produce the various possible search results using the search text that the user entered. Thereafter , the user can locate for their single chosen entertainment title and learn more. This site is powered by Online movie database , OMDB API, which is an online repository of movies, television series and games. The API has an exhaustive source of information about the cast, the production crew, more on the plot and even the box office.

## 1. Design Process
As a user , I will want my website to be easy to access and understand. As an web developer , I would want my website's goal to be acheived and for the user to have a seamless experience while accessing my site. My webpage has 2 important interfaces where the user interacts with my website. The search bar and the about site button that is located on the right. The logo shows the users what the website is and in this case I included the site name , *Entertainment Search Site* in the logo for the user to know what site they are entering.

## 2. The Search Bar
The search bar is located at the center of the screen with a very simple design shwoing a search icon button. Firstly the color of the search bar was chosen to be white as it shows contrasts and does not blend in with the background chosen. The placeholder text *"Enter an entertainment title..."* is to help users understand how the data is expected to be entered. It serves as a short hint. The search icon exist for the user to know that they should press search after typing a data into the search bar. While these are very asic and easy to understand elements in a website , It should still be user friendly. Thus , I decided to design a simple yet visually appealing site that is not complex. This way , users can easily process the information on the site. 

## 3. The About Site *'button'*
The About Site *'button'* might not appear like a button at first glance , however when the user hovers over it , the background color of the button is highlight in yellow and the text color changes to black. I have made the cursor a pointer cursor as well which reads to the user that it is a clickable element on the website.

# How the site reacts
 __*When the user enters the site*__
  - They enter a title into the search bar
  - Search result appears with cards showing possible entertainment titles based on what the user searched
  - Cards contain entertainment poster , entertainment title and a __*Learn more*__  button
  
 __*When the user clicks the learn more button*__
  - A modal pops up with the same webpage with dimmed background to show emphasis on chosen entertinment title
  - Modal has content such as the poster , title , age rating , Box office and more
  - Content is well spaced out 
  - Content shows highlights for certain information to show emphasism
  - Modal is mobile compatible

 __*When the user interacts with the Close button at the top of the modal*__
  - A hover effect with enlargement of the button,yellow background and a pointer cursor which shows that it is a clickable element
  - When clicked , the modal closes
  - Behind the scenes, the modal content is cleared to allow for other informations to be appended if user clicks on the learn more button of a different title

 __*When the user interacts with the About me button*__
  - A hover effect with enlargement of the button,yellow background and a pointer cursor which shows that it is a clickable element
  - When clicked , the site information is shown with methods to contact me.


# Features implemented
Aesthetics and Usability - __*Important as first impression matters*__
- Consistency
- Clear and appropriately sized text to view content
- Usable and well organized layout , not clutered
- Alignment
- Striking Font Colours against a dark background

Mobile Compatibility
- Reach out to a wider audience
- Make use of cards that uses css framework , Flexbox
  - *Flexbox is a CSS technology that refers to the CSS Flexible Box Layout*
- Users can access the site and have the full experience even if they are on the go and wish to learn about an entertainment
 

There are many more features to be implemented in the future. currently , I can think of one feature I would like to implement

## Feature Left to Implement
A feature would be to allow users favourite movies. This feature would make use of the *localStorage* property in Javascript. While I had attempted to implement this idea , my localstorage had duplicates thus I had scraped the idea.

### What the future feature would include
*(Assuming the local storage is empty)*
- A transparent star would be included in the modal beside the entertainment title when It appears
- Users can select the star will will then add the poster , title , & rating to the local storage
- When the item is in the local storage the star in the modal will be filled with yellow , indicating the entertainment being in the local storage
- There will be a favourites button that user can click to view their favourite entertainment titles
- Users will be allowed to remove the item or clear their favourites list

## Technologies Used
- [HTML]
    - HTML provides the basic structure to the website. Everything from the header to the footer is implement here.
- [CSS]
    - CSS is used to style the items in the website. Such as the colors , fonts , sizes , transitions etc. 
      Essentially styles and design the website.
- [JS]
    - JS was used to create event listeners for the various button and also fecth informations from the API. JS was what made the site primarily intercative
     
## References
__*Inspiration for the modal design*__<br>
https://skempin.github.io/reactjs-tmdb-app/

__*W3Schools Code reference for modal*__<br>
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal


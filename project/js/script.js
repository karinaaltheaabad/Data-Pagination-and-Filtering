/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   const startIndex = (page * list.length) - list.length;
   const endIndex = page * list.length;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   
   for (let i = 0; i < list.length; i++) {
      if ( i  >= startIndex && i < endIndex ) {
            studentList += `
               <li class=\"student-item cf\">
                  <div class=\"student-details\">
                     <img class=\"avatar\" src=${list[i].picture.medium} alt=\"Profile Picture\">
                     <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
                     <span class=\"email\">${list[i].email}</span>
                  </div>
                  <div class=\"joined-details\">
                     <span class=\"date\">Joined ${list[i].registered.date}</span>
                  </div>
               </li>
            `;
      }
   }
   document.querySelector('.student-list').insertAdjacentHTML('beforeend', studentList);
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data, 1);
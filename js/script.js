/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/**
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * param: list (list of objects/people from data.js), page (represent page number)
 * return: none, displays the array of students taken from the list
 */
const showPage = (list, page) => {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = "";
   let studentItem = '';
   
   for (let i = 0; i < list.length; i++) {
      if ( i  >= startIndex && i < endIndex ) {
            studentItem += `
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

   studentList.insertAdjacentHTML('beforeend', studentItem);
}


/**
 * This function will create and insert/append the elements needed for the pagination buttons
 * param: list (array of student objects from data.js)
 * return: none, displays the page numbers on the bottom of the screen, and calls showPage to display 
 * data from list. 
 */
const addPagination = (list) => {
   const numberOfPages = Math.ceil(list.length/9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   let button = '';

   for (let i = 1; i <= numberOfPages; i++) {
      button += `
         <li>
            <button type=\"button\"> ${i} </button>
         </li>
      `;
   }

   linkList.insertAdjacentHTML('beforeend', button);
   document.querySelector('button').className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName == "BUTTON") {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
}

/**
 * displays search bar on header 
 * param: none
 * return: none
 */
function displaySearchBar() {
   const header = document.querySelector('.header');
   let searchBar = '';

   searchBar += `
      <label for=\"search\" class=\"student-search\">
         <span>Search by name</span>
         <input id=\"search\" placeholder=\"Search by name...\">
         <button type=\"button\"><img src=\"img/icn-search.svg\" alt=\"Search icon\"></button>
      </label>
   `;

   header.insertAdjacentHTML('beforeend', searchBar);
}

/**
 * sorts through list of persons from input and sets classname to match
 * @param {*} searchInput 
 * @param {*} list 
 */
const sortList = (searchInput, list) => {
   let filteredStudents = [];
   let studentList = document.querySelector('.student-list');

   //for each student in list, change the className to match if the search input is not empty and includes a part of a
   //current students data
   for (let i = 0; i < list.length; i++) {
      let student = `${list[i].name.first} ${list[i].name.last}\n`;
      if (searchInput.value.length != 0 && student.toLowerCase().includes(searchInput.value.toLowerCase())) {
        filteredStudents.push(list[i]);
      }
   }

   if (filteredStudents.length == 0) {
      let noResult = '';
      noResult += `<p style=\"font-size: 50px; color: black; text-align: center;\">No Results Found</p>`;
      studentList.innerHTML = noResult; 
   } else {
      //JSON.stringify allows filteredStudents objects to strings 
      // [object Object] to {name: first="karina" last="abad" etc}
      JSON.stringify(filteredStudents);
      showPage(filteredStudents, 1);
      addPagination(filteredStudents);
   }
}

// Call functions
showPage(data, 1);
addPagination(data);
displaySearchBar();

const input = document.querySelector('#search');
const button = document.querySelector('.student-search button');

button.addEventListener('click', (e) => {
   e.preventDefault();
   sortList(input, data);
});

input.addEventListener('keyup', () => {
   sortList(input, data);
});


/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan','dustinmyers','justsml','luishrd','bigknell'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// step1

axios.get('https://api.github.com/users/Evelyn312')
    .then( response => {
        let newCard = cardMaker(response.data);
        let cardsLoc = document.getElementsByClassName('cards');
        cardsLoc[0].appendChild(newCard);
        followersArray.forEach((follower) => {
          axios.get(`https://api.github.com/users/${follower}`)
            .then( response => {
              let newCard = cardMaker(response.data);
              let cardsLoc = document.getElementsByClassName('cards');
              cardsLoc[0].appendChild(newCard);
            })
            .catch( err => {
              console.log("There is an error");
            })
        });
    })
    .catch( err => {
        console.log("There is an error");
    })

//step 3

function cardMaker (userObj){
    let newUser = document.createElement('div');
    newUser.classList.add('card');

    let userImage = document.createElement('img');
    newUser.appendChild(userImage);
    
    let nameOfUser = document.createElement('h3');
    nameOfUser.classList.add('name');
    nameOfUser.textContent = `${userObj.name}`
    newUser.appendChild(nameOfUser);

    let usernameOfUser = document.createElement('p');
    usernameOfUser.classList.add('username');
    usernameOfUser.textContent =`${userObj.login}`
    newUser.appendChild(usernameOfUser);
    
    let locationOfUser = document.createElement('p');
    newUser.appendChild(locationOfUser);
    
    let profileOfUser = document.createElement('p');
    profileOfUser.textContent = `Profile:`;
    newUser.appendChild(profileOfUser);

    let addressOfUser = document.createElement('a');
    profileOfUser.appendChild(addressOfUser);

    let followersOfUser = document.createElement('p');
    followersOfUser.textContent = `Followers: ${userObj.followers}`;
    newUser.appendChild(followersOfUser);

    let followingOfUser = document.createElement('p');
    followingOfUser.textContent = `Following: ${userObj.following}`;
    newUser.appendChild(followingOfUser);

    let bioOfUser = document.createElement('p');
    bioOfUser.textContent = `Bio: ${userObj.bio}`;
    newUser.appendChild(bioOfUser);

    return newUser;
};

// followersArray.forEach((follower) => {
//   axios.get(`https://api.github.com/users/${follower}`)
//     .then( response => {
//       let newCard = cardMaker(response.data);
//       let cardsLoc = document.getElementsByClassName('cards');
//       cardsLoc[0].appendChild(newCard);
//     })
//     .catch( err => {
//       console.log("There is an error");
//     })
// });



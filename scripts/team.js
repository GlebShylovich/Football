const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".team-modal-content");
let playersData;
let cards = ArrUserCardComponents();
let limit = cards.length;
let shownUserIndexes = [];

fetch("http://localhost:3000/players")
  .then((response) => response.json())
  .then((data) => {
    playersData = data;
    console.log(playersData);
    loadUserData(0, 21);
    handleUserCardFunctional();
  })
  .catch((error) => console.error(error));

function loadUserData(start, end, array) {
  array = array || playersData;

  for (let i = start; i < end; i++) {
    let index = i % limit;

    cards[index].avatar.src = array[i].avatar;
    cards[index].name.textContent = array[i].name;
    cards[index].number.textContent = array[i].number;

    shownUserIndexes[index] = i;
  }
}

function ArrUserCardComponents() {
  let cards = document.querySelectorAll(".user-card");
  let arr = [];

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    arr.push({
      avatar: card.querySelector(".avatar"),
      name: card.querySelector(".name"),
      number: card.querySelector(".number"),
      position: card.querySelector(".position"),
      age: card.querySelector(".age"),
      country: card.querySelector(".country"),
      height: card.querySelector(".height"),
      weight: card.querySelector(".weight"),
    });
  }

  return arr;
}

async function handleUserCardFunctional() {
  let cards = document.querySelectorAll(".user-card");

  popupOnClick();

  function popupOnClick() {
    let idx = shownUserIndexes;

    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        let index = idx[i];
        modal.style.display = "block";
        const modalInfo = document.createElement("div");
        modalInfo.classList.add("modal-info"); // Removed the dot from the class name
        const template = `
        <img src="${playersData[index].avatar}" alt="Image">
        <div class="card-flex-box">
          <h1 class="name">${playersData[index].name}</h1>
          <h1 class="number">${playersData[index].number}</h1>
        </div>
        <div class="player-position-box">
          <p>Position: </p><p class="position">${playersData[index].position}</p>
        </div>
        <div class="player-country-box">
          <p>Country:</p><p class="country">${playersData[index].country}</p>
        </div>
        <div class="player-age-box">
          <p>Age:</p><p class="age">${playersData[index].age}</p>
        </div>
        <div class="player-height-box">
          <p>Height:</p><p class="height">${playersData[index].height}</p>
        </div>
        <div class="player-weight-box">
          <p>Weight:</p><p class="weight">${playersData[index].weight}</p>
        </div>`;

        modalInfo.innerHTML = template;
        modalContent.append(modalInfo);
      });
    }
  }
}

//modal
function clearModal() {
  var modalContent = document.querySelector(".team-modal-content");
  modalContent.innerHTML = "";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearModal();
  }
};

//search
const cardList = document.querySelector(".search-box");
const inputSearch = document.querySelector(".search-input");

const btnSearch = document.querySelector(".search-btn");

function createPost({
  avatar,
  name,
  number,
  country,
  age,
  height,
  weight,
  position,
}) {
  const card = document.createElement("div");
  card.classList.add("user-card");
  const template = `
      <div class="card-image-box"><img class="avatar" src="${avatar}"></div>
      <div class="card-text-box">
        <p class="name">${name}</p>
        <p class="number">${number}</p>
      </div>
  `;
  card.innerHTML = template;
  cardList.append(card);

  card.addEventListener("click", function () {
    modal.style.display = "block";
    const modalInfo = document.createElement("div");
    modalInfo.classList.add("modal-info"); // Removed the dot from the class name
    const template = `
        <img src="${avatar}" alt="Image">
        <div class="card-flex-box">
          <h1 class="name">${name}</h1>
          <h1 class="number">${number}</h1>
        </div>
        <div class="player-position-box">
          <p>Position: </p><p class="position">${position}</p>
        </div>
        <div class="player-country-box">
          <p>Country:</p><p class="country">${country}</p>
        </div>
        <div class="player-age-box">
          <p>Age:</p><p class="age">${age}</p>
        </div>
        <div class="player-height-box">
          <p>Height:</p><p class="height">${height}</p>
        </div>
        <div class="player-weight-box">
          <p>Weight:</p><p class="weight">${weight}</p>
        </div>`;

    modalInfo.innerHTML = template;
    modalContent.append(modalInfo);
  });
}

function createListSearch(arr) {
  cardList.innerHTML = "";
  arr.forEach((item) => {
    createPost(item);
  });
}

function serch() {
  fetch("http://localhost:3000/players")
    .then((resp) => resp.json())
    .then((players) => {
      const newPlayers = players.map((item) => {
        return item;
      });
      const value = inputSearch.value;

      if (value) {
        const newArr = newPlayers.filter((item) => {
          if (item.name.indexOf(value) == -1) {
            return false;
          }
          return true;
        });
        console.log(newArr);
        createListSearch(newArr);
      }

      cardList.style.remove = "none";
    });
}

btnSearch.addEventListener("click", serch);

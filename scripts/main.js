const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");
let sliderData;
let slides = ArrSlideComponents();
let limit = slides.length;
let shownSlideIndexes = [];

fetch("http://localhost:3000/slider")
  .then((response) => response.json())
  .then((data) => {
    sliderData = data;
    console.log(sliderData);
    loadSlideData(0, 3);
    handleSlideFunctional();
  });

function loadSlideData(start, end) {
  for (let i = start; i < end; i++) {
    let index = i % limit;

    slides[index].background.src = sliderData[i].background;
    slides[index].title.textContent = sliderData[i].title;

    shownSlideIndexes[index] = i;
  }
}

function ArrSlideComponents() {
  let slides = document.querySelectorAll(".slide");
  let arr = [];

  for (let i = 0; i < slides.length; i++) {
    let slide = slides[i];
    arr.push({
      background: slide.querySelector(".slide-background"),
      title: slide.querySelector(".slide-title"),
      subtitle: slide.querySelector(".slide-subtitle"),
    });
  }

  return arr;
}

function handleSlideFunctional() {
  let slides = document.querySelectorAll(".slide");

  popupOnClick();
  function popupOnClick() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].addEventListener("click", function () {
        let index = shownSlideIndexes[i];
        modal.style.display = "block";
        const modalInfo = document.createElement("div");
        modalContent.classList.add(".modal-info");
        const template = `
        <img src="${sliderData[index].background}" alt="Image">
        <h1>${sliderData[index].title}</h1>
        <p>${sliderData[index].subtitle}</p>`;
        modalInfo.innerHTML = template;
        modalContent.append(modalInfo);
      });
    }
  }
}

const slidesForScroll = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let slideIndex = 0;

function showSlide(index) {
  if (index < 0) {
    slideIndex = slidesForScroll.length - 1;
  } else if (index >= slidesForScroll.length) {
    slideIndex = 0;
  } else {
    slideIndex = index;
  }

  slidesForScroll.forEach((slide) => {
    slide.style.display = "none";
  });

  slidesForScroll[slideIndex].style.display = "flex";
}

showSlide(slideIndex);
prevBtn.addEventListener("click", function () {
  setTimeout(function () {
    showSlide(slideIndex - 1);
  }, 400);
});
nextBtn.addEventListener("click", function () {
  setTimeout(function () {
    showSlide(slideIndex + 1);
  }, 400);
});

function autoSlide() {
  showSlide(slideIndex + 1);
}

setInterval(autoSlide, 5000);
//modal
function clearModal() {
  var modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearModal();
  }
};

//news
let newsData;
let news = ArrNewsComponents();
let newsLimit = news.length;
let shownNewsIndexes = [];

fetch("http://localhost:3000/news")
  .then((response) => response.json())
  .then((data) => {
    newsData = data;
    console.log(newsData);
    loadNewsData(0, 3);
    handleNewsFunctional();
  });

function loadNewsData(start, end) {
  for (let i = start; i < end; i++) {
    let index = i % newsLimit;

    news[index].image.src = newsData[i].image;
    news[index].title.textContent = newsData[i].title;
    news[index].subtitle.textContent = newsData[i].subtitle;
    shownNewsIndexes[index] = i;
  }
}

function ArrNewsComponents() {
  let news = document.querySelectorAll(".news");
  let arr = [];

  for (let i = 0; i < news.length; i++) {
    let newsItem = news[i];
    arr.push({
      image: newsItem.querySelector(".news-image"),
      title: newsItem.querySelector(".news-title"),
      subtitle: newsItem.querySelector(".news-subtitle"),
    });
  }

  return arr;
}

function handleNewsFunctional() {
  let news = document.querySelectorAll(".news");

  popupOnClick();

  function popupOnClick() {
    for (let i = 0; i < news.length; i++) {
      news[i].addEventListener("click", function () {
        let index = shownNewsIndexes[i];
        modal.style.display = "block";
        const modalInfo = document.createElement("div");
        modalContent.classList.add(".modal-info");
        const template = `
        <img src="${newsData[index].image}" alt="Image">
        <h1>${newsData[index].title}</h1>
        <p>${newsData[index].subtitleFull}</p>`;
        modalInfo.innerHTML = template;
        modalContent.append(modalInfo);
      });
    }
  }
}

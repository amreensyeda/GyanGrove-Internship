const getUrl = function (imageUrl) {
  const str = imageUrl.slice(
    imageUrl.indexOf("/d/") + 3,
    imageUrl.indexOf("/view")
  );
  return str;
};
const eventEle = document.querySelector(".events");
const elements = fetch(
  "https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.events.forEach((event) => {
      const markup = `
      <div id="events-container">
        <img src="https://drive.google.com/thumbnail?id=${getUrl(
          event.imgUrl
        )}"/>
        <div class="title-date">
            <h5 class="title">Make Agree</h5>
            <h6 class="date">March 23,2024</h6>
        </div>
        <div class="loc-weather">
            <h6 class="loc">West Douglas</h6>
            <h6 class="weather">Snowy, 28 &deg;C | 42 km</h6>
        </div>
      </div>`;
      eventEle.innerHTML += markup;
    });
  })
  .catch((error) => console.log(error));

const upEventEle = document.querySelector(".upcoming-events");
let nextPage = 1;
let isLoading = false;

// Function to fetch events data
const fetchEvents = () => {
  isLoading = true;
  fetch(
    `https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${nextPage}&type=upcoming`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.events.length >= 0) {
        data.events.forEach((event) => {
          const markup = `
          <div class="upcoming-events-card">
         <img src="https://drive.google.com/thumbnail?id=${getUrl(
           event.imgUrl
         )}""/>
        <h6 class="date">March 23,2024</h6>
        <h6 class="up-title">After note nearly</h6>
        <div class="up-location-weather"><h6 class="up-location">West Douglas</h6>
        <h6 class="up-weather">Snowy, 28 &deg;C | 42 km</h6></div>
      </div>`;
          upEventEle.innerHTML += markup;
        });
        nextPage++;
      }
    })
    .catch((error) => console.log(error))
    .finally(() => {
      isLoading = false;
      hideLoadingSpinner();
    });
};

// Function to check if user has scrolled to the bottom of the page
const isScrolledToBottom = () => {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
};

// Function to show loading spinner
const showLoadingSpinner = () => {
  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("loading-spinner");
  loadingSpinner.innerHTML = "Loading..."; // You can replace this with an actual loading spinner element
  upEventEle.appendChild(loadingSpinner);
};

// Function to hide loading spinner
const hideLoadingSpinner = () => {
  const loadingSpinner = document.querySelector(".loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
};

// Event listener for scrolling
window.addEventListener("scroll", () => {
  if (!isLoading && isScrolledToBottom()) {
    showLoadingSpinner();
    fetchEvents();
  }
});

// Initial fetch
fetchEvents();

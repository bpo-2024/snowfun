// define the card height when it is not expanded

const cardHeight = 160;

// get all cards
const cards = document.querySelectorAll(".description");

// loop through cards
for (let card of cards) {
  const description = card.querySelector(".description-content");
  const readMore = card.querySelector(".description-button");

  // limit description height to s200px
  description.style.maxHeight = `${cardHeight}px`;
  // hide read more button if description is less than card height
  if (description.scrollHeight <= cardHeight) {
    readMore.style.display = "none";
  }

  // function to add span with hellip
  const addSpan = () => {
    let span = document.createElement("span");
    span.innerHTML = "&hellip;";
    // append span after description
    description.parentNode.insertBefore(span, description.nextSibling);
  };

  // add a span with hellip at the end of the container if the card is not expanded
  if (description.scrollHeight > cardHeight) {
    addSpan();
  }

  // add event listener to read more button to toggle description height
  readMore.addEventListener("click", () => {
    if (description.style.maxHeight === `${cardHeight}px`) {
      description.style.maxHeight = `${description.scrollHeight}px`;
      readMore.innerHTML = "顯示較少內容";
      // remove span with hellip when description is expanded
      description.nextSibling.remove();
    } else {
      description.style.maxHeight = `${cardHeight}px`;
      readMore.innerHTML = "顯示更多內容";
      // add span with hellip when description is collapsed
      addSpan();
    }
  });
}

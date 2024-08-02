const cardHeight = 160;
const certificateHeight = 212;

const cards = document.querySelectorAll(".description");

for (let card of cards) {

  const description = card.querySelector(".description-content");
  const certificate = card.querySelector(".description-content.certificate");
  const readMore = card.querySelector(".description-button");
  const readMoreNoDot = card.querySelector(".description-button-nodot");

  if (description) {
    description.style.maxHeight = `${cardHeight}px`;
    if (description.scrollHeight <= cardHeight && readMore) {
      readMore.style.display = "none";
    }  
  }
  if (certificate) {
    certificate.style.maxHeight = `${certificateHeight}px`;
    if (certificate.scrollHeight <= certificateHeight &&readMoreNoDot){
      readMoreNoDot.style.display = "none";
    }
  }

  const addSpan = () => {
    let span = document.createElement("span");
    span.innerHTML = "&hellip;";
    description.parentNode.insertBefore(span, description.nextSibling);
  };

  if (description.scrollHeight > cardHeight && !readMoreNoDot) {
    addSpan();
  } 

  if (readMore) {
      readMore.addEventListener("click", () => {
        if (description.style.maxHeight === `${cardHeight}px`) {
          description.style.maxHeight = `${description.scrollHeight}px`;
          readMore.innerHTML = "顯示較少內容"+`<i class="fa-solid fa-angle-up"></i>`;
          description.nextSibling.remove();
        } else {
          description.style.maxHeight = `${cardHeight}px`;
          readMore.innerHTML = "顯示更多內容"+`<i class="fa-solid fa-angle-down"></i>`;
          addSpan();
        }
      });
  }
  if (readMoreNoDot) {
    readMoreNoDot.addEventListener("click", () => {
      if (certificate.style.maxHeight === `${certificateHeight}px`) {
        certificate.style.maxHeight = `${certificate.scrollHeight}px`;
        readMoreNoDot.innerHTML = "顯示較少內容"+`<i class="fa-solid fa-angle-up"></i>`;
      } else {
        certificate.style.maxHeight = `${certificateHeight}px`;
        readMoreNoDot.innerHTML = "顯示更多內容"+`<i class="fa-solid fa-angle-down"></i>`;
      }
    })
  }
}

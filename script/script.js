const body = document.getElementById("body");
const formModal = document.getElementById("form-modal");
const formModalClose = document.getElementById("form-modal-close");
const openModal = Array.from(document.getElementsByClassName("open-modal"));

// Open Modal / Popup
openModal.forEach((item) => {
  item.addEventListener("click", () => {
    body.classList.add("no-scroll");
    formModal.style.display = "flex";
  });
});

// Close Modal / Popup
formModalClose.addEventListener("click", () => {
  body.classList.remove("no-scroll");
  formModal.style.display = "none";
});

// Tags Feature
const input = document.getElementById("tag-input");
const tagInputHidden = document.getElementById("tag-input-hidden");
const inputTagWrapper = document.querySelector(".input-tag-wrapper");

let tags = [];

function createTagElement(text) {
  return `<li class="tag-item"><span>${text}</span><button class="tag-item-btn"><i class="bi bi-x" data-item=${text}></i></button></li>`;
}

function resetTags() {
  const tags = document.querySelectorAll(".tag-item");
  tags.forEach((tag) => {
    tag.remove();
  });
}

function addTags() {
  resetTags();
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      const element = createTagElement(tag);
      inputTagWrapper.insertAdjacentHTML("afterbegin", element);
    });
}

function deleteTags() {
  const tagItemBtn = document.querySelectorAll(".tag-item-btn");

  tagItemBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const tagValue = e.target.parentElement.parentElement.innerText;

      filteredTags = tags.filter((tag) => tag != tagValue);
      tags = filteredTags;
      console.log(tags);
      const tagsString = tags.toString();
      tagInputHidden.value = tagsString;

      e.target.parentElement.parentElement.remove();
    });
  });
}

// jika Enter ditekan
input.addEventListener("keydown", (e) => {
  const value = e.target.value;

  if (e.key == "Enter") {
    e.preventDefault();

    if (value.length > 0 && !tags.includes(value) && tags.length < 5) {
      tags.push(value);
      addTags();

      const tagsString = tags.toString();
      tagInputHidden.value = tagsString;
    }

    input.value = "";

    // deleteTags();
  }
});

// jika tags dihapus
document.addEventListener("click", (e) => {
  if (e.target.tagName == "I") {
    e.preventDefault();
    const value = e.target.getAttribute("data-item");
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    addTags();
  }
});

// const inputTag = document.getElementById("tag-input");
// const inputTagWrapper = document.querySelector(".input-tag-wrapper");
// const tagsButton = inputTagWrapper.querySelectorAll(".tag-item-btn");

// const tags = [];

// tagsButton.forEach((tagButton) => {
//   tagButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const tag = e.target.parentElement.parentElement.innerText;
//     console.log(tag);
//   });
// });

//     const tagIndex = tags.indexOf(tag);
//     tags.splice(tagIndex, 1);
//     console.log(tags);
//   });
// });

// function createTag() {
//   inputTagWrapper.querySelector(".tag-item").forEach((item) => item.remove());
//   tags.forEach((tag) => {
//     const el = `<li>${tag}<button>x</button></li>`;
//     inputTagWrapper.insertAdjacentHTML("afterbegin", el);
//   });
// }

// function addTag(e) {
//   if (e.key == "Enter") {
//     e.preventDefault();
//     let tag = e.target.value;
//     tag = tag.trim().toLowerCase();

//     if (tag.length > 0) {
//       tag.split(",").forEach((tag) => {
//         if (!tags.includes(tag)) {
//           tags.push(tag);
//           const el = `<li class="tag-item">${tag}
//           <button class="tag-item-btn">
//             <i class="bi bi-x"></i>
//           </button>
//         </li>`;
//           inputTagWrapper.insertAdjacentHTML("afterbegin", el);
//         }
//       });
//       // createTag();
//     }

//     console.log(tag);
//     // const tagElement = `<li>${inputValue}<button>x</button></li>`;
//     // inputTagWrapper.insertAdjacentHTML("afterbegin", tagElement);
//   }
// }

// inputTag.addEventListener("keydown", addTag);

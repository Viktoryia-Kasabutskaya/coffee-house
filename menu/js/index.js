import list from "./list.js";

// burger-menu

const menuBtn = document.querySelector(".btn-burger");
const menu = document.querySelector(".nav");
const menuLink = document.querySelector(".header-menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  menu.classList.toggle("active");
  menuLink.classList.toggle("active");
  document.body.classList.toggle("stop-scroll");
});

const menuLinks = document.querySelectorAll(".nav-link");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    menu.classList.remove("active");
    menuLink.classList.remove("active");
    document.body.classList.remove("stop-scroll");
  });
});

menuLink.addEventListener("click", () => {
  menuBtn.classList.remove("active");
  menu.classList.remove("active");
  menuLink.classList.remove("active");
  document.body.classList.remove("stop-scroll");
});

window.addEventListener("click", (e) => {
  const target = e.target;
  if (
    !target.closest(".nav") &&
    !target.closest(".btn-burger") &&
    !target.closest(".header-menu")
  ) {
    menu.classList.remove("active");
    menuBtn.classList.remove("active");
    menuLink.classList.remove("active");
    document.body.classList.remove("stop-scroll");
  }
});

//===============================================================

let activeCategory = "coffee";
let btnAddItems;

function filterAndDisplayMenu(category) {
  activeCategory = category;
  activateButton();
  const filteredMenu = list.filter((item) => item.category === category);
  displayMenu(filteredMenu);
  checkVisibleItems();
}

function displayMenu(menuItems) {
  const menuListElement = document.getElementById("menuList");
  menuListElement.innerHTML = "";

  menuItems.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.className = "menu-item";

    if (index >= 4) {
      listItem.classList.add("menu-item-hidden");
    }

    const innerHtml = `
      <div class="item-img"><img src="${item.imgPath}" alt="${item.name}"></div>
      <div class="item-description">
        <h3 class="item-title">${item.name}</h3>
        <p class="item-text">${item.description}</p>
        <h3 class="item-price">$${item.price}</h3>
      </div>
    `;

    listItem.innerHTML = innerHtml;
    menuListElement.appendChild(listItem);

    listItem.addEventListener("click", () => {
      openModal(item);
    });
  });
  updateLoadMoreButton(menuItems.length);
}

function activateButton() {
  const buttons = document.querySelectorAll(".menu-btn");
  buttons.forEach((button) => {
    button.classList.remove("menu-btn-active");
    if (button.dataset.category === activeCategory) {
      button.classList.add("menu-btn-active");
    }
  });
}

function checkVisibleItems() {
  const menuItems = document.querySelectorAll(".menu-item");

  const shouldShowButton =
    document.documentElement.clientWidth <= 1089 && menuItems.length > 4;

  btnAddItems.classList.toggle("show", shouldShowButton);

  if (!shouldShowButton) {
    menuItems.forEach((item, index) => {
      item.classList.remove("menu-item-hidden");
      if (index >= 4) {
        item.classList.add("menu-item-hidden");
      }
    });
  }
}

function updateLoadMoreButton(totalItems) {
  const loadMoreButton = document.querySelector(".btn-add-menu");
  if (totalItems > 4) {
    loadMoreButton.classList.add("show");
  } else {
    loadMoreButton.classList.remove("show");
  }
}

window.addEventListener("resize", () => {
  checkVisibleItems();
  filterAndDisplayMenu(activeCategory);
});

document.querySelectorAll(".menu-btn").forEach((button) => {
  button.addEventListener("click", () => {
    filterAndDisplayMenu(button.dataset.category);
  });
});

btnAddItems = document.querySelector(".btn-add-menu");
btnAddItems.addEventListener("click", () => {
  const hiddenItems = document.querySelectorAll(".menu-item-hidden");

  hiddenItems.forEach((item) => {
    item.classList.remove("menu-item-hidden");
  });

  btnAddItems.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", () => {
  filterAndDisplayMenu(activeCategory);
});

// modal

function openModal(item) {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const modalContent = `
  <div class="modal">
    <div class="modal-menu">
        <div class="modal-right">
            <div class="modal-img"><img src="${item.imgPath}" alt="${
    item.name
  }"></div>
        </div>
        <div class="modal-left">
            <h3 class="modal-subtitle">${item.name}</h3>
            <p class="modal-text">${item.description}</p>
            <div class="modal-size">
                <p class="modal-size-text">Size</p>
                <div class="modal-btn-wrapper">
                ${Object.entries(item.sizes)
                  .map(
                    ([size, details], index) => `
                    <button class="modal-btn btn-size ${
                      index === 0 ? "btn-size-active" : ""
                    }"  data-size="${size}">
                      <span class="modal-btn-size">${size.toUpperCase()}</span>${
                      details.size
                    }
                    </button>
              `
                  )
                  .join("")}
                </div>
            </div>
            <div class="modal-additives">
                <p class="modal-additives-text">Additives</p>
                <div class="modal-btn-wrapper">
                ${item.additives
                  .map(
                    (additive, index) => `
                <button class="modal-btn btn-additives" data-additive-index="${index}">
                  <span class="modal-btn-size">${index + 1}</span>${
                      additive.name
                    }
                </button>
              `
                  )
                  .join("")}
                </div>
            </div>
            <div class="modal-total">
                <h3 class="modal-subtitle">Total:</h3>
                <h3 class="modal-subtitle" id="modalTotalPrice">$${
                  item.price
                }</h3>
            </div>
            <div class="modal-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_268_9737)">
                        <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z"
                            stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_268_9737">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p class="modal-info-text">The cost is not final. Download our mobile app to see the final price
                    and place your
                    order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
            </div>
            <button class="modal-close">Close</button>
        </div>
    </div>
  </div>
`;
  document.body.insertAdjacentHTML("beforeend", modalContent);

  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.position = "fixed";

  const modalOverlay = document.querySelector(".modal");
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  const modalCloseButton = document.querySelector(".modal-close");
  modalCloseButton.addEventListener("click", closeModal);

  let selectedSize = "s";
  const modalSizeButtons = document.querySelectorAll(".btn-size");
  const modalAdditivesButtons = document.querySelectorAll(".btn-additives");
  const modalTotalPrice = document.getElementById("modalTotalPrice");
  const selectedAdditives = new Set();

  function updateTotalPrice() {
    const sizeDetails = item.sizes[selectedSize];
    let totalPrice =
      parseFloat(item.price) + parseFloat(sizeDetails["add-price"]);

    selectedAdditives.forEach((index) => {
      const additive = item.additives[index];
      totalPrice += parseFloat(additive["add-price"]);
    });

    modalTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  function activateSizeButton(button) {
    modalSizeButtons.forEach((sizeButton) => {
      sizeButton.classList.remove("btn-size-active");
    });
    button.classList.add("btn-size-active");
  }

  modalSizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size;
      activateSizeButton(button);
      updateTotalPrice();
    });
  });

  modalAdditivesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const additiveIndex = parseInt(button.dataset.additiveIndex, 10);

      if (selectedAdditives.has(additiveIndex)) {
        selectedAdditives.delete(additiveIndex);
        button.classList.remove("btn-additives-active");
      } else {
        selectedAdditives.add(additiveIndex);
        button.classList.add("btn-additives-active");
      }

      updateTotalPrice();
    });
  });

  updateTotalPrice();
}

function closeModal() {
  const scrollPosition = parseInt(document.body.style.top, 10);
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();

    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
  }
}

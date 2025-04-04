function handleHeaderNav() {
  // select element
  const ulList = document.querySelector(".main_header .ul_list");
  const toggleButton = document.querySelector(".main_header .toggle_button");

  // make array from sections
  const sections = Array.from(document.querySelectorAll(".main_main .section"));

  function createNavLinks() {
    // create nav links depends on number of sections
    for (let i = 0; i < sections.length; i++) {
      // create li element, add class
      const li = document.createElement("li");
      li.classList.add("list_item");

      // create a element, add class, add section id to its href, add section data-title to its content
      const a = document.createElement("a");
      a.classList.add("item");
      a.href = `#${sections[i].id}`;
      a.innerHTML = sections[i].getAttribute("data-title");

      // append elements
      li.appendChild(a);
      ulList.appendChild(li);
    }
  }; createNavLinks();

  function toggleMenu() {
    // add event click on toggleButton => add and remove class active from ulList on 991px screens
    toggleButton.addEventListener("click", e => {
      // when clicking on button ignore his child element (icon i), as one element, for => clickDocument();
      e.stopPropagation();
      ulList.classList.toggle("active_ul_list");
    })
  }; toggleMenu();

  function clickDocument() {
    // add event click on all elements
    document.addEventListener("click", e => {
      // if clicked element is not toggleButton(with his child => e.stopPropagation();) and ulList
      if (e.target !== toggleButton && e.target !== ulList) {
        // if ulList has active_ul_list class remove it
        if (ulList.classList.contains("active_ul_list")) {
          ulList.classList.remove("active_ul_list");
        }
      }
    })
  }; clickDocument();
  
}; handleHeaderNav();


// == start changeBg == //
// select elements
const bgImg = document.querySelector(".dynamic_bg_img .bg_img");
// make array from images url
let imgsUrl = [
                "bg-img1.webp",
                "bg-img2.webp",
                "bg-img3.jpg",
                "bg-img4.jpg",
                "bg-img5.jpg",
                "bg-img6.jpg",
                "bg-img7.jpg",
                "bg-img8.jpg",
                "bg-img9.jpg",
                "bg-img10.jpg"
              ];

// onload start with random image
window.addEventListener("load", _ => {
  change();
});

// make random number from 0 to last index, change src of img
function change() {
  let index = Math.floor(Math.random() * imgsUrl.length);
  bgImg.src = `static/image/${imgsUrl[index]}`;
};

// set interval and clear interval
let bgInterval;

// run change() every 5 seconds
function bgTimer() {
  bgInterval = setInterval(() => {
    change();
  }, 5000);
};
// == end changeBg == //


function handleSettings() {
  // ===== start handle settings button ===== //
  // select elements
  const mainAside = document.querySelector(".main_aside");
  const settingsButton = document.querySelector(".main_aside .settings_button");
  const settingsIcon = document.querySelector(".main_aside .settings_icon");

  // start and end spin the icon, open and close aside from settings button
  function toggleButton() {
    settingsIcon.classList.toggle("fa-spin");
    mainAside.classList.toggle("main_aside_active");
  };

  // add click event to settings button
  settingsButton.addEventListener("click", toggleButton);
  // ===== end handle settings button ===== //

  // ===== start handle settings color ===== //
  // select elements
  const settingsClrItem = Array.from(document.querySelectorAll(".settings_clr .clr_item .item"));

  // add click event on each item, run remove function, add class active on clicked item, add color of clicked target in root and storage
  settingsClrItem.forEach(item => {
    item.addEventListener("click", e => {
      removeActive();
      e.target.classList.add("item_active");
      document.documentElement.style.setProperty("--main-clr", e.target.getAttribute("data-color"));
      localStorage.setItem("color", e.target.getAttribute("data-color"));
    });
  });

  // on load, if item exist in storage, run remove function, add class active on activated item, add color of storage in root
  window.addEventListener("load", _ => {
    if (localStorage.getItem("color")) {
      removeActive();
      settingsClrItem.forEach(item => {
        if (item.getAttribute("data-color") === localStorage.getItem("color")) {
          item.classList.add("item_active");
        }
      });
      document.documentElement.style.setProperty("--main-clr", localStorage.getItem("color"));
    }
  });

  // remove class active from each item
  function removeActive() {
    settingsClrItem.forEach(item => {
      item.classList.remove("item_active");
    })
  };
  // ===== end handle settings color ===== //

  // ===== start handle settings img ===== //
  // select element
  const imgCheck = document.querySelector(".settings_img .img_check");
  // select value of checked [true, false]
  let checkImg;
  
  // add event when click on the checkbox
  imgCheck.addEventListener("input", _ => {
    // select the new value of checked after click
    checkImg = imgCheck.checked;
    // if true => run bgTimer function, add the new value in the storage | if false => stop bgTimer, add the new value in the storage
    if (checkImg === true) {
      bgTimer();
      localStorage.setItem("changeBackground", checkImg);
    } else {
      clearInterval(bgInterval);
      localStorage.setItem("changeBackground", checkImg);
    }
  });

  // on load check if there is item with this name and put it in checkImg's value | if not => change checkImg's value to true
  window.addEventListener("load", _ => {
    if (localStorage.getItem("changeBackground")) {
      checkImg = localStorage.getItem("changeBackground");
    } else {
      checkImg = true;
    }
    // if true => run bgTimer function, change checkbox value to checked | if false => stop bgTimer, change checkbox value to not checked
    if (checkImg === "true" || checkImg === true) {
      bgTimer();
      imgCheck.checked = true;
    } else {
      clearInterval(bgInterval);
      imgCheck.checked = false;
    }
  });
  // ===== end handle settings img ===== //

  // ===== start handle settings bullets ===== //
  // select elements
  const bulletsCheck = document.querySelector(".settings_bullets .bullets_check");
  const bulletsAside = document.querySelector(".bullets_aside");

  // select value of checked [true, false]
  let checkBullets;

  // add event when click on the checkbox
  bulletsCheck.addEventListener("input", _ => {
    // select the new value of checked after click
    checkBullets = bulletsCheck.checked;
    // if true => active bulletsAside, add value in localstorage | if not => unactive bulletsAside, add value in localstorage
    if (checkBullets === true) {
      bulletsAside.classList.add("active_bullets_aside");
      localStorage.setItem("dispaySideNav", checkBullets);
    } else {
      bulletsAside.classList.remove("active_bullets_aside");
      localStorage.setItem("dispaySideNav", checkBullets);
    }
  })

  // on load check if there is item with this name, put it in checkBullets's value | if false => change checkBullets's value to true
  window.addEventListener("load", _ => {
    if (localStorage.getItem("dispaySideNav")) {
      checkBullets = localStorage.getItem("dispaySideNav");
    } else {
      checkBullets = true;
    }

    // if true => active bulletsAside, change checkbox value to checked | if false => unactive bulletsAside, change checkbox value to not checked
    if (checkBullets === "true" || checkBullets === true) {
      bulletsAside.classList.add("active_bullets_aside");
      bulletsCheck.checked = true;
    } else {
      bulletsAside.classList.remove("active_bullets_aside");
      bulletsCheck.checked = false;
    }
  })
  // ===== end handle settings bullets ===== //

  // ===== start handle settings reset ===== //
  const settingsReset = document.querySelector(".reset_box .settings_reset");

  settingsReset.addEventListener("click", _ => {
    if (localStorage.length !== 0) {
      localStorage.clear();
      location.reload();
    }
  })
  // ===== end handle settings reset ===== //
}; handleSettings();


function handleBulletsAside() {
  // select elements
  const bulletsContainer = document.querySelector(".bullets_aside .bullets_container");

  // make array from sections
  const importantSections = Array.from(document.querySelectorAll(".main_main .important_section"));
  
  function createBullets() {
    for (let i = 0; i < importantSections.length; i++) {
      // create button and add attr
      const button = document.createElement("button");
      button.classList.add("bullet_button");

      // create div and add attr and content
      const div = document.createElement("div");
      div.classList.add("tooltip");
      div.innerHTML = `${importantSections[i].getAttribute("data-title")}`;

      // appand elements
      button.appendChild(div);
      bulletsContainer.appendChild(button);
    }
  }; createBullets();

  // make array from bullets
  const bulletButtons = Array.from(document.querySelectorAll(".bullet_button"));

  function activeBullets() {
    // on scroll for each section 
    window.addEventListener("scroll", _ => {
      for (let i = 0; i < importantSections.length; i++) {
        // get location of each section
        let sectionLocation = importantSections[i].getBoundingClientRect();
        
        // if the deff is 30px between (top and bottom) for top of window 
        if (sectionLocation.top <= 50 && sectionLocation.bottom >= 50) {
          // remove class active from all bullets
          bulletButtons.forEach(bullet => {
            bullet.classList.remove("active_bullet_button");
          });

          // add class active for the current one
          bulletButtons[i].classList.add("active_bullet_button");
        } else {
          // remove class active from bullet if out of range of all section
          bulletButtons[i].classList.remove("active_bullet_button");
        }
      }
    })
  }; activeBullets();

  function clickBullets() {
    for (let i = 0; i < bulletButtons.length; i++) {
      // add onclick event on each bullet
      bulletButtons[i].addEventListener("click", e => {
        // geting clicked bullet index numb in its array
        if (e.target === bulletButtons[i]) {
          // make smooth scroll to the same index numb in sections array
          importantSections[i].scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    };
  }; clickBullets();

}; handleBulletsAside();


function paragWrite() {
  // select element, text, making array from text
  const welcParag = document.querySelector(".welcome .welc_parag"),
        wordsParag = "orem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, aliquid cum corporis minima assumenda suscipit incidunt perspiciatis placeat optio illum",
        wordsArray = wordsParag.split("");
  
  let index = 0;

  // if index = length of array clean values if not keep writing
  function write() {
    if (index === wordsArray.length) {
      welcParag.innerHTML = "L";
      index = 0;
    } else {
      welcParag.innerHTML += wordsArray[index];
      index++;
    }
  };

  // onload start repeating write function every 150 mil.sec.
  window.addEventListener("load", _ => {
    setInterval(() => {
      write();
    }, 150);
  });

}; paragWrite();


function ourSkillsSection() {
  // select elements, making array
  const ourSkills = document.querySelector(".our_skills");
  const percentages = Array.from(document.querySelectorAll(".our_skills .percentage"));

  // on scroll the window
  window.addEventListener("scroll", _ => {
    // get location of our skills section
    let ourSkillsLocation = ourSkills.getBoundingClientRect();
    // if deff between section.top and window.top is 350px or less => add class active for every percentage, if not => remove
    if (ourSkillsLocation.top <= 350) {
      percentages.forEach(percentage => {
        percentage.classList.add("percentage_active");
      })
    } else {
      percentages.forEach(percentage => {
        percentage.classList.remove("percentage_active");
      })
    }
  })
  
}; ourSkillsSection();


function ourGallerySection() {
  // select elements
  const galleryImgs = Array.from(document.querySelectorAll(".gallery .gallery_img"));
  const popupGalleryBox = document.querySelector(".popup_gallery_box");
  const popupButton = document.querySelector(".popup_gallery_box .popup_button");
  const popupImg = document.querySelector(".popup_gallery_box .popup_img");

  // add click event on each img => put target src img in popup src img, active popup box
  galleryImgs.forEach(img => {
    img.addEventListener("click", e => {
      popupImg.src = e.target.src;
      popupGalleryBox.classList.add("popup_gallery_box_active");
    })
  });
  
  // add click event on popup Xbtn => unactive popup box, empty popup src img
  popupButton.addEventListener("click", _ => {
    popupGalleryBox.classList.remove("popup_gallery_box_active");
    popupImg.src = "";
  });
}; ourGallerySection();

let icon = document.querySelector(".icon");
let ul = document.querySelector(".nev_list");

icon.addEventListener("click", ()=>{
    ul.classList.toggle("showData");

    if(ul.classList.contains("showData")){
        document.getElementById("bar").className="fa-regular fa-circle-xmark";

        showVisitorOnMenuOpen();

    }else{
        document.getElementById("bar").className="fa-solid fa-list";
    }
})


// ===== FIGMA IMAGE INTERACTION =====

document.querySelectorAll(".gallery-item").forEach(item => {
  const img = item.querySelector("img");

  item.addEventListener("mousemove", e => {
    const r = item.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const moveX = (x / r.width - 0.5) * 20;
    const moveY = (y / r.height - 0.5) * 20;

    img.style.transform =
      `scale(1.18) translate(${moveX}px, ${moveY}px)`;
  });

  item.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});


// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  reveals.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add("fade-up", "show");
    }
  });
});


// 📱 Mobile touch move (Gallery)
document.querySelectorAll(".gallery-item").forEach(item => {
  const img = item.querySelector("img");

  item.addEventListener("touchstart", () => {
    img.style.transform = "scale(1.08)";
  });

  item.addEventListener("touchend", () => {
    img.style.transform = "scale(1)";
  });
});


const elements = document.querySelectorAll(".type");

let delay = 0;

elements.forEach((el) => {
  const text = el.getAttribute("data-text");
  el.textContent = "";
  el.classList.add("cursor");

  setTimeout(() => {
    typeText(el, text);
  }, delay);

  delay += text.length * 120 + 500;
});

function typeText(element, text) {
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;

    if (i === text.length) {
      clearInterval(interval);
      element.classList.remove("cursor");

      if (text === "Avinash & Yogita") {
        element.classList.add("glitter");
      }
    }
  }, 120);
}


// 🔹 Close menu when clicking any menu link
document.querySelectorAll(".nev_list a").forEach(link => {
  link.addEventListener("click", () => {
    ul.classList.remove("showData");
    document.getElementById("bar").className = "fa-solid fa-list";
  });
});



document.addEventListener("touchstart", (e) => {
  if (
    ul.classList.contains("showData") &&
    !ul.contains(e.target) &&
    !icon.contains(e.target)
  ) {
    ul.classList.remove("showData");
    document.getElementById("bar").className = "fa-solid fa-list";
  }
});



  // document.addEventListener("click", function () {
  //   const music = document.getElementById("bg-music");
  //   if (music.paused) {
  //     music.play();
  //   }
  // }, { once: true });


  document.addEventListener("touchstart", function () {
    const music = document.getElementById("bg-music");
    music.muted = false;
    music.play();
  }, { once: true });

  document.addEventListener("click", function () {
    const music = document.getElementById("bg-music");
    music.muted = false;
    music.play();
  }, { once: true });



 
  
/* ===== VISITOR COUNT (ONLY FOR YOU) ===== */

const OWNER_MODE = true; // false kar dogi to kisi ko bhi nahi dikhega
const NAMESPACE = "pratima08-invitation-card";
const KEY = "visitors";

function shouldCountVisit() {
  if (sessionStorage.getItem("visited")) return false;
  sessionStorage.setItem("visited", "yes");
  return true;
}

async function updateVisitorCount() {
  const url = shouldCountVisit()
    ? `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`
    : `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  document.getElementById("visitorCount").innerText = data.value;
}

function showVisitorOnMenuOpen() {
  if (OWNER_MODE) {
    document.getElementById("admin-visitor-box").style.display = "block";
    updateVisitorCount();
  }
}

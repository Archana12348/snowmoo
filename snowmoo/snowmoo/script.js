// Toggle mobile menu (if exists)
const mobileMenu = document.getElementById("mobile-menu");
if (mobileMenu) {
  const menu = document.getElementById("navbar").querySelector("ul");
  mobileMenu.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

// Load the external section
fetch("app-showcase.html")
  .then((res) => {
    if (!res.ok) throw new Error("Could not load app-showcase.html");
    return res.text();
  })
  .then((html) => {
    document.getElementById("app-showcase").innerHTML = html;
  })
  .catch((err) => {
    console.error("Error loading app-showcase:", err);
    // For debugging show message on page
    document.getElementById("app-showcase").innerText =
      "Section failed to load. Run a local server and check console.";
  });

// Add a small hover animation or reveal effect if desired
document.addEventListener("DOMContentLoaded", () => {
  const phone = document.querySelector(".phone");
  phone.style.transition = "transform 1s ease";
  phone.style.transform = "rotate(15deg) translateY(0)";
});

/* ============================================
   VIEW ALL SERVICES BUTTON
   ============================================ */

const viewAllBtn = document.querySelector(".view-all-btn");
viewAllBtn.addEventListener("click", () => {
  alert("View all services feature coming soon!");
});

/* ============================================
   COUNTER ANIMATION - About Section Numbers
   ============================================ */

function animateCounters() {
  const counters = document.querySelectorAll(".feature-number");
  const duration = 2000; // 2 seconds
  const values = [];

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/[^0-9]/g, ""));
    values.push({ counter, target });
  });

  const startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    values.forEach(({ counter, target }) => {
      const current = Math.floor(target * progress);
      const suffix = counter.textContent.replace(/[0-9]/g, "");
      counter.textContent = current + suffix;
    });

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

// Optional JS: Smooth scroll to top when footer clicked (example)
document
  .querySelector(".footer-bottom")
  .addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
const slider = document.getElementById("sliderContainer");
const dotsContainer = document.getElementById("dotsContainer");
const slides = document.querySelectorAll(".testimonial-card");
let index = 0;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide();
}

function goToSlide(i) {
  index = i;
  showSlide();
}

// Auto-slide every 4 seconds
setInterval(nextSlide, 4000);

// form
// document.addEventListener("DOMContentLoaded", () => {
//   const openFormBtn = document.getElementById("openForm");
//   const popup = document.getElementById("popupForm");
//   const closePopup = document.getElementById("closePopup");
//   const formContainer = document.getElementById("formContainer");

//   openFormBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     popup.classList.add("active");

//     // Load external form.html content
//     fetch("form.html")
//       .then((res) => res.text())
//       .then((data) => {
//         formContainer.innerHTML = data;
//         initMultiStepForm(); // Initialize form JS once loaded
//       });
//   });

//   closePopup.addEventListener("click", () => {
//     popup.classList.remove("active");
//   });

//   window.addEventListener("click", (e) => {
//     if (e.target === popup) popup.classList.remove("active");
//   });
// });

// // Multi-step form logic (called after form loads)
// function initMultiStepForm() {
//   const steps = document.querySelectorAll(".form-step");
//   const nextBtns = document.querySelectorAll(".next-btn");
//   const prevBtns = document.querySelectorAll(".prev-btn");
//   let currentStep = 0;

//   steps[currentStep].classList.add("active");

//   nextBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       steps[currentStep].classList.remove("active");
//       currentStep++;
//       steps[currentStep].classList.add("active");
//     });
//   });

//   prevBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       steps[currentStep].classList.remove("active");
//       currentStep--;
//       steps[currentStep].classList.add("active");
//     });
//   });
// }
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");
  const popup = document.getElementById("popupForm");
  const closePopup = document.getElementById("closePopup");
  const formContainer = document.getElementById("formContainer");

  // Open popup when service clicked
  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      const serviceName = card.dataset.service;
      popup.classList.add("active");

      fetch("form.html")
        .then((res) => res.text())
        .then((html) => {
          formContainer.innerHTML = html;
          initMultiStepForm(serviceName);
        });
    });
  });

  // Close popup
  closePopup.addEventListener("click", () => popup.classList.remove("active"));
  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("active");
  });
});

// Multi-step form
function initMultiStepForm(serviceName) {
  const steps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const serviceField = document.getElementById("selectedService");

  if (serviceField) serviceField.value = serviceName;

  let currentStep = 0;
  steps[currentStep].classList.add("active");

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep++;
      steps[currentStep].classList.add("active");
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep--;
      steps[currentStep].classList.add("active");
    });
  });
}

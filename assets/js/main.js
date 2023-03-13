// ====== scroll top js
function scrollTo(element, to = 0, duration = 500) {
  const start = element.scrollTop;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;

    const val = Math.easeInOutQuad(currentTime, start, change, duration);

    element.scrollTop = val;

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
}

function setup() {
  const navbarHeight = document.getElementById("navbar").offsetHeight;
  document.getElementById("home").style["padding-top"] = `${navbarHeight}px`;
}

function setupOnScroll() {
  const pageLink = document.querySelectorAll(".ud-menu-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  // section menu active
  function onScroll(event) {
    const sections = document.querySelectorAll(".ud-menu-scroll");
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;

      if ( val === "#contact" && ( document.body.scrollHeight ===  window.scrollY + window.innerHeight  ) ) {
        sections.forEach((sec) => {
          sec.classList.add("text-white");
          sec.classList.remove("text-primary", "underline");
        });

        currLink.classList.add("text-primary", "underline");
        currLink.classList.remove("text-white");
      } else if (refElement.offsetTop <= scrollTopMinus && refElement.offsetTop + refElement.offsetHeight > scrollTopMinus ) {
        document.querySelector(".ud-menu-scroll").classList.remove("text-primary");

        currLink.classList.add("text-primary", "underline");
        currLink.classList.remove("text-white");
      } else {
        currLink.classList.add("text-white");
        currLink.classList.remove("text-primary", "underline");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);
  onScroll();
}

function setupParticles() {
  const particles = navigator.userAgent.toLocaleLowerCase().includes("mobile") ? 40 : 100;
  const particlesDensity = 300;
  particlesJS("particles-js", { "particles": { "number": { "value": particles, "density": { "enable": true, "value_area": particlesDensity } }, "color": { "value": "#000000" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#000000", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
}

function setupContactForm() {
  var btn = document.getElementById("btn");
  var btnTextSend = document.getElementById("btnTextSend");
  var btnTextDone = document.getElementById("btnTextDone");

  function disableFormElements(formObject, disabled) {
    var inputs = formObject.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = disabled;
    }
    var selects = formObject.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = disabled;
    }
    var textareas = formObject.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
      textareas[i].disabled = disabled;
    }
    var buttons = formObject.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = disabled;
    }
  }

  document.getElementById("contactForm").onsubmit = (evt) => {
    evt.preventDefault();

    disableFormElements(document.getElementById("contactForm"), true);

    btnTextSend.classList.add("opacity-0");
    btnTextDone.classList.remove("opacity-0");
    btn.classList.add("loading");

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const url = "https://landing-contact-email.logoscode.com.mx/send"

    let xhr = new XMLHttpRequest();
    let postObj = JSON.stringify({
      name: document.getElementById("fullName").value || "",
      email: document.getElementById("email").value || "",
      cellphone: document.getElementById("phone").value || "",
      message: document.getElementById("message").value || ""
    });

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://www.logoscode.com.mx');
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, OPTIONS8');
    xhr.setRequestHeader('x-api-key', 'uyfjm8fJRw7tjS0ebcFPm7H9RcG0VgIh9nkgRzVa');
    xhr.onerror = function () {
      btn.classList.remove("loading");
      btn.classList.add("active");

      setTimeout(() => {
        btn.classList.remove("active");

        setTimeout(() => {
          btnTextSend.classList.remove("opacity-0");
          btnTextDone.classList.add("opacity-0");

          document.getElementById("contactForm").reset();
          disableFormElements(document.getElementById("contactForm"), false);
        }, 1000);
      }, 3000);
    }
    xhr.onload = function () {
      btn.classList.remove("loading");
      btn.classList.add("active");

      setTimeout(() => {
        btn.classList.remove("active");

        setTimeout(() => {
          btnTextSend.classList.remove("opacity-0");
          btnTextDone.classList.add("opacity-0");

          document.getElementById("contactForm").reset();
          disableFormElements(document.getElementById("contactForm"), false);
        }, 1000);
      }, 3000);
    }

    xhr.send(postObj);
  }
}

function setupTipewritterEffect() {
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = 'Software a medida para tu&nbsp;<span class="wrap text-primary">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; animation: blink-caret .75s step-end infinite; }";
    document.body.appendChild(css);
  };
}

(function () {
  "use strict";

  // ===== wow js
  new WOW().init();

  setup();
  setupOnScroll();
  setupParticles();
  setupContactForm();
  setupTipewritterEffect();

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("bg-black", "bg-opacity-70", "backdrop-blur")
    } else {
      ud_header.classList.remove("bg-black", "bg-opacity-70", "backdrop-blur");
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // ===== responsive navbar
  let navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
  });

  //===== close navbar-collapse when a  clicked
  document
    .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
    .forEach((e) =>
      e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("hidden");
      })
    );

  // ===== Sub-menu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });

  // ===== Faq accordion
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach((el) => {
    el.querySelector(".faq-btn").addEventListener("click", () => {
      el.querySelector(".icon").classList.toggle("rotate-180");
      el.querySelector(".faq-content").classList.toggle("hidden");
    });
  });

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };

  document.querySelector(".footer-back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };

  document.querySelector(".scroll-to-contact").onclick = (evt) => {
    scrollTo(document.documentElement, document.querySelector('#contact').offsetTop);
  };

  document.querySelector(".scroll-to-services").onclick = (evt) => {
    scrollTo(document.documentElement, document.querySelector('#services').offsetTop);
  };
})();

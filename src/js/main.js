import "@/scss/index.scss";

const links = document.querySelectorAll(".menu__link");
const buttonContact = document.querySelector(".request-info__button");
const closeContactForm = document.querySelector(".popup-contact-form .close");
const contactForm = document.querySelector(".popup-contact-form");

var HIDDEN_CLASS_NAME = "hidden";
var TARGET_CLASS_NAME = "target";
var SOURCE_CLASS_NAME = "source";

var targetIdToShow = 1;

function main() {
  var targets = getElements(TARGET_CLASS_NAME);
  var sources = getElements(SOURCE_CLASS_NAME);
  sources.forEach(function (sourceNode) {
    var sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME);
    sourceNode.addEventListener("click", function () {
      showTarget(targets, sourceNodeId);
    });
  });
  showTarget(targets, targetIdToShow);

  sources.forEach((item) =>
    item.addEventListener("click", () => {
      document
        ?.querySelector(".source_active")
        ?.classList?.remove("source_active");

      item.classList.add("source_active");
    })
  );
}

function getElements(type) {
  return [].slice
    .call(document.querySelectorAll("." + type))
    .sort(function (targetNode1, targetNode2) {
      var target1Num = extractId(targetNode1, TARGET_CLASS_NAME);
      var target2Num = extractId(targetNode2, TARGET_CLASS_NAME);
      return target1Num > target2Num;
    });
}

function extractId(targetNode, baseClass) {
  var currentClassIndex = targetNode.classList.length;

  while (currentClassIndex--) {
    var currentClass = targetNode.classList.item(currentClassIndex);
    var maybeIdNum = parseInt(currentClass.split("-")[1]);
    if (isNaN(maybeIdNum)) {
      continue;
    }
    var classStrinToValidate = baseClass + "-" + maybeIdNum;
    if (classStrinToValidate === currentClass) {
      return maybeIdNum;
    }
  }
}

function showTarget(targets, targetId) {
  targets.forEach(function (targetNode, targetIndex) {
    var currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME);

    if (currentTargetNodeId === targetId) {
      targetNode.classList.remove(HIDDEN_CLASS_NAME);
    } else {
      targetNode.classList.add(HIDDEN_CLASS_NAME);
    }
  });
}

main();

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const closeBtn = document.querySelector(".list-wrapper__close");

closeBtn.addEventListener("click", () => {
  const allActives = document.querySelectorAll(".list > .list-item.active");

  allActives.forEach((element) => element.classList.remove("active"));

  closeBtn.classList.add("inactive");
});

document.querySelectorAll(".list > .list-item").forEach((element) => {
  element.addEventListener("click", (event) => {
    if (!event.target.dataset.item) {
      return;
    }

    event.target.classList.toggle("active");

    const allActives = document.querySelectorAll(".list > .list-item.active");
    const currentItem = event.target.dataset.item;

    allActives.forEach((element) => {
      if (element.dataset.item === currentItem) {
        return;
      }

      element.classList.remove("active");
    });

    allActives.length
      ? closeBtn.classList.remove("inactive")
      : closeBtn.classList.add("inactive");
  });
});

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCountAnimation(entry.target, 0, entry.target.dataset.count, 1300);
    }
  });
}, options);

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      changeActiveLink(entry.target);
    }
  });
}, options);

const observer3 = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fillLine(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, options);

function startCountAnimation(elem, start, end, duration) {
  let obj = elem,
    current = start,
    range = end - start,
    increment = end > start ? (end >= 10000 ? 10000 : 1) : -1,
    step = Math.abs(Math.floor(duration / range)),
    timer = setInterval(() => {
      current += increment;
      obj.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
}

function changeActiveLink(elem) {
  const id = elem.id;

  if (id) {
    let currentLinkIndex = 0;

    let length = location.href.length + 1;

    links.forEach((link, index) => {
      if (link.href.slice(length) == id) {
        currentLinkIndex = index;
      }
    });

    document
      .querySelector(".menu__link_active")
      .classList.remove("menu__link_active");

    links[currentLinkIndex].classList.add("menu__link_active");
  } else {
    document
      .querySelector(".menu__link_active")
      .classList.remove("menu__link_active");

    links[0].classList.add("menu__link_active");
  }
}

function fillLine(elem) {
  elem.style.animationPlayState = "running";
}

function toggleForm() {
  contactForm.classList.toggle("show");
  document.body.classList.toggle("overlay");
}

const lines = document.querySelectorAll(".advantages__line");

lines.forEach((line) => observer3.observe(line));

const sections = document.querySelectorAll("section");

sections.forEach((section) => observer2.observe(section));

const counts = document.querySelectorAll(".count");

counts.forEach((count) => observer.observe(count));

buttonContact.addEventListener("click", toggleForm);
closeContactForm.addEventListener("click", toggleForm);

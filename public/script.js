const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const delay = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

function prepareTypedText() {
  if (reducedMotion.matches) return;
  document.querySelectorAll(".typed-text").forEach((element) => {
    const output = element.querySelector(".typed-output");
    if (output) output.textContent = "";
  });
}

async function typeText(element, speed = 82) {
  if (!element) return;

  const output = element.querySelector(".typed-output");
  if (!output) return;

  const text = element.dataset.typeText || output.textContent || "";
  if (reducedMotion.matches) {
    output.textContent = text;
    return;
  }

  output.textContent = "";
  output.classList.add("is-typing");

  for (const character of text) {
    output.textContent += character;
    await delay(character === " " ? speed * 0.45 : speed);
  }

  output.classList.remove("is-typing");
}

function revealLogoDot() {
  const penPath = document.querySelector(".logo-pen-path");
  const dot = document.querySelector(".brand-script-dot");
  const subtitle = document.querySelector(".brand-subtitle .typed-text");

  if (reducedMotion.matches) {
    dot?.classList.add("is-visible");
    return Promise.resolve(typeText(subtitle));
  }

  return new Promise((resolve) => {
    let completed = false;

    const finish = async () => {
      if (completed) return;
      completed = true;
      dot?.classList.add("is-visible");
      await delay(180);
      await typeText(subtitle, 88);
      resolve();
    };

    const fallback = window.setTimeout(finish, 2393);
    penPath?.addEventListener(
      "animationend",
      () => {
        window.clearTimeout(fallback);
        finish();
      },
      { once: true },
    );
  });
}

async function typeContactDetails() {
  const lines = document.querySelectorAll(".contact-details .typed-text");

  for (const line of lines) {
    await typeText(line, 68);
    await delay(95);
  }
}

function observeOnce(element, callback, options) {
  if (!element) return;
  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    callback();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    callback();
  }, options);

  observer.observe(element);
}

const contactDetails = document.querySelector(".contact-details");
const comingSoon = document.querySelector(".coming-soon");
const comingSoonText = comingSoon?.querySelector(".typed-text");
let contactTyping = null;

function ensureContactTyping() {
  if (!contactTyping) contactTyping = typeContactDetails();
  return contactTyping;
}

prepareTypedText();
revealLogoDot();

observeOnce(
  contactDetails,
  () => {
    ensureContactTyping();
  },
  { threshold: 0.45 },
);

observeOnce(
  comingSoon,
  async () => {
    await ensureContactTyping();
    await delay(180);
    await typeText(comingSoonText, 105);
  },
  { threshold: 0.65 },
);

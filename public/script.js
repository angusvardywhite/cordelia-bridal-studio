const fallbackContent = {
  hero_heading: "Made for the woman, not the moment.",
  hero_text:
    "An intimate bridal studio for dresses with presence, instinct and a point of view.",
  gallery_heading: "The dresses,\nas they arrive.",
  gallery_text:
    "A growing edit of silhouettes, details and one-of-one pieces from the studio.",
  contact_heading: "Begin your fitting.",
  contact_text: "Tell us a little about you, your date, and the dress you have not found yet.",
  dresses: Array.from({ length: 8 }, (_, index) => ({
    image: "",
    alt: "",
    name: `No. ${String(index + 1).padStart(2, "0")}`,
    caption: "Reserved for the gallery",
  })),
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && typeof value === "string") element.textContent = value;
}

function renderDresses(dresses) {
  const gallery = document.getElementById("dress-gallery");
  if (!gallery) return;
  gallery.replaceChildren();

  dresses.forEach((dress, index) => {
    const figure = document.createElement("figure");
    figure.className = "dress-card content-reveal";

    const imageFrame = document.createElement("div");
    imageFrame.className = "dress-image";

    if (dress.image) {
      const image = document.createElement("img");
      image.src = dress.image;
      image.alt = dress.alt || `${dress.name || "Cordelia dress"} by Cordelia Bridal Studio`;
      image.loading = index < 2 ? "eager" : "lazy";
      image.decoding = "async";
      imageFrame.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "dress-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = String(index + 1).padStart(2, "0");
      imageFrame.append(placeholder);
    }

    const caption = document.createElement("figcaption");
    caption.className = "dress-caption";
    const title = document.createElement("h3");
    title.textContent = dress.name || `No. ${String(index + 1).padStart(2, "0")}`;
    const description = document.createElement("p");
    description.textContent = dress.caption || "Cordelia Bridal Studio";
    caption.append(title, description);
    figure.append(imageFrame, caption);
    gallery.append(figure);
  });
}

function applyContent(content) {
  setText("hero-heading", content.hero_heading);
  setText("hero-text", content.hero_text);
  setText("gallery-heading", content.gallery_heading);
  setText("gallery-text", content.gallery_text);
  setText("contact-heading", content.contact_heading);
  setText("contact-text", content.contact_text);
  renderDresses(Array.isArray(content.dresses) ? content.dresses : fallbackContent.dresses);
}

function observeReveals() {
  const items = document.querySelectorAll(".content-reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );
  items.forEach((item) => observer.observe(item));
}

async function loadContent() {
  try {
    const response = await fetch("/content/site.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    applyContent({ ...fallbackContent, ...(await response.json()) });
  } catch (error) {
    console.warn("Using the built-in site copy because CMS content could not be loaded.", error);
    applyContent(fallbackContent);
  }
  observeReveals();
}

document.getElementById("current-year").textContent = new Date().getFullYear();
loadContent();

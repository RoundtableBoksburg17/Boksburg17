/* ============================================================================
  RTB17 script.js
  - No arrays for Members
  - Members are edited case-by-case in HTML (super easy for non-coders)
  - JS just *reuses* the HTML you already wrote and shows it in the overlay
============================================================================ */

/* ===========
   Helpers
=========== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ===========
   Year
=========== */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===========
   Mobile menu
=========== */
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  $$("[data-open]", mobileMenu).forEach(btn => {
    btn.addEventListener("click", () => {
      mobileMenu.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===========
   Lightbox
=========== */
const lightbox = $("#lightbox");
const lbImg = $("#lbImg");
const lbCaption = $("#lbCaption");
const lbClose = $("#lbClose");

function openLightbox(src, alt = "") {
  if (!lightbox || !lbImg || !lbCaption) return;
  lbImg.src = src;
  lbImg.alt = alt;
  lbCaption.textContent = alt || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightbox || !lbImg || !lbCaption) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
  lbCaption.textContent = "";
}

if (lbClose) lbClose.addEventListener("click", closeLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* ===========
   Overlay panels
=========== */
const overlay = $("#overlay");
const panelTitle = $("#panelTitle");
const panelBody = $("#panelBody");
const closeBtn = $("#closeOverlay");

function openOverlay(title, html) {
  if (!overlay || !panelTitle || !panelBody) return;
  panelTitle.textContent = title;
  panelBody.innerHTML = html;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");

  // after content is injected, wire up any clickable images inside the panel
  bindPanelImageLightbox();
}

function closeOverlay() {
  if (!overlay || !panelBody) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  panelBody.innerHTML = "";

  // reset active crumb styling
  $$(".crumb").forEach(c => c.classList.remove("active"));
  $(`.crumb[data-open="home"]`)?.classList.add("active");
}

if (closeBtn) closeBtn.addEventListener("click", closeOverlay);

if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOverlay();
    closeLightbox();
  }
});

/* ===========
   Members (NO arrays, NO JS-generated cards)

   ✅ Where to edit member cards:
   - In index.html, inside:
     <div id="membersContent" style="display:none;"> ... </div>

   You can add/remove/reorder cards there by copy/paste.
=========== */
function getMembersHTML() {
  const el = $("#membersContent");
  if (!el) {
    return `
      <div class="section-box">
        <h4>Members</h4>
        <div class="li"><span>Members content is missing. Add a #membersContent block in index.html.</span></div>
      </div>
    `;
  }
  return el.innerHTML; // directly reuse the HTML you maintain
}

/* ===========
   Other sections (simple templates)
=========== */
function projectsHTML() {
  return `
    <div class="split">
      <div class="section-box">
        <h4>Upcoming Projects</h4>
        <div class="li">
          <strong>Project Name</strong>
          <span>Date: TBD • Location: TBD</span>
          <span>.</span>
        </div>
        <div class="li">
          <strong>Project Name</strong>
          <span>Date: TBD • Location: TBD</span>
          <span>.</span>
        </div>
      </div>

      <div class="section-box">
        <h4>Ongoing Projects</h4>
        <div class="li">
          <strong>Winter Knight blanket and food drive</strong>
          <span>Status:• Ongoing </span>•
          
          <span>every winter season boksburg 17 sets out to collect blankets,food and clothes for the less fortunate.</span>
        </div>
       
      </div>
    </div>
  `;
}

function contactHTML() {
  return `
    <div class="section-box">
      <h4>Contact Info</h4>

      <div class="li">
        <strong>Email</strong>
        <span><a href=	roundtableboksburg17@gmail.com" style="color: var(--gold2); text-decoration:none;">	roundtableboksburg17@gmail.com</a> </span>
      </div>

      <div class="li">
        <strong>Phone / WhatsApp</strong>
        <span> Frans Naumann : +27 73 314 9767</span>
      </div>

      <div class="li">
        <strong>Address</strong>
        <span>32 Lancaster Rd, Parkrand, Boksburg, 1459</span>
      </div>
    </div>
  `;
}

function socialHTML() {
  return `
    <div class="section-box">
      <h4>Social Media</h4>

      <div class="li">
        <strong></strong>
        <span><a href="https://www.facebook.com/boksburg17" style="color: var(--gold2); text-decoration:none;"> facebook </a></span>
      </div>

      <div class="li">
        <strong></strong>
        <span><a href="https://www.instagram.com/roundtableboksburg17/" style="color: var(--gold2); text-decoration:none;">instagram</a></span>
      </div>
    </div>
  `;
}

/* Reusable helper for gallery tiles (no arrays required, just call it repeatedly) */
function galleryThumb(src, caption) {
  return `
    <article class="card">
      <div class="card-img" style="height:180px;">
        <img class="gimg" src="${src}" alt="${caption}"
          onerror="this.remove(); this.parentElement.insertAdjacentHTML('beforeend','<div class=&quot;ph&quot;>Add image: ${src}</div>');" />
      </div>
      <div class="card-body">
        <h4>${caption}</h4>
        <p>Tap to enlarge.</p>
      </div>
    </article>
  `;
}

function galleryHTML() {
  // No array — just add/remove lines here if you want.
  return `
    <div class="section-box" style="margin-bottom:14px;">
      <h4>Gallery</h4>
      <div style="color:rgba(245,245,245,.72); font-size:14px;">Click any image to view it bigger.</div>
    </div>

    <div class="grid">
      ${galleryThumb("images/hooters photo.jpeg", "social before barnyard project")}
      ${galleryThumb("images/Meeting with maritius.jpeg", "business meeting joined by a tabler from mauritius")}
      ${galleryThumb("images/agm casino.jpeg", "2025 area AGM hosted by silverstar casino")}
      ${galleryThumb("images/bokkie park market.jpeg", "food stall project at local crafters market")}
      ${galleryThumb("images/museum.jpeg", "Gauteng Area museum curated by boksburg 17")}
      ${galleryThumb("images/ARTSA.jpeg", "2 members acting as delegates at RTSA AGM 2025")}
    </div>
  `;
}

function aboutHTML() {
  return `
    <div class="section-box">
      <h4>About Round Table Boksburg 17</h4>

      <div style="color:rgba(245,245,245,.75); line-height:1.65; font-size:14.5px;">
        <p>Round Table Boksburg 17 is a community upliftment and chairty organisation for men from the ages of 18 - 40 , first chartered in 1953 as apart of Round table Gauteng area and Round table southern africa.For over 70 years the members of round table boksburg 17 have dedicated themselves to the uppliftment of their community while cultivating an enviroment for proffesional and social growth  .</p>
        
      </div>

      
      <div class="li"><strong>How to Join</strong><span>Any man between the ages of 18 and 40 is welcome to join us at one of our monthly business meetings hosted every month on the second tuesday of the month to find out more about table and possibly look into becoming an official member.</span></div>
      <div class="li"><strong>How to Support</strong><span>keep an eye out on our socials for upcomming projects or inititaves or contact one of our members to find out more .</span></div>
    </div>
  `;
}

/* ===========
   Wire up images inside overlay to open in lightbox
=========== */
function bindPanelImageLightbox() {
  if (!panelBody) return;

  // Any image you want clickable in overlays: add class="gimg"
  $$(".gimg", panelBody).forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  // Also make member images clickable if you want:
  // add class="mimg" to member <img> tags in #membersContent
  $$(".mimg", panelBody).forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
}

/* ===========
   Navigation open handler
=========== */
function handleOpen(section) {
  if (section === "home") {
    closeOverlay();
    return;
  }

  // set active crumb styling
  $$(".crumb").forEach(c => c.classList.remove("active"));
  $(`.crumb[data-open="${section}"]`)?.classList.add("active");

  // Open the correct overlay
  if (section === "members") return openOverlay("Members", getMembersHTML());
  if (section === "projects") return openOverlay("Projects", projectsHTML());
  if (section === "contact") return openOverlay("Contact", contactHTML());
  if (section === "social") return openOverlay("Social Media", socialHTML());
  if (section === "gallery") return openOverlay("Gallery", galleryHTML());
  if (section === "about") return openOverlay("About", aboutHTML());

  // fallback
  openOverlay("Panel", `<div class="section-box"><div class="li"><span>Content coming soon.</span></div></div>`);
}

/* Attach click handlers to all buttons/links with data-open */
$$("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => handleOpen(btn.dataset.open));
});

/* ===========
   Carousel (scroll-snap) - aligned
=========== */
const viewport = $("#viewport");
const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
const dotsWrap = $("#dots");

let timer = null;
const AUTO_MS = 4200;

function tilesPerView() {
  return window.matchMedia("(max-width: 700px)").matches ? 1 : 3;
}

function pageCount() {
  if (!viewport) return 1;
  const tileCount = $$(".tile", viewport).length;
  return Math.max(1, Math.ceil(tileCount / tilesPerView()));
}

function currentPage() {
  if (!viewport) return 0;
  const w = viewport.clientWidth;
  return w ? Math.round(viewport.scrollLeft / w) : 0;
}

function setActiveDot(page) {
  if (!dotsWrap) return;
  $$(".dot-btn", dotsWrap).forEach((d, i) => d.classList.toggle("active", i === page));
}

function scrollToPage(p, smooth = true) {
  if (!viewport) return;
  const count = pageCount();
  const page = (p + count) % count;
  const left = page * viewport.clientWidth;
  viewport.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  setActiveDot(page);
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  const count = pageCount();

  for (let i = 0; i < count; i++) {
    const b = document.createElement("button");
    b.className = "dot-btn" + (i === 0 ? " active" : "");
    b.type = "button";
    b.setAttribute("aria-label", `Go to page ${i + 1}`);
    b.addEventListener("click", () => scrollToPage(i));
    dotsWrap.appendChild(b);
  }
}

function next() { scrollToPage(currentPage() + 1); }
function prev() { scrollToPage(currentPage() - 1); }

if (prevBtn) prevBtn.addEventListener("click", prev);
if (nextBtn) nextBtn.addEventListener("click", next);

function startAuto() {
  stopAuto();
  timer = setInterval(next, AUTO_MS);
}

function stopAuto() {
  if (timer) clearInterval(timer);
  timer = null;
}

if (viewport) {
  viewport.addEventListener("mouseenter", stopAuto);
  viewport.addEventListener("mouseleave", startAuto);

  viewport.addEventListener("scroll", () => setActiveDot(currentPage()), { passive: true });

  // click tiles to open lightbox
  $$(".tile", viewport).forEach(btn => {
    const img = $("img", btn);
    if (!img) return;
    btn.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
}

window.addEventListener("resize", () => {
  buildDots();
  scrollToPage(currentPage(), false);
});

buildDots();
startAuto();



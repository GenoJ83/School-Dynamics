// CONFIG
const AGENCY_NAME = "School Dynamics";
const AGENCY_PHONE_E164 = "256414341010"; 
const AGENCY_EMAIL = "info@mta.co.ug";
const AGENCY_LOCATION = "Plot 20, Lumumba Avenue, Piato Building, Kampala";
const SCHOOL_DYNAMICS_URL = "https://schooldynamics.cloud/";

const UTM_SOURCE = "schooldynamics";
const UTM_MEDIUM = "landingpage";
const UTM_CAMPAIGN = "product_leads";

const WHATSAPP_RECEIVER_E164 = AGENCY_PHONE_E164;

// UTILS
function withUtm(url, campaign = UTM_CAMPAIGN) {
  const hasQ = url.includes("?");
  const sep = hasQ ? "&" : "?";
  return `${url}${sep}utm_source=${encodeURIComponent(UTM_SOURCE)}&utm_medium=${encodeURIComponent(UTM_MEDIUM)}&utm_campaign=${encodeURIComponent(campaign)}`;
}

function waLink(message) {
  return `https://wa.me/${WHATSAPP_RECEIVER_E164}?text=${encodeURIComponent(message)}`;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.href = href;
}

// DOM INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  // Fill agency info
  setText("agencyNameTop", AGENCY_NAME);
  setText("agencyNameInline", AGENCY_NAME);
  setText("agencyNameBottom", AGENCY_NAME);
  setText("agencyNameBottom2", AGENCY_NAME);
  setText("agencyPhone", "+" + AGENCY_PHONE_E164);
  setText("agencyEmail", AGENCY_EMAIL);
  setText("agencyLocation", AGENCY_LOCATION);
  setText("year", new Date().getFullYear());

  // Wire links
  setHref("sdLearn", withUtm(SCHOOL_DYNAMICS_URL, "school_dynamics_leads"));
  setHref("sdOfficial", withUtm(SCHOOL_DYNAMICS_URL, "school_dynamics_leads"));

  // Default WhatsApp message
  const defaultMsg =
    `Hello ${AGENCY_NAME}, I’m interested in your products/services.\n` +
    `Product of interest: ____\nName: ____\nBusiness/School: ____\nPhone: ____\nLocation: ____\n` +
    `Please share details and next steps.`;
  setHref("btnWhatsApp", waLink(defaultMsg));

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.navlinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('span');
      if (icon) {
        icon.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('span');
        if (icon) icon.textContent = '☰';
      });
    });
  }

  // Form Handling
  const form = document.getElementById("leadForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const interest = document.getElementById("interest").value.trim();
      const name = document.getElementById("name").value.trim();
      const org = document.getElementById("org").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const loc = document.getElementById("location").value.trim();
      const msg = document.getElementById("message").value.trim();

      const waMsg =
        `Hello ${AGENCY_NAME}, I’m interested in your offer.\n\n` +
        `Product/Service: ${interest}\n` +
        `Name: ${name}\n` +
        `Business/School: ${org}\n` +
        `Phone: ${phone}\n` +
        `Location: ${loc}\n` +
        (msg ? `Message: ${msg}\n` : "") +
        `\nPlease share pricing/details and next steps.`;

      const link = waLink(waMsg);
      setHref("btnWhatsApp", link);

      if (status) {
        status.textContent = "Request captured. Click “Chat on WhatsApp” to send your details instantly.";
        status.style.color = "var(--secondary)";
      }
      
      // Open WhatsApp in new tab
      window.open(link, "_blank", "noopener");
    });
  }
});

// GLOBAL FUNCTIONS
window.selectProduct = function(productName) {
  const sel = document.getElementById("interest");
  if (sel) {
    const options = Array.from(sel.options);
    const match = options.find(o => o.text === productName);
    if (match) sel.value = productName;
  }
  location.hash = "#contact";
};

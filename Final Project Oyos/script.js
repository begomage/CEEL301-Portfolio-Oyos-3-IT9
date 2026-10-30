const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle instanceof HTMLButtonElement) {
  const themeLabel = themeToggle.querySelector(".theme-toggle-label");
  const themeIcon = themeToggle.querySelector(".theme-toggle-icon");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  const updateThemeButton = () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    const label = isDark ? "Light mode" : "Dark mode";
    const action = isDark ? "Switch to light mode" : "Switch to dark mode";

    themeToggle.setAttribute("aria-label", action);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.title = action;

    if (themeLabel instanceof HTMLElement) {
      themeLabel.textContent = label;
    }

    if (themeIcon instanceof HTMLElement) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (themeColor instanceof HTMLMetaElement) {
      themeColor.content = isDark ? "#372F2F" : "#c3bda8";
    }
  };

  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    updateThemeButton();

    try {
      window.localStorage.setItem("oyos-theme", nextTheme);
    } catch (error) {
      console.error("Unable to save the theme preference in local storage.", error);
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "oyos-theme" && (event.newValue === "light" || event.newValue === "dark")) {
      document.documentElement.dataset.theme = event.newValue;
      updateThemeButton();
    }
  });
}

if (menuButton instanceof HTMLButtonElement && navigation instanceof HTMLElement) {
  document.documentElement.classList.add("has-menu-script");

  const closeMenu = (returnFocus = false) => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    if (returnFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1320) {
      closeMenu();
    }
  });
}

const contactForm = document.querySelector(".contact-form");

if (contactForm instanceof HTMLFormElement) {
  const honeypot = contactForm.querySelector('input[name="_gotcha"]');
  const status = contactForm.querySelector(".contact-form-status");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (
      !(honeypot instanceof HTMLInputElement) ||
      !(status instanceof HTMLElement) ||
      !(submitButton instanceof HTMLButtonElement)
    ) {
      console.error("The contact form is missing a required element.");
      return;
    }

    if (honeypot.value) {
      status.textContent = "The message could not be submitted. Please contact me by email.";
      return;
    }

    const endpoint = new URL(contactForm.action);
    if (
      endpoint.hostname !== "formspree.io" ||
      !/^\/f\/[A-Za-z0-9]+$/.test(endpoint.pathname) ||
      endpoint.pathname.endsWith("/YOUR_FORM_ID")
    ) {
      status.textContent = "The contact form is not connected yet. Please email me directly.";
      return;
    }

    submitButton.disabled = true;
    status.textContent = "Sending your message…";

    try {
      const formData = new FormData(contactForm);
      formData.set("_subject", String(formData.get("subject")));
      formData.set("_replyto", String(formData.get("email")));
      const response = await fetch(endpoint.href, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        status.textContent = `Your message could not be sent (error ${response.status}). Please try again or email me directly.`;
        return;
      }

      contactForm.reset();
      status.textContent = "Thanks for your message. It has been sent.";
    } catch (error) {
      console.error("Unable to submit the contact form.", error);
      status.textContent = "We couldn't send your message. Please try again or email me directly.";
    } finally {
      submitButton.disabled = false;
    }
  });
}

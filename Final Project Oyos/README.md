# Oyos — Graphic Design Portfolio

## Project overview

A responsive, static portfolio website for presenting Oyos's graphic design
student work. The site includes a homepage with a concise introduction and
visual project selection, an About page template, a categorized Skills page,
and a Projects page with detailed cards for featured work.

### Audience

Potential employers, clients, classmates, and other visitors looking for a
quick introduction to the designer and their work.

### Homepage content

- A brief creator introduction and links to the work and overview.
- A dedicated CV page with Download CV and View CV Online links to the latest
  PDF in `assets/cv oyos last.pdf`.
- A project overview describing the portfolio's purpose.
- Three featured projects: Brew Haven, Midnight Overture, and a Devil May Cry
  typography poster.
- A homepage introduction for Lou Benedict E. Oyos with a professional title,
  biography, white-background profile photo, and project/CV/contact calls to
  action.
- An About page with basic information and an editable professional biography.
- A dedicated Education page with education and credentials from the current CV.
- A Contact page with email, phone, location, profile link availability, and a
  honeypot-protected Formspree form for direct email delivery.
- A Skills page with categorized graphic design, web development, and creative
  process skill cards.
- A Projects page with data-driven cards for featured artwork, project metadata,
  search, and category/type filters.
- An in-page project search and filtering system for project name, technology,
  category, year, and project type.
- A persistent footer with contact details, copyright, and quick navigation.
- Dedicated detail pages for Midnight Overture, Brew Haven, typography,
  Strawberry Study, and Portfolio Wireframe, with project overviews, details,
  and image galleries. Each page is
  stored under `projects/<project-name>/index.html`.
- Project listing cards are generated from structured records in
  `projects-data.js`; edit those records to update project details without
  rebuilding the page.
- Responsive keyboard-operable navigation, descriptive image alternatives,
  visible focus indicators, readable text, labeled forms, and reduced-motion
  support.
- Optional dark mode using the requested color palette, with the visitor's
  preference saved in browser local storage.

### Implementation

The site uses plain HTML, CSS, and JavaScript. It has no build step or
third-party runtime dependencies. Internal links point to the existing HTML
files, so pages can be opened locally from the workspace. On a host that
supports the Netlify `_redirects` file, those file paths redirect to clean
public URLs.
Project records are stored in `projects-data.js` and rendered by
`projects-render.js`. Each record includes an ID, name, category, project type,
description, year, technologies, primary project image, detail-page URL,
GitHub URL, role, features, status, and gallery images. Use an empty string
when no GitHub URL is available. Add or edit a project in that data file; no
database or page redesign is needed. Project images are organized in
`assets/midnight-overture/`, `assets/brewhaven/`, and `assets/typography/`.
The NieR:Automata-inspired menu background is included in this folder so the
page does not rely on files outside the project.

Clean routes such as `/about`, `/projects`, and `/projects/brew-haven` are
configured in the Netlify `_redirects` file. For local testing, use a static
server that supports those redirects. The site has not been deployed publicly;
select a hosting provider and domain before publishing.

The site's color palette is `#594E4A`, `#B0AB98`, `#C3BDA8`, `#B8B29D`, and
`#4B413D`. Dark palette shades are used for text on light surfaces; lighter
shades are used for copy on the dark overview band.
Dark mode uses `#AFA7A5`, `#847977`, `#5F5554`, `#544848`, and `#372F2F`.

The display name "Oyos" follows the project folder name. Update it, the
introduction, and project descriptions if different portfolio details should
be shown. The latest CV is included as `assets/cv oyos last.pdf`. LinkedIn and
other professional profile URLs have not been provided.

The Contact form is wired to Formspree, with a honeypot field and accessible
success/error feedback. Form submissions are handled by Formspree; this static
site does not store them.

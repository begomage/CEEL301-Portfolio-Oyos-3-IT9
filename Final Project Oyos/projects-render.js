const projectsList = document.querySelector(".projects-list");
const projectsData = window.oyosProjects;

if (!(projectsList instanceof HTMLElement) || !Array.isArray(projectsData)) {
  throw new Error("Project data or the project list container is unavailable.");
}

projectsList.replaceChildren();

const createTextElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  element.textContent = text;
  return element;
};

const populateProjectFilter = (selector, field) => {
  const filter = document.querySelector(selector);
  if (!(filter instanceof HTMLSelectElement)) {
    throw new Error(`Project filter ${selector} is unavailable.`);
  }

  const allOption = filter.querySelector('option[value=""]');
  if (!allOption) {
    throw new Error(`Project filter ${selector} is missing its default option.`);
  }

  const options = [...new Set(projectsData.map((project) => project[field]))]
    .sort((first, second) => first.localeCompare(second))
    .map((value) => {
      const option = createTextElement("option", "", value);
      option.value = value.toLocaleLowerCase();
      return option;
    });

  filter.replaceChildren(allOption.cloneNode(true), ...options);
};

populateProjectFilter("#project-category", "category");
populateProjectFilter("#project-type", "projectType");

const createMetadata = (project) => {
  const metadata = document.createElement("dl");
  metadata.className = "portfolio-meta";

  [
    ["Category", project.category],
    ["Project type", project.projectType],
    ["Technologies / tools", project.technologies.join(", ")],
    ["Project date", String(project.year)],
    ["Creator's role", project.role],
    ["Features", project.features.join(", ")],
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    item.append(
      createTextElement("dt", "", label),
      createTextElement("dd", "", value),
    );
    metadata.append(item);
  });

  return metadata;
};

const createProjectCard = (project, index) => {
  const card = document.createElement("article");
  card.className = "album-card";
  card.id = project.id;
  card.dataset.project = project.name;
  card.dataset.technology = project.technologies.join(" ");
  card.dataset.category = project.category.toLocaleLowerCase();
  card.dataset.year = String(project.year);
  card.dataset.type = project.projectType.toLocaleLowerCase();
  card.dataset.description = project.description;
  card.dataset.role = project.role;
  card.dataset.features = project.features.join(" ");
  card.dataset.status = project.status;

  const heading = document.createElement("div");
  heading.className = "album-heading";
  const headingContent = document.createElement("div");
  const projectName = document.createElement("h2");
  const nameParts = project.name.split(" ");
  projectName.append(document.createTextNode(`${nameParts.slice(0, -1).join(" ")}${nameParts.length > 1 ? " " : ""}`));
  if (nameParts.length > 1) {
    projectName.append(createTextElement("em", "", nameParts[nameParts.length - 1]));
  }
  headingContent.append(
    createTextElement("p", "eyebrow", `${String(index + 1).padStart(2, "0")} / ${project.projectType}`),
    projectName,
    createTextElement("p", "album-description", project.description),
  );
  heading.append(
    headingContent,
    createTextElement("span", "portfolio-status", project.status),
  );

  const gallery = document.createElement("div");
  gallery.className = "album-gallery";
  gallery.setAttribute("aria-label", `${project.name} project images`);

  project.images.forEach((image, imageIndex) => {
    const imageSrc = imageIndex === 0 ? project.projectImage : image.src;
    const link = document.createElement("a");
    link.className = "album-image";
    link.href = imageSrc;
    link.target = "_blank";
    link.rel = "noopener";

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = image.alt;
    img.loading = "lazy";
    link.append(img, createTextElement("span", "", image.label));
    gallery.append(link);
  });

  const links = document.createElement("div");
  links.className = "album-project-links";
  if (project.projectUrl) {
    const detailLink = document.createElement("a");
    detailLink.className = "text-link album-details-link";
    detailLink.href = project.projectUrl;
    detailLink.append(
      document.createTextNode("View project details "),
      createTextElement("span", "", "↗"),
    );
    detailLink.lastElementChild.setAttribute("aria-hidden", "true");
    links.append(detailLink);
  }
  if (project.githubUrl) {
    const githubLink = document.createElement("a");
    githubLink.className = "text-link album-details-link";
    githubLink.href = project.githubUrl;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.textContent = "View GitHub repository ↗";
    links.append(githubLink);
  }

  card.append(heading, createMetadata(project), gallery, links);
  return card;
};

projectsData.forEach((project, index) => {
  projectsList.append(createProjectCard(project, index));
});

const projectQuery = document.querySelector("#project-query");
const projectCategory = document.querySelector("#project-category");
const projectType = document.querySelector("#project-type");
const projectSearchCount = document.querySelector("#project-search-count");
const projectSearchEmpty = document.querySelector("#project-search-empty");
const projectCards = [...document.querySelectorAll(".album-card")];

if (
  projectQuery instanceof HTMLInputElement &&
  projectCategory instanceof HTMLSelectElement &&
  projectType instanceof HTMLSelectElement &&
  projectSearchCount instanceof HTMLElement &&
  projectSearchEmpty instanceof HTMLElement
) {
  const updateProjectResults = () => {
    const query = projectQuery.value.trim().toLocaleLowerCase();
    const queryTerms = query.split(/\s+/).filter(Boolean);
    const category = projectCategory.value;
    const type = projectType.value;
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const searchableText = [
        card.dataset.project,
        card.dataset.technology,
        card.dataset.category,
        card.dataset.year,
        card.dataset.type,
        card.dataset.description,
        card.dataset.role,
        card.dataset.features,
        card.dataset.status,
      ].join(" ").toLocaleLowerCase();
      const matchesQuery = queryTerms.every((term) => searchableText.includes(term));
      const matchesCategory = category === "" || card.dataset.category === category;
      const matchesType = type === "" || card.dataset.type === type;
      const isVisible = matchesQuery && matchesCategory && matchesType;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    projectSearchCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
    projectSearchEmpty.hidden = visibleCount > 0;
  };

  projectQuery.addEventListener("input", updateProjectResults);
  projectCategory.addEventListener("change", updateProjectResults);
  projectType.addEventListener("change", updateProjectResults);
  updateProjectResults();
}

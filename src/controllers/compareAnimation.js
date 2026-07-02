export function animateCompareReset() {
  const compareForm = document.getElementById("compare-form");
  if (!compareForm) return;

  compareForm.classList.add("compare-reset");
  setTimeout(() => {
    compareForm.classList.remove("compare-reset");
  }, 320);
}

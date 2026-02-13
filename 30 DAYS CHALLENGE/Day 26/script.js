function selectTab(index) {
  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".tab-item");
  tabs.forEach((tab) => tab.classList.remove("active"));

  // Hide all content panels
  const contents = document.querySelectorAll(".gateway-details");
  contents.forEach((content) => content.classList.remove("active"));

  // Activate clicked tab
  tabs[index - 1].classList.add("active");

  // Show corresponding content
  const contentToShow = document.getElementById("content-" + index);
  if (contentToShow) {
    contentToShow.classList.add("active");
  }
}

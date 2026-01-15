const internalLinks = [
  { text: "Basic Calculator", url: "/calculators/basic.html" }
];

document.querySelectorAll(".seo-longform").forEach(section => {
  internalLinks.forEach(link => {
    if (!section.innerHTML.includes(link.text)) {
      section.innerHTML += `<p><a href="${link.url}">${link.text}</a></p>`;
    }
  });
});

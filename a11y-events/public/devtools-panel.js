chrome.devtools.panels.create(
  "A11y Events", // Panel name
  "favicon.ico", // Icon
  "index.html", // Panel page
  () => {
    // Panel created successfully
    console.log("✅ A11y Events DevTools panel created successfully!");
  },
);

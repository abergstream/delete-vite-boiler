import { writeFile, unlink } from "fs/promises";

const AppFile = "src\\App.jsx";
const AppContent =
  "function App() {\n  (\n    <>\n    </>\n  )\n}\n\nexport default App";

const indexFile = "index.html";
const indexContent =
  '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>New Project</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n\n</html>';

const viteLogo = "public\\vite.svg";
const reactLogo = `src\\assets\\react.svg`;
const appCSS = `src\\App.css`;

const filesToRemove = [viteLogo, reactLogo, appCSS];
const filesToChange = [
  [indexFile, indexContent],
  [AppFile, AppContent],
];
filesToChange.forEach((file) => {
  const filename = file[0];
  const fileContent = file[1];
  overwriteFile(filename, fileContent);
});
filesToRemove.forEach((filename) => {
  deleteFile(filename);
});

function deleteFile(filename) {
  unlink(filename)
    .then(() => {
      console.log("Filename was removed");
    })
    .catch((error) => {
      console.error(`Error deleting file: ${error.message}`);
    });
}

function overwriteFile(filename, content) {
  writeFile(filename, content)
    .then(() => {
      console.log(`${filename} created successfully.`);
    })
    .catch((err) => {
      console.error("Error creating file:", err);
    });
}

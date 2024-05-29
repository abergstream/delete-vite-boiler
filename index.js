import { writeFile, unlink, access, constants } from "fs/promises";

// Files and contents to change
const AppFile = "src\\App.jsx";
const AppContent =
  "function App() {\n return (\n    <>\n    </>\n  )\n}\n\nexport default App";

const indexFile = "index.html";
const indexContent =
  '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>New Project</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n\n</html>';

// Adds them to an array to use with a loop
const filesToChange = [
  [indexFile, indexContent],
  [AppFile, AppContent],
];

// Files to delete
const viteLogo = "public\\vite.svg";
const reactLogo = `src\\assets\\react.svg`;
const appCSS = `src\\App.css`;

// Adds them to an array to use with a loop
const filesToRemove = [viteLogo, reactLogo, appCSS];

// Loops filesToChange and overwrites with their content
filesToChange.forEach((file) => {
  const filename = file[0];
  const fileContent = file[1];
  overwriteFile(filename, fileContent);
});

// Loops filesToRemove and delete the files
filesToRemove.forEach((filename) => {
  deleteFile(filename);
});

function deleteFile(filename) {
  unlink(filename)
    .then(() => {
      console.log(`${filename} was removed`);
    })
    .catch(() => {
      console.error(`Error deleting ${filename}`);
    });
}

function overwriteFile(filename, content) {
  access(filename, constants.F_OK)
    .then(() => {
      writeFile(filename, content)
        .then(() => {
          console.log(`${filename} was changed successfully.`);
        })
        .catch((err) => {
          console.error(`Error editing ${filename}`);
        });
    })
    .catch(() => {
      console.error(`${filename} doesn't exist`);
    });
}

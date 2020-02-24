const glob = require("glob");
const fs = require("fs");
const async = require("async");
const { resolve } = require('path');
const { readdir } = require('fs').promises;


const preScript = `
<!DOCTYPE html>
<html><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script> var exports = {}; </script>
    <link rel="stylesheet" id="colors" type="text/css" href="dist/colors.css">
    <link rel="stylesheet" id="fonts" type="text/css" href="dist/fonts.css">
    <link rel="stylesheet" id="style" type="text/css" href="dist/style.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="dist/game.js"></script>
    <script type="text/javascript" src="dist/english.js"></script>
    <script type="text/javascript" src="dist/lib.js"></script>
`;

const postScript = `
<script> 
window.addEventListener('load', (event) => {
    startGame();
});
</script>
<title>adv</title>
</head>


<body>

        <div id="PlayScreen">
            <div id="Page-header"></div>
            <div id="Display"></div>
            <div id="Next-Button"></div>
            <div id="Page-footer"></div>
        </div>

</body>
</html>
`;


function createIndexHtml(dir) {
    glob(dir + "**/*.js", "nonull", function (err, files) {
        if (!err && files) {
            var list = ``;
            files.map((name) => {
                list += `<script type="text/javascript" src="${name.slice(2, name.length)}"></script>\n`;
            });
            const indexText = preScript + list + postScript;
            fs.writeFileSync('./debug/index.html', indexText);
        } else {
            console.log(err);
        }
      });
}


async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        yield* getFiles(res);
      } else {
          if (res.indexOf(".js")) {
            yield res;
          }
      }
    }
}


function scanAllInFolder(dir, destination) {
    async.map(getFiles(dir), fs.readFile, (err, results) => {
        if (err)
            return reject(err);
        fs.writeFile(destination, results.join("\n"), (err) => {
            if (err)
                return reject(err);

            resolve();
        });
    });
}


createIndexHtml("./src/");
scanAllInFolder("./src/", "dist/index.js");

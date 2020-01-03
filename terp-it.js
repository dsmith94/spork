const fs = require("fs");
const async = require("async");
const path = require("path");
const { resolve } = require('path');
const { readdir } = require('fs').promises;

function buildFileList(directory, files) {
    var v = [];
    for (file of files) {
        if (file.indexOf(".js") > -1) {
            v.push(path.join(directory,file));
        }
    }
    return v;
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

function readAll(dir, destination) {
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

readAll("./lib/", "dist/lib.js");
readAll("./src/", "dist/index.js");

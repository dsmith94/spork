# spork

A character-driven IF engine for tablets and smartphones.

## Installation Guide

You will need to have installed:

* git
* nodejs and npm

### 1. Clone current repository to the folder of your choice

```console
git clone https://github.com/dsmith94/spork project-folder
```

This will create the project structure and necessary library files in a folder called project-folder.

### 2. Install node modules

```console
npm i
```

Npm will install [browsersync](https://www.browsersync.io/), and [uglify-es](https://github.com/mishoo/UglifyJS).

### 3. Build and test scripts

To build your fiction in progress, run

```console
npm run build
```

If you have Visual Studio Code installed, you can simply press Ctrl-Shift-B to run the build script. All the Javascript files in the src folder will be rolled into debug/index.js and dist/index.js.

The dist folder contains the core web app that will be your finished work, with index.html as the entry point for the browser.

To debug your work in progress, run

```console
npm run debug
```

Navigate your browser to localhost:3000 to see it in action. Of course, browsersync will normally open the browser for you automatically.


# Pixi examples guidelines: #

This is the new repository for the pixi examples.
In the previous one, each example was a JavaScript file, we moved away from this and it is now an HTML file that can be opened on its own.

The iframe that displays the examples is **800 * 600**, consequently please avoid creating a renderer that is larger than these dimensions.


## How to run the project ##

This micro-site is built using ES2015 and jspm, if you **have not** installed jspm already, please open your terminal where you folder is located and run:

```
npm run start
```
This will install jspm, all the dependencies and run a server from your folder.

If you are coming back to this project after having managed to successfully run it in the past, just run a server from your folder using your preferred method, or:
```
http-server
```

If you get missing dependencies or npm-related errors, try to run:
```
npm run jspm-start
```

## Project structure ##

All the examples are stored in the examples folder and saved in a JSON file for the website.

All the assets are stored in examples/_assets.

Every sub-folder in the examples folder corresponds to a sub-menu in the website's sidebar.

## How to create an example ##

You can use the basic example as a template, it is located in ``` examples/basics/basic.html ```.
All you need to do is copy and paste this file to where you think your example belongs.
You can then come back to the browser and navigate to your file and start changing it.

When you create a new example file, you need to run ``` node generate-examples.js ``` in order for it to be shown on your local version of the website.


## How to build the project to upload it to github pages ## 

Running ```jspm bundle-sfx js/main``` will compile all of the ES2015 code and all of the dependencies into a single file called build.js


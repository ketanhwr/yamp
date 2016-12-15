# YAMP
YAMP stands for Yet Another Music Player (I was not able to come up with a better name). This is pretty simple music player which you can use to learn Electron and Node.js and a little bit about ID3 tags too. The design sucks (as of now) and I need to add a lot of options.

## Why?

I was bored, and couldn't find a nice music player for Ubuntu. (Museeks is pretty nice, according to me, but lacks some options). Electron is a pretty cool framework which allows you to make cross platform apps in Node.js runtime.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/ketanhwr/yamp
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Modify `public/config.json` to point towards the directory/directories in which you store your music files.

_Note: I'm working on Node.js version 4.7.0_

_Another Note: There is a bug in `jsmediatags` library due to which album arts of bigger than normal size fail to load. So don't blame me._

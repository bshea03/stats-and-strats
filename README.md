# README

## About

This is the official Wails Svelte-TS template.

## Live Development

To run in live development mode, run `wails dev` in the project directory.* This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.*

* = If you are using a Linux distribution that does not have webkit2gtk-4.0 (such as Ubuntu 24.04), append `-tags webkit2_41` to these commands.

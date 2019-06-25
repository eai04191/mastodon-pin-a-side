// ==UserScript==
// @name         Mastodon Pin a Side
// @namespace    mizle.net
// @author       Eai <eai@mizle.net>
// @license      MIT
// @version      1.1.1
// @icon         https://i.imgur.com/CRc4i2N.png

// @homepageURL  https://github.com/eai04191/mastodon-pin-a-side
// @supportURL   https://github.com/eai04191/mastodon-pin-a-side/issues

// @match        https://*/@*
// ==/UserScript==

(function() {
  "use strict";
  if (document.querySelector("[alt='Mastodon']") || document.querySelector("#mastodon-svg-logo-full")) {
    injectionCSS();

    const pinWrapper = document.createElement("div");
    pinWrapper.id = "pin-wrapper";
    document.querySelector(".column-1").appendChild(pinWrapper);

    Array.from(document.querySelectorAll(".fa-thumb-tack"), e => {
      const entry = e.closest(".entry");
      document.getElementById("pin-wrapper").appendChild(entry);
      entry.style.backgroundColor = getBackgroundColor();
    });

    function injectionCSS() {
      const css = getCSS();
      const style = document.createElement("style");
      style.innerHTML = css;
      document.querySelector("head").appendChild(style);
    }

    function getBackgroundColor() {
      return window.getComputedStyle(document.querySelector(".entry"))
        .backgroundColor;
    }

    function getCSS() {
      return `
        #pin-wrapper {
          display: flex;
          flex-flow: wrap;
        }

        #pin-wrapper .entry {
          width: 100%;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        #pin-wrapper .entry .status__prepend {
          display: none;
        }

        #pin-wrapper .entry .status {
          border: none;
        }
      `;
    }
  }
})();

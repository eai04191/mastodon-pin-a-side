// ==UserScript==
// @name         Mastodon Pin a Side
// @namespace    mizle.net
// @author       Eai <eai@mizle.net>
// @license      MIT
// @version      1.0.0
// @icon         https://i.imgur.com/CRc4i2N.png

// @homepageURL  https://github.com/eai04191/mastodon-pin-a-side
// @supportURL   https://github.com/eai04191/mastodon-pin-a-side/issues

// @match        https://*/@*

// @resource     css https://raw.githubusercontent.com/eai04191/mastodon-pin-a-side/master/style.css

// @grant        GM_getResourceText
// ==/UserScript==

(function() {
  "use strict";
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
    const style = document.createElement("style");
    const css = document.createTextNode(GM_getResourceText("css"));
    style.appendChild(css);
    document.getElementsByTagName("head")[0].appendChild(style);
  }

  function getBackgroundColor() {
    return window.getComputedStyle(document.querySelector(".entry"))
      .backgroundColor;
  }
})();

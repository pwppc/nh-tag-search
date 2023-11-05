// ==UserScript==
// @name         NH Search Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nhentai.net/*
// @grant        none
// ==/UserScript==

import { ButtonTagsState, TagButton } from "./entities/tag-button.entity";
import { NavMenuManager } from "./nav-menu.manager";
import { SearchBarManager } from "./search-bar.manager";

const searchBarmanager = new SearchBarManager();
const navMenumanager = new NavMenuManager();

function createSearchButton() {
  const link = document.createElement("a");
  link.href =
    "/search/?q=-netorare+-guro+-%22old+man%22+-bdsm+-%22urethra+insertion%22+-scat+-tentacles+-insect+-torture+-%22kuroko+no+basuke%22+-%22hunter+x+hunter%22+-vore+-miniguy";
  link.innerHTML = "Search";
  navMenumanager.appendElement(link);
}

function onTagButtonClick(button: TagButton) {
  button.nextState();

  searchBarmanager.nextTagStateInSearch(button.tags);
}

function createSearchModifierButton(
  buttonText: string,
  newTags: string[]
): TagButton {
  const button = TagButton.create({
    buttonText,
    newTags,
    onClick: onTagButtonClick,
  });

  const isButtonActive = searchBarmanager.tagsExistsInSearch(button.tags);
  const areButtonTagsNegative = searchBarmanager.areTagsNegative(button.tags);

  if (areButtonTagsNegative) {
    button.setState(ButtonTagsState.ACTIVE_NEGATIVE);
  } else if (isButtonActive) {
    button.setState(ButtonTagsState.ACTIVE);
  } else {
    button.setState(ButtonTagsState.INACTIVE);
  }

  navMenumanager.appendElement(button.element);

  return button;
}

(function () {
  "use strict";

  const buttonParams = [
    { buttonText: "Sole", tags: ["sole male"] },
    { buttonText: "ICST", tags: ["incest"] },
    { buttonText: "Futa", tags: ["futanari"] },
    { buttonText: "TRP", tags: ["tomgirl", "yaoi"] },
    { buttonText: "SHT", tags: ["shota"] },
  ];

  createSearchButton();

  buttonParams.forEach(({ buttonText, tags }) => {
    createSearchModifierButton(buttonText, tags);
  });
})();

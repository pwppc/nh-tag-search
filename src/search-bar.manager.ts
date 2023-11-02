import { TagList } from "./entities/tag-list.entity";

export class SearchBarManager {
  searchBarElement: HTMLInputElement;

  constructor() {
    this.searchBarElement = document.querySelector(
      ".search input"
    ) as HTMLInputElement;
  }

  addTagsToSearch(tagList: TagList) {
    tagList.tags.forEach((tag) => {
      this.searchBarElement.value = `${tag.parsedTag} ${this.searchBarElement.value}}`;
    });
  }

  addTagsToSearchAsNegative(tagList: TagList) {
    tagList.tags.forEach((tag) => {
      this.searchBarElement.value = this.searchBarElement.value
        .replace(`${tag.parsedTag}`, `-${tag.parsedTag}`)
        .trim();

      if (this.searchBarElement.value.indexOf(`-${tag.parsedTag}`) === -1) {
        this.searchBarElement.value = `-${tag.parsedTag} ${this.searchBarElement.value}`;
      }
    });
  }

  removeTagsFromSearch(tagList: TagList) {
    tagList.tags.forEach((tag) => {
      // Replace if tag has minus sign or not
      this.searchBarElement.value = this.searchBarElement.value
        .replace(`-${tag.parsedTag}`, "")
        .replace(`${tag.parsedTag}`, "")
        .trim();
    });
  }

  tagsExistsInSearch(tagList: TagList) {
    return tagList.tags.every((tag) => {
      return this.searchBarElement.value.indexOf(tag.parsedTag) !== -1;
    });
  }

  areTagsNegative(tagList: TagList) {
    return tagList.tags.every((tag) => {
      return this.searchBarElement.value.indexOf(`-${tag.parsedTag}`) !== -1;
    });
  }

  nextTagStateInSearch(tagList: TagList) {
    // if tags are negative, remove all tags
    // if tags are positive, make all tags negative
    // if tags are not in search, make all tags positive

    if (this.areTagsNegative(tagList)) {
      this.removeTagsFromSearch(tagList);
    } else if (this.tagsExistsInSearch(tagList)) {
      this.addTagsToSearchAsNegative(tagList);
    } else {
      this.addTagsToSearch(tagList);
    }
  }
}

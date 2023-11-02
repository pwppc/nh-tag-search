export class NavMenuManager {
  navElement: HTMLUListElement;

  appendElement(element: HTMLElement) {
    const listItem: HTMLLIElement = document.createElement("li");
    listItem.classList.add("desktop");
    listItem.appendChild(element);
    this.navElement.appendChild(listItem);
  }

  constructor() {
    this.navElement = document.querySelector("nav ul") as HTMLUListElement;
  }
}

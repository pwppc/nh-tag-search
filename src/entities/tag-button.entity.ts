import { TagList } from "./tag-list.entity";

export type CreateTagButtonParams = {
  buttonText: string;
  newTags: string[];
  initialTagsState?: ButtonTagsState;
  onClick: (button: TagButton) => void;
};

export enum ButtonTagsState {
  ACTIVE,
  ACTIVE_NEGATIVE,
  INACTIVE,
}

type TagStateCycle = {
  state: ButtonTagsState;
  nextState: ButtonTagsState;
};

const tagStateCycle: { [key in ButtonTagsState]: TagStateCycle } = {
  [ButtonTagsState.ACTIVE]: {
    state: ButtonTagsState.ACTIVE,
    nextState: ButtonTagsState.ACTIVE_NEGATIVE,
  },
  [ButtonTagsState.ACTIVE_NEGATIVE]: {
    state: ButtonTagsState.ACTIVE_NEGATIVE,
    nextState: ButtonTagsState.INACTIVE,
  },
  [ButtonTagsState.INACTIVE]: {
    state: ButtonTagsState.INACTIVE,
    nextState: ButtonTagsState.ACTIVE,
  },
};

export class TagButton {
  private _buttonText: string;
  private _tags: TagList;
  private _element: HTMLButtonElement;
  private _tagsState: ButtonTagsState;

  private constructor(
    buttonText: string,
    newTags: string[],
    initialTagsState: ButtonTagsState,
    onTagButtonClick: (button: TagButton) => void
  ) {
    this._buttonText = buttonText;
    this._tagsState = initialTagsState;
    this._tags = TagList.createFromStrings(newTags);

    this._element = document.createElement("button");
    this._element.classList.add("btn", "btn-secondary");
    this._element.innerHTML = this._buttonText;
    this._element.addEventListener("click", () => {
      onTagButtonClick(this);
    });
  }

  static create({
    buttonText,
    newTags,
    initialTagsState = ButtonTagsState.INACTIVE,
    onClick,
  }: CreateTagButtonParams) {
    return new TagButton(buttonText, newTags, initialTagsState, onClick);
  }

  get element() {
    return this._element;
  }

  get buttonText() {
    return this._buttonText;
  }

  set buttonText(buttonText: string) {
    this._buttonText = buttonText;
    this._element.innerHTML = this._buttonText;
  }

  get tags() {
    return this._tags;
  }

  get tagsState() {
    return this._tagsState;
  }

  nextState() {
    return this.setState(tagStateCycle[this._tagsState].nextState);
  }

  setState(state: ButtonTagsState) {
    switch (state) {
      case ButtonTagsState.ACTIVE:
        this.makeActive();
        break;
      case ButtonTagsState.ACTIVE_NEGATIVE:
        this.makeActiveNegative();
        break;
      case ButtonTagsState.INACTIVE:
        this.makeInactive();
        break;
    }
  }

  makeActive() {
    this._tagsState = ButtonTagsState.ACTIVE;

    this._element.classList.add("btn-primary");
    this._element.classList.remove("btn-secondary");

    this.buttonText = this._buttonText.replace(/^-/, "");
  }

  makeActiveNegative() {
    this._tagsState = ButtonTagsState.ACTIVE_NEGATIVE;

    this._element.classList.add("btn-primary");
    this._element.classList.remove("btn-secondary");

    this.buttonText = `-${this._buttonText}`;
  }

  makeInactive() {
    this._tagsState = ButtonTagsState.INACTIVE;

    this._element.classList.remove("btn-primary");
    this._element.classList.add("btn-secondary");

    this.buttonText = this._buttonText.replace(/^-/, "");
  }
}

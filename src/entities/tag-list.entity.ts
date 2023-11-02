export class Tag {
  private _originalTag: string;
  private _parsedTag: string;

  private constructor(tag: string) {
    this._originalTag = tag;
    this._parsedTag = this.parseTag(tag);
  }

  static createFromString(tag: string) {
    return new Tag(tag);
  }

  get originalTag() {
    return this._originalTag;
  }

  get parsedTag() {
    return this._parsedTag;
  }

  parseTag(tag: string) {
    const tagLower = tag.toLowerCase();
    const isTagMultiWord = tagLower.indexOf(" ") !== -1;

    if (isTagMultiWord) return `"${tagLower}"`;
    return tag;
  }
}

export class TagList {
  private _tags: Tag[];

  private constructor(tagList: string[]) {
    this._tags = tagList.map((tag) => Tag.createFromString(tag));
  }

  static createFromStrings(tagList: string[]) {
    return new TagList(tagList);
  }

  get tags() {
    return this._tags;
  }
}

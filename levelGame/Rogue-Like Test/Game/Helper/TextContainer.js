class TextContainer {

    constructor(params) {

        this._font = loadFont(params.path);
        this._fontsize = params.fontsize;
        this._text = params.text;
        this._x = params.x;
        this._y = params.y;
        this._align = params.align;
        this._color = params.color;
    }

    draw() {
        this.drawWords();
    }

    drawWords() {
        // The text() function needs three parameters:
        // the text to draw, the horizontal position,
        // and the vertical position
        //Color

        textFont(this.font);
        textSize(this.fontsize);
        textAlign(this.align.horizontal);
        fill(this.color);
        text(this.text, this.x, this.y);
    }


    get font() {
        return this._font;
    }

    set font(value) {
        this._font = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get fontsize() {
        return this._fontsize;
    }

    set fontsize(value) {
        this._fontsize = value;
    }

    get align() {
        return this._align;
    }

    set align(value) {
        this._align = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }
}
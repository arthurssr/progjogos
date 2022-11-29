class Texto extends UpdateClass{
    constructor(x, y, size, align = 'left'){
        super()
        this.size = size;
        this.color = 'black';
        this.x = x;
        this.y = y;
        this.align = align;
    }

    update(ctx) {
        ctx.textAlign = this.align;
        ctx.font = this.size + " " + this.height;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}
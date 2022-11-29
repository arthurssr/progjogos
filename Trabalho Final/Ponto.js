class Ponto extends UpdateClass{
    constructor(width, height, x, y) {
        super();
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    

    update(ctx){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
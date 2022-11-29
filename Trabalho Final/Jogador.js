class Jogador extends UpdateClass {
    constructor(x, y, size){
        super()
        this.x = x;
        this.y = y;  
        this.width = size;
        this.height = size;
    }

    cima(){
        this.y = (this.y - 5 > 0) ? this.y - 5 : 0;
    }
    baixo(canvas){
        var limitHeight = canvas.height - this.height;
        this.y = (this.y + 5 < limitHeight) ? this.y + 5 : limitHeight;
    }
    esquerda(){
        this.x = (this.x - 5 > 0) ? this.x - 5 : 0;
    }

    direita(canvas){
        var limitWidth = canvas.width - this.width;
        this.x = (this.x + 5 < limitWidth) ? this.x + 5 : limitWidth;
    }
    
    update(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    colisionTest(objeto) {
        var posicao_x = this.x;
        var posicao_x_completo = this.x + (this.width);
        var posicao_y = this.y;
        var posicao_y_completo = this.y + (this.height);
        var posicao_x_objeto = objeto.x;
        var posicao_x_completo_objeto = objeto.x + (objeto.width);
        var posicao_y_objeto = objeto.y;
        var posicao_y_completo_objeto = objeto.y + (objeto.height);
        var bateu = true;
        if ((posicao_y_completo < posicao_y_objeto) || (posicao_y > posicao_y_completo_objeto) || (posicao_x_completo < posicao_x_objeto) || (posicao_x > posicao_x_completo_objeto)) {
            bateu = false;
        }
        return bateu;
    }
}

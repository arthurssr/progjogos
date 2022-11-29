class World {
    static canvas;
    static canvasContext;

    possiveisPontos = [
        new Ponto(30, 30, 0, 0),
        new Ponto(30, 30, 400, 60),
        new Ponto(30, 30, 400, 360),
        new Ponto(30, 30, 220, 360),
        new Ponto(30, 30, 580, 600),
        new Ponto(30, 30, 40, 760),
        new Ponto(30, 30, 220, 540),
        new Ponto(30, 30, 520, 780),
        new Ponto(30, 30, 770, 240),
        new Ponto(30, 30, 40, 600),
    ]

    listaAcoes = [false, false, false, false];

    constructor() {
        //variables for game loop
        this.pontuacao = 0;
        this.frameRate = 30;
        this.timeStep = 1000 / this.frameRate;
        this.lastFrameTimeMs = 0;
        this.delta = 0;
        this.jogando = true;
        this.perdeu = false;

        //init stuff
        World.canvas = document.createElement('canvas');
        World.canvasContext = World.canvas.getContext('2d');
        World.canvas.width = 840;
        World.canvas.height = 880;

        document.body.insertBefore(World.canvas, document.body.childNodes[0]);

        //game entities
        this.player = new Jogador(30, World.canvas.height / 2, 30);

        let shuffled = this.possiveisPontos.sort(() => 0.5 - Math.random());
        this.pontos = Object.assign([], shuffled.slice(0, 5))

        this.showPontuacao = new Texto(470, 20, "20px", 'right');


        this.entities = [this.player, ...this.pontos, this.showPontuacao];

        
        let world = this
        document.addEventListener('keydown', function(e) {
            world.keyDownAction(e)
        });
        document.addEventListener('keyup', function(e){
            world.keyUpAction(e)
        });
        document.addEventListener('mousedown', function(e) {
            if(!world.jogando){
                world.jogando = true;
                world.perdeu = false;
                world.pontuacao = 0
                let shuffled = world.possiveisPontos.sort(() => 0.5 - Math.random());
                world.pontos = shuffled.slice(0, 5)
                world.listaAcoes = [false, false, false, false];
                world.player = new Jogador(30, World.canvas.height / 2, 30);
                world.entities = [world.player, ...world.pontos, world.showPontuacao];
            }
        })

        requestAnimationFrame(this.mainLoop.bind(this));
    }

    clear() {
        World.canvasContext.clearRect(0, 0, World.canvas.width, World.canvas.height);
        if (this.jogando) {
            World.canvasContext.drawImage(img, 0, 0)
        }
    }

    mainLoop(timeStamp) {
		//Pattern Game Loop
		this.delta += timeStamp - this.lastFrameTimeMs;
		this.lastFrameTimeMs = timeStamp;
		
		while(this.delta >= this.timeStep) {
			//this.move(this.timeStep);
			this.delta -= this.timeStep;
		}
		this.refreshJogo();
		requestAnimationFrame(this.mainLoop.bind(this));
	}

    //função de refresh de tela
    refreshJogo() {
        if(this.jogando){
            this.movimentarPlayer();
        }
            
        for (let i = 0; i < this.pontos.length; i += 1) {
            if (this.player.colisionTest(this.pontos[i])) {
                this.pontos[i].x = -10000;
                this.pontuacao++;
            }
        }

        this.clear();

        if (this.perdeu) {
            this.showDerrota();
            return;
        }

        if (this.pontuacao == 5) {
            this.showVitoria();
            this.jogando = false;
            return;
        }

        this.showPontuacao.text = "SCORE: " + this.pontuacao;

        for (let i = 0; i < this.entities.length; i += 1) {
            this.entities[i].update(World.canvasContext);
        }

    }

    //Função de movimentação de player
    keyDownAction(e) {
        if (this.jogando) {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.listaAcoes[0] = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.listaAcoes[1] = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.listaAcoes[2] = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.listaAcoes[3] = true;
                    break;
            }
        }
    }

    keyUpAction(e) {
        if (this.jogando) {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.listaAcoes[0] = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.listaAcoes[1] = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.listaAcoes[2] = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.listaAcoes[3] = false;
                    break;
            }
        }
    }

    movimentarPlayer() {
        if (this.listaAcoes[0]) {
            this.player.cima();
            this.checkcollision(this.player.x, this.player.y);
        }
        if (this.listaAcoes[1]) {
            this.player.baixo(World.canvas);
            this.checkcollision(this.player.x, this.player.y);
        }
        if (this.listaAcoes[2]) {
            this.player.direita(World.canvas);
            this.checkcollision(this.player.x, this.player.y);
        }
        if (this.listaAcoes[3]) {
            this.player.esquerda();
            this.checkcollision(this.player.x, this.player.y);
        }

    }

    checkcollision(x, y) {
        let noPreto = false;
        var imgd = World.canvasContext.getImageData(x, y, 30, 30);
        var pix = imgd.data;

        for (let i = 0; i < pix.length; i += 4) {
            if (pix[i] == 0) {
                noPreto = true;
            }
        }

        if (noPreto) {
            this.jogando = false;
            this.perdeu = true;
        }
    }

    //Tela de derrota
    showDerrota() {
        this.clear();
        World.canvasContext.font = "30px Arial";
        World.canvasContext.fillStyle = "red";
        World.canvasContext.textAlign = "center";
        World.canvasContext.fillText("Você perdeu!", World.canvas.width / 2, 100);
        World.canvasContext.font = "20px Arial";
        World.canvasContext.fillText("Clique para recomeçar", World.canvas.width / 2, 300)
    }

    //Tela de vitória
    showVitoria() {
        this.clear();
        World.canvasContext.font = "30px Arial";
        World.canvasContext.fillStyle = "red";
        World.canvasContext.textAlign = "center";
        World.canvasContext.fillText("Você Venceu!", World.canvas.width / 2, 100);
        World.canvasContext.fillText("Você Venceu!", World.canvas.width / 2, 100);
        World.canvasContext.font = "20px Arial";
        World.canvasContext.fillText("Clique para jogar novamente", World.canvas.width / 2, 300)
    }
}
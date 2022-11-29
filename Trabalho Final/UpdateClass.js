class UpdateClass{
    constructor() {
        if (this.constructor == UpdateClass) {
        throw new Error("Abstract classes can't be instantiated.");
        }
    }

    update(){
        throw new Error('Classe abstrata')
    }
}
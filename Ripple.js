class Ripple{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.age = 0;
        this.lifetime = 5; //15 frames
        this.size = 1;
        this.alive = true;
    }

    update(){
        fill(255, 128);
        circle(this.x, this.y, this.size);
        this.age = this.age + 1;
        if(this.age > this.lifetime){
            this.alive = false
        }
        this.size += 10;
    }

    isAlive(){
        return this.alive;
    }

}
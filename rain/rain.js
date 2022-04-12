class RainWeather{
  constructor(ctx,width,height,opts){
    this._options = opts || {}
    this.ctx=ctx //绘图的句柄
    this.w=width
    this.h=height
    this.rains = [];
    this.timer = null;
    this._init();
  }
  _init(){
    let {ctx} = this
    ctx.lineWith = 2;
    ctx.lineCap = 'round' // 圆头
    let amount = this._options.amount || 100
    let rainArr = (this.rains = [])
    for(let i =0; i <amount; i++){
      let p =this._yieldRain()
      rainArr.push(p)
    }
  }
  _yieldRain(){ // 生成雨
    const {w,h} = this
    let speed = h/this._options.speed/1000 // option.speed秒内落到地面
    return {
      x:Math.random() * w,
      y:Math.random() * h,
      l:2*Math.random(), // 雨丝的尾端
      xs:-1, // 往左下
      ys:speed * Math.random()+10, // 随机速度,最小为10
      color:'rgba(255,255,255,.4)' // 雨是有点透明的
    }
  }
  _draw(){
    let rainArr = this.rains
    let ctx = this.ctx
    ctx.clearRect(0,0,this.w,this.h);  
    for(let i = 0; i < rainArr.length;i++){
      // 画雨丝
      let s =rainArr[i];
      ctx.beginPath();
      ctx.moveTo(s.x,s.y)
      ctx.lineTo(s.x+s.l * s.xs,s.y+s.l * s.ys);
      ctx.strokeStyle = s.color
      ctx.stroke()
    }
    this._update()
  }
  _update() {
    let { w, h } = this
    let rainArr = this.rains
    for(let i=0;i<rainArr.length;i++){
      let s = rainArr[i]
      s.x += s.xs
      s.y += s.ys
      if(s.x>w || s.y >h){ // 超出屏幕界限了回到天上
        s.x = Math.random() * w // 换个位置落下
        s.y = -10  // 回到天上
      }
    }
  }
  run(){
      this.timer = setInterval(()=>{
        this._draw();
      },16) //1秒60帧
  }
  stop(){
    clearInterval(this.timer);
    this.rains = []
    this.timer = null;
  }
  resizeBg(w,h){
    this.stop();
    this.w = w;
    this.h = h;
    this._init()
  }
}

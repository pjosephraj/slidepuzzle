const ctx = document.getElementById('canvas').getContext('2d');
const cW = ctx.canvas.width;
const cH = ctx.canvas.height;
const bW = 100;
const bH = 100;
const movArr = ['right', 'bottom', 'left', 'top'];
let temp;

const imgNumbers = new Image();
imgNumbers.src = '/images/numbers.jpg';
const imgTiger = new Image();
imgTiger.src = '/images/tiger.jpg';
const imgPeacock = new Image();
imgPeacock.src = '/images/peacock.jpg'
const imgPuppy = new Image();
imgPuppy.src = '/images/puppy.jpg';

function selScreen(){
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, cW, cH);
  ctx.fillStyle = '#000';
  ctx.font = '30px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('Select Type', 200, 60);

  const imgToDraw = [
    new drawImg(imgPuppy, 35, 120, 150, 150),
    new drawImg(imgTiger, 210, 120, 150, 150),
    new drawImg(imgPeacock, 35, 300, 150, 150),
    new drawImg(imgNumbers, 210, 300, 150, 150)
  ]

  

  function drawImg(img, x, y, w, h){
    this.img = img, this.x = x, this.y = y, this.w = w, this.h = h;
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  ctx.canvas.addEventListener('mousedown', selImg);

  function selImg(evt){
    var mX = evt.offsetX;
    var mY = evt.offsetY;
    for(var i = 0; i < imgToDraw.length; i++){
      var b = imgToDraw[i];
      if(mX >= b.x && mX < b.x+b.w && mY >= b.y && mY < b.y+b.h){
        initDrawImg(b.img);
      }
    }
  }

  function initDrawImg(img){
    console.log(img);
    ctx.canvas.removeEventListener('mousedown', selImg);
  }
}



function gameCanvas(img) {

  const blocks = [
    new Block(300, 300, 16),
    new Block(0, 0, 1),
    new Block(100, 0, 2),
    new Block(200, 0, 3),
    new Block(300, 0, 4),
    new Block(0, 100, 5),
    new Block(100, 100, 6),
    new Block(200, 100, 7),
    new Block(300, 100, 8),
    new Block(0, 200, 9),
    new Block(100, 200, 10),
    new Block(200, 200, 11),
    new Block(300, 200, 12),
    new Block(0, 300, 13),
    new Block(100, 300, 14),
    new Block(200, 300, 15)
  ];

  moveRandom(700);

  //Canvas event Listener
  ctx.canvas.addEventListener('click', function (evt) {
    moveClicked(evt.offsetX, evt.offsetY, blocks)
    drawBlocks(blocks);
    setMoveable(blocks);
  });

  //To shuffle
  function moveRandom(num) {
    for (let i = 0; i < num; i++) {
      let j = movArr[Math.floor(Math.random() * 4)];
      let k = blocks.filter(function (block) {
        return block.moveable === j;
      });
      if (k.length === 1) {
        moveClicked(k[0].x + 10, k[0].y + 10, blocks);
        drawBlocks(blocks);
        setMoveable(blocks);
      }
    }
  }

  // Move the clicked block
  function moveClicked(x, y, arr) {
    for (var i = 1; i < arr.length; i++) {
      if (arr[i].moveable != undefined && x >= arr[i].x && x <= arr[i].x1 && y >= arr[i].y && y <= arr[i].y1) {
        if (arr[i].moveable === 'right') {
          arr[i].x += 100;
          arr[i].x1 += 100;
          arr[0].x -= 100;
          arr[0].x1 -= 100;
        } else if (arr[i].moveable === 'bottom') {
          arr[i].y += 100;
          arr[i].y1 += 100;
          arr[0].y -= 100;
          arr[0].y1 -= 100;
        } else if (arr[i].moveable === 'top') {
          arr[i].y -= 100;
          arr[i].y1 -= 100;
          arr[0].y += 100;
          arr[0].y1 += 100;
        } else if (arr[i].moveable === 'left') {
          arr[i].x -= 100;
          arr[i].x1 -= 100;
          arr[0].x += 100;
          arr[0].x1 += 100;
        }
        break;
      }
    }
  }

  // Set block.moveable direction
  function setMoveable(arr) {
    const x = arr[0].x, y = arr[0].y, x1 = arr[0].x1, y1 = arr[0].y1;
    for (var i = 1; i < arr.length; i++) {
      if (arr[i].x === x && arr[i].y1 === y) {
        arr[i].moveable = 'bottom';
      } else if (arr[i].y === y && arr[i].x1 === x) {
        arr[i].moveable = 'right';
      } else if (arr[i].y === y && arr[i].x === x1) {
        arr[i].moveable = 'left';
      } else if (arr[i].x === x && arr[i].y === y1) {
        arr[i].moveable = 'top';
      } else if (arr[i].id) {
        arr[i].moveable = undefined;
      }
    }
  }

  //Block constructor
  function Block(x, y, id) {
    this.w = bW, this.h = bH,
    this.x = x, this.y = y,
    this.x1 = this.x + this.w,
    this.y1 = this.y + this.h,
    this.id = id, this.pos = this.id;
    this.col = 'rgba(' + ranCol() + ', ' + ranCol() + ',' + ranCol() + ', .1)';
    this.moveable = this.id === 15 ? 'right' : (this.id === 12) ? 'bottom' : undefined;
    drawBlock(this);
  }

  //Clear the canvas and redraw the blocks
  function drawBlocks(arr) {
    ctx.clearRect(0, 0, cW, cH);
    for (var i = 0; i < arr.length; i++) {
      drawBlock(arr[i]);
    }
  }

  // Draw each block
  function drawBlock(block) {
    if (block.id != 16) {
      ctx.fillStyle = block.col;
      ctx.fillRect(block.x, block.y, block.w, block.h);
      ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
      ctx.strokeRect(block.x, block.y, block.w, block.h);
      ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
      ctx.strokeRect(block.x + 1, block.y + 1, block.w - 2, block.h - 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(0, 0, 0, .5)';
      ctx.font = '48px sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(block.id, block.x + 50, block.y + 50);
    } else {
      ctx.fillStyle = '#000';
      ctx.fillRect(block.x, block.y, block.w, block.h);
    }
  }

  //Pick random Color
  function ranCol() {
    return Math.floor((Math.random()) * 256);
  }

} // initCanvas














window.addEventListener('load', function (evt) {
  selScreen();
  // gameCanvas();
});
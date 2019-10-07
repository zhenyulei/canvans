var WINDOW_WIDTH = 1024; //画布的宽度
var WINDOW_HEIGHT = 500; //画布的高度
var RADIUS = 8; //小圆的半径
var MARGIN_TOP = 60; //每一个数字距离上边距值
var MARGIN_LEFT = 30; //第一个数字距离左边距值
var endTime = new Date(); //月份从0开始，使用7月传的是6月，截止时间
endTime.setTime(endTime.getTime() + 1 * 3600 * 1000);
var curShowTimeSeconds = 0; //当前倒计时的秒

var balls = []; //用来存储在时间上生成的小球
var colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000"
];

window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurrentShowTImeSeconds(); //获取倒计时的时间

  setInterval(function() {
    render(context); //绘制画布
    update();
  }, 50);
};

function getCurrentShowTImeSeconds() {
  var date = new Date(); //当前时间
  var timeObj = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
  return timeObj;
}

function update() {
  var nextShowTimeSeconds = getCurrentShowTImeSeconds(); //获取更新后的倒计时的时间
  var nextHours = parseInt(nextShowTimeSeconds.hour); //curShowTimeSeconds返回的是当前秒
  var nextMinutes = parseInt(nextShowTimeSeconds.minute);
  var nextSeconds = nextShowTimeSeconds.second;

  var curHours = parseInt(curShowTimeSeconds.hour); //curShowTimeSeconds返回的是当前秒
  var curMinutes = parseInt(curShowTimeSeconds.minute);
  var curSeconds = curShowTimeSeconds.second;

  if (nextSeconds != curSeconds) {
    //如果当前秒数和下一次的秒数不等，说明数字还在变化
    //对比时分秒，那个发生了变化，则对应的加上小球
    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      //小时的十分位
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nextHours / 10)); //找到小时十分位的位置就是left和top的位置，以及相应的十位数的数字
    }
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      //小时的个位
      addBalls(
        MARGIN_LEFT + 15 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(nextHours % 10)
      ); //找到小时十分位的位置就是left和top的位置，以及相应的十位数的数字
    }
    //同理对分钟处理
    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      //小时的十分位
      addBalls(
        MARGIN_LEFT + 39 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(nextMinutes / 10)
      ); //找到小时十分位的位置就是left和top的位置，以及相应的十位数的数字
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      //小时的个位
      addBalls(
        MARGIN_LEFT + 54 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(nextMinutes % 10)
      ); //找到小时十分位的位置就是left和top的位置，以及相应的十位数的数字
    }

    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      //小时的十分位
      addBalls(
        MARGIN_LEFT + 78 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(nextSeconds / 10)
      ); //找到小时十分位的位置就是left和top的位置，以及相应的十位数的数字
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      //小时的个位
      addBalls(
        MARGIN_LEFT + 93 * (RADIUS + 1),
        MARGIN_TOP,
        parseInt(nextSeconds % 10)
      ); //找到小时十分位的位置就是left和top的位置，以及相应的十位数的数字
    }
    curShowTimeSeconds = nextShowTimeSeconds;
  }
  updateBalls();
}

function updateBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }
  //删除不在画面内的小球
  var cnt = 0;
  for (var i = 0; i < balls.length; i++) {
    //balls[i].x表示小球的球心位置
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
      balls[cnt++] = balls[i]; //只有在画布中的小球才会继续放进小球的数组中
    }
  }
  //   while (balls.length > cnt) {
  //     balls.pop(); //把数组末尾的小球删掉
  //   }
  while (balls.length > Math.min(300, cnt)) {
    //取cnt和300个的较小值
    balls.pop(); //把数组末尾的小球删掉
  }
}

function addBalls(x, y, num) {
  for (var i = 0; i < digit[num].length; i++) {
    //num表示渲染成数字几，对应着digit数组中的第几个子数组
    for (var j = 0; j < digit[num][i].length; j++) {
      //digit[num][i] 循环的是每个子数组中的第几行
      if (digit[num][i][j] == 1) {
        //如果该行中有等于1的就渲染成小球
        var oneBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(), //表示1.5～2.5之间的随机数
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, //pow是幂次方，也就是取-1或者1，最后是-4或者4；Math.ceil向上取整
          vy: -5 + Math.random(),
          color: colors[Math.floor(Math.random() * colors.length)] //Math.floor向下取整
        };
        balls.push(oneBall);
      }
    }
  }
}

function render(cxt) {
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); //画布内容更新的时候，需要更新画布
  var hours = parseInt(curShowTimeSeconds.hour); //curShowTimeSeconds返回的是当前秒
  var minutes = parseInt(curShowTimeSeconds.minute);
  var seconds = curShowTimeSeconds.second;
  //console.log(hours, minutes, minutes);
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt); //绘制时间 从 0，0位置开始，一个数字一个数字的绘制，这里绘制的是数字的十位
  //十位数中的个位数，因为每个数字最长有7个小圆点组成
  //也就是这里每个数字的宽度是 7*2*(RADIUS+1),为了每个数字之间留有一点余地，这里设置成15*(RADIUS+1)
  renderDigit(
    MARGIN_LEFT + 15 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(hours % 10),
    cxt
  );
  //下面是绘制的冒号
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  //下面绘制分钟，冒号的两个小圆，也就是4个直径，所以是4*2+1
  renderDigit(
    MARGIN_LEFT + 39 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(minutes / 10),
    cxt
  );
  renderDigit(
    MARGIN_LEFT + 54 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(minutes % 10),
    cxt
  );
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

  renderDigit(
    MARGIN_LEFT + 78 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(seconds / 10),
    cxt
  );
  renderDigit(
    MARGIN_LEFT + 93 * (RADIUS + 1),
    MARGIN_TOP,
    parseInt(seconds % 10),
    cxt
  );

  //绘制小球的动画
  for (var i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color;
    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
    cxt.closePath();
    cxt.fill();
  }
}
/*
digit =
[
    [
        [0,0,1,1,1,0,0],
        [0,1,1,0,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,0,1,1,0],
        [0,0,1,1,1,0,0]
    ]
]
*/
function renderDigit(x, y, num, cxt) {
  cxt.fillStyle = "rgb(0,102,153)";
  for (var i = 0; i < digit[num].length; i++) {
    //num表示渲染成数字几，对应着digit数组中的第几个子数组
    for (var j = 0; j < digit[num][i].length; j++) {
      //digit[num][i] 循环的是每个子数组中的第几行
      if (digit[num][i][j] == 1) {
        //如果该行中有等于1的就渲染成原点
        cxt.beginPath();
        //绘制数字的圆心位置的逻辑示意图地址：https://img2018.cnblogs.com/blog/693756/201910/693756-20191007095134509-439691695.png
        // x表示距离x轴原点的距离，每个数字是7个原点组成，j * 2 * (RADIUS + 1) ，表示在该数字的范围中，第j列，然后在加上半径+1px
        //即 x表示的是画布上，该数字距离左侧原点的距离，j * 2 * (RADIUS + 1)表示在该数字内部x的距离
        cxt.arc(
          x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          RADIUS,
          0,
          2 * Math.PI
        );
        cxt.closePath();
        cxt.fill();
      }
    }
  }
}

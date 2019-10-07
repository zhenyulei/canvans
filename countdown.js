var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    render(context); //绘制画布
}

function render(cxt) {
    var hours = 12;
    var minutes = 34;
    var seconds = 56;
    renderDigit(0, 0, num, cxt) //绘制时间 从 0，0位置开始，一个数字一个数字的绘制
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit) {

            }
        }
    }
}
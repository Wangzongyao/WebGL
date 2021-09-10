// 顶点着色器
const VSHADER_SOURCE = 
  'attribute vec4 a_Position; \n' + 
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// 片元着色器
const FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

function main() {
    // 获取canvas元素
    const canvas = document.querySelector('#example');
    if(!canvas) {
        console.log('获取画布失败');
        return;
    }
    // 获取gl绘图上下文
    const gl = getWebGLContext(canvas, true);
    if(!gl) {
        console.log('获取gl失败');
        return;
    }
    // 初始化着色器
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('初始化着色器失败');
        return;
    }

    // 获取attribute变量的存贮位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if(a_Position < 0) {
      console.log('失败了获取local storage');
    }
    // 清空颜色缓冲区
    // gl.clear(gl.COLOR_BUFFER_BIT);    
    // 注册鼠标点击事件响应函数
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position);
    }

    // 指定清空canvas的颜色值
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    // Clear <canvas>
    // gl.clear(gl.COLOR_BUFFER_BIT);
}

// 鼠标点击位置数组
const g_points = [];
function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX;
    let y = ev.clientY;
    const rect = ev.target.getBoundingClientRect();

    // 通过减法构造相对位置
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push(x);
    g_points.push(y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < g_points.length; i+=2) { 
        // 将点的位置传递到变量中
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);
        console.log(g_points[i], g_points[i + 1])
        // 绘制点
        gl.drawArrays(gl.POINTS, 0 ,1);
    }

}
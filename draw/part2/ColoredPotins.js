// 顶点着色器
const VSHADER_SOURCE = 
  'attribute vec4 a_Position; \n' + 
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// 片元着色器
const FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' + // Set the point color
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
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

    if(a_Position < 0) {
        console.log('失败了获取local storage');
        return;
    }
    // 当getUniformLocation第二个参数不存在或者使用了关键字返回值为null
    if(!u_FragColor) {
        console.log('失败了获取local storage');
        return;
    }
    // 清空颜色缓冲区
    // gl.clear(gl.COLOR_BUFFER_BIT);    
    // 注册鼠标点击事件响应函数
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    }

    // 指定清空canvas的颜色值
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    // Clear <canvas>
    // gl.clear(gl.COLOR_BUFFER_BIT);
}

// 鼠标点击位置数组
const g_points = [];
// 存储点的颜色
const g_colors = [];
function click(ev, gl, canvas, a_Position, u_FragColor) {
    let x = ev.clientX;
    let y = ev.clientY;
    const rect = ev.target.getBoundingClientRect();

    // 通过减法构造相对位置
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push({x, y});

    if(x>=0.0 && y>=0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0])
    } else if(x<0.0 && y<0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0])
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < g_points.length; i++) { 
        const point = g_points[i];
        const [v0, v1, v2, v3] = g_colors[i];
        // 将点的位置传递到变量中
        gl.vertexAttrib3f(a_Position, point.x, point.y, 0.0);
        // 将点的颜色传递到变量中
        gl.uniform4f(u_FragColor, v0, v1, v2, v3)
        // 绘制点
        gl.drawArrays(gl.POINTS, 0 ,1);
    }

}
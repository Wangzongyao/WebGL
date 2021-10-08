// 顶点着色器
const VSHADER_SOURCE = 
  'attribute vec4 a_Position; \n' + 
  'attribute vec4 a_Color; \n' +
  'varying vec4 v_Color; \n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// 片元着色器
const FSHADER_SOURCE =
  // 支持的精读是多少
  'precision mediump float;\n' +
  'varying vec4 v_Color; \n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
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

    // 设置顶点位置
    const n = initVertexBuffers(gl);
    if(n < 0) {
        console.log('失败了去设置顶点位置');
        return ;
    }

    // 指定清空canvas的颜色值
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制三个点
    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0
    ])
    const n = 3;
    const vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        console.log('创建失败');
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const FSIZE = vertices.BYTES_PER_ELEMENT;
    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 获取attribute变量的存贮位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0) {
        console.log('失败了获取local storage');
    }
    // 将缓冲区分配给变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    // 连接a_Position变量与分配的缓冲区，处理缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    // 获取颜色的部分
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);
    
    return n;
}
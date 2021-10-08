// 顶点着色器
const VSHADER_SOURCE = 
  'attribute vec4 a_Position; \n' + 
  'attribute float a_PointSize; \n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_PointSize;\n' +
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
    const verticesSize = new Float32Array([
        0.0, 0.5, 10.0,
        -0.5, -0.5, 20.0,
        0.5, -0.5, 30.0
    ])
    const n = 3;
    const vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        console.log('创建失败');
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesSize, gl.STATIC_DRAW);

    const FSIZE = verticesSize.BYTES_PER_ELEMENT;
    // 获取attribute变量的存贮位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // 将缓冲区分配给变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
    // 连接a_Position变量与分配的缓冲区，处理缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    // 获取attribute变量的存贮位置
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    // 将缓冲区分配给变量
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
    // 连接a_Position变量与分配的缓冲区，处理缓冲区对象
    gl.enableVertexAttribArray(a_PointSize);

    
    return n;
}
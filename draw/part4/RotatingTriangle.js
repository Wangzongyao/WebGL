// 顶点着色器
const VSHADER_SOURCE = 
  'attribute vec4 a_Position; \n' + 
  'uniform mat4 u_ModelMatrix;\n' + 
  'void main() {\n' +
  '  gl_Position = gl_Position = u_ModelMatrix * a_Position;\n' +
  '}\n';

// 片元着色器
const FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.9, 0.7, 0.4, 1.0);\n' + // Set the point color
  '}\n';

// 旋转角度
const ANGLE_STEP = 45.0;

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

    let currAngle = 0.0;
    const modelMatrix = new Matrix4();
    const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    const tick = function() {
        currAngle = animate(currAngle);
        draw(gl, n, currAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick);
    }
    tick();
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
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
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 获取attribute变量的存贮位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0) {
        console.log('失败了获取local storage');
    }
    // 将缓冲区分配给变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // 连接a_Position变量与分配的缓冲区，处理缓冲区对象
    gl.enableVertexAttribArray(a_Position);
    
    return n;
}

function draw(gl, n, currAngle, modelMatrix, u_ModelMatrix) {
    // 设置旋转矩阵
    modelMatrix.setRotate(currAngle, 0, 0, 1);
    // 数据信息传输给顶点着色器
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制三个点
    gl.drawArrays(gl.TRIANGLES, 0, n);

}

let g_last = Date.now();
function animate(angle) {
    // 计算上次调用经过的时间
    let now = Date.now();

    let elapsed = now - g_last;

    g_last = now;

    let newAngle = angle + (elapsed * ANGLE_STEP) / 1000.0;

    return newAngle %= 360;

}
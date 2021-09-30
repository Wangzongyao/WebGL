// 顶点着色器
const VSHADER_SOURCE = 
  'attribute vec4 a_Position; \n' + 
  'uniform float u_CosB, u_SinB; \n' + 
  'void main() {\n' +
  '  gl_Position.x = a_Position.x * u_CosB + a_Position.y * u_SinB;\n' + // Set the vertex coordinates of the point
  '  gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' + // Set the vertex coordinates of the point
  '  gl_Position.z = a_Position.z;\n' + // Set the vertex coordinates of the point
  '  gl_Position.w = 1.0;\n' + // Set the vertex coordinates of the point
  '}\n';

// 片元着色器
const FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

const ANGLE = 270.0;
// 转化为弧度制
const radian = Math.PI * ANGLE / 180.0;
const cosB = Math.cos(radian);
const sinB = Math.sin(radian);


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

    const u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
    const u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');

    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);

    // 指定清空canvas的颜色值
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制三个点
    gl.drawArrays(gl.TRIANGLES, 0, n);
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
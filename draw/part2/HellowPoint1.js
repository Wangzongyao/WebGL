// 顶点着色器
const VSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_Position = vec4(0.5, 0.5, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
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

    // 指定清空canvas的颜色值
    gl.clearColor(0.5, 0.5, 1.0, 1.0);
    // 清空颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);    
    // 绘制点
    gl.drawArrays(gl.POINTS, 0, 1);
}

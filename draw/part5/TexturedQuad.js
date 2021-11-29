// 顶点着色器
const VSHADER_SOURCE = 
  'attribute vec4 a_Position; \n' + 
  'attribute vec2 a_TexCoord; \n' + // 纹理坐标
  'varying vec2 v_TexCoord; \n' + 
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  '  v_TexCoord = a_TexCoord;\n' + // Set the vertex coordinates of the point
  '}\n';

// 片元着色器
// texture2D实现纹理
const FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord; \n' + 
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' + // 片元着色器从纹理上获取纹素的颜色
  '}\n';

function main() {
    // 获取canvas元素
    const canvas = document.querySelector('#example');
    if(!canvas) {
        console.log('获取画布失败');
        return;
    }
    // 获取gl绘图上下文
    const gl = getWebGLContext(canvas);
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
    // 指定canvas的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 设置纹理
    if(!initTextures(gl, n)) {
        console.log('失败了去设置纹理');
        return ;
    }
}

function initVertexBuffers(gl) {
    // 
    const verticesTexCoords = new Float32Array([
        -0.5,  0.5,   0.0, 1.0,
        -0.5, -0.5,   0.0, 0.0,
        0.5,  0.5,   1.0, 1.0,
        0.5, -0.5,   1.0, 0.0,
    ])
    const n = 4;
    const vertexTexCoordBuffer = gl.createBuffer();
    if(!vertexTexCoordBuffer) {
        console.log('创建失败');
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

    const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    // 获取attribute变量的存贮位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0) {
        console.log('失败了获取local storage');
    }
    // 将缓冲区分配给变量
    /**
     * @params a_Position 顶点属性，该属性要被修改的索引
     * @params 2 每个顶点属性组件的数量
     * @params FLOAT 数组中每个组件的数据类型
     * @params false 是否整数数据值应当被float时被归一化到一定的范围
     * @params FSIZE * 4 连续顶点属性的开始之间的字节指定偏移量
     * @params FSIZE * 2 顶点属性阵列中的第一组分的字节指定偏移
     */
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    // 连接a_Position变量与分配的缓冲区，处理缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    const a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    if(a_TexCoord < 0) {
        console.log('失败了去获取a_TexCoord');
        return -1;
    }   
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);
    return n;
}

function initTextures(gl, n) {
    // 创建纹理
    const texture = gl.createTexture();
    if(!texture) {
        console.log('失败了去创建纹理');
        return false;
    }
    const u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    if(!u_Sampler) {
        consol.log('失败了去获取u_Sampler');
        return false;
    }
    const image = new Image();
    image.onload = function() {
        loadTexture(gl, n, texture, u_Sampler, image);
    }
    image.src = '../../resource/sky.jpg';
    return true;

}

function loadTexture(gl, n, texture, u_Sampler, image) {
    // 旋转Y轴的图像，因为【图片坐标系】和【webGL坐标系（纹理）】的Y轴方向不一致，需要翻转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // 激活纹理
    gl.activeTexture(gl.TEXTURE0);
    // 绑定纹理
    // TEXTURE_2D：二维纹理
    // TEXTURE_CUBE_MAP：立方体纹理
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 设置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // 设置纹理图像，将图像传输给纹理对象
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    // 将0号纹理传递给着色器中的取样器变量
    gl.uniform1i(u_Sampler, 0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT); 
    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

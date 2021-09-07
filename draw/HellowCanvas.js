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
    // 指定清空canvas的颜色值
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
};
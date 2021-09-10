function main() {
    // 获取canvas元素
    const canvas = document.querySelector('#example');
    if(!canvas) {
        console.log('获取画布失败');
        return;
    }
    // 获取绘制二维图形上下文
    const context = canvas.getContext('2d');
    // 绘制矩形
    context.fillStyle = '#ddd';
    /**
     * @param {Number} 矩形左上角的 x 坐标
     * @param {Number} 矩形左上角的 y 坐标
     * @param {Number} 矩形的宽度width
     * @param {Number} 矩形的高度height
     */
    context.fillRect(120, 10, 50, 150);
};
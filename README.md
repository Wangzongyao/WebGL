# WebGL
### 第1章
#### webGL的起源
#### webGL的概述
### 第2章
#### 顶点着色器
##### 顶点着色器代码会在GPU的顶点着色器单元执行
#### 片元着色器
##### 片元着色器代码会在GPU的片元着色器单元执行
##### 在WebGL渲染管线流程中，或者说GPU的渲染流程中，顶点着色器代码先执行处理顶点，得到一系列片元，然后再执行片元着色器代码处理片元。

#### 如果定点着色器和片元着色器存在相同的变量，顶点着色器付给该变量的值就会被自动的传递给偏远着色器
### 第3章
#### 缓冲对象
##### webGL系统中的一块内存中区域，可一次性填充大量顶点数据并保存，供后续顶点着色器使用

#### 齐次坐标
##### 使图形和几何学的计算在投影空间中成为可能。齐次坐标是用N+1个数来表示N维坐标的一种方式。

#### 变换矩阵
##### 变换矩阵是数学线性代数中的一个概念。
##### 在线性代数中，线性变换能够用矩阵表示。如果T是一个把Rn映射到Rm的线性变换，且x是一个具有n个元素的列向量 ，那么我们把m×n的矩阵A，称为T的变换矩阵。
##### 使用手法：矩阵的扩阶，矩阵的求数据

##### 顶点着色器和片元着色器的工作过程
##### 顶点着色器负责标出顶点的位置信息（基础顶点坐标），然后drawArray函数负责根据顶点信息构建基础图形（图形装配过程），然后将装配好的图形转化为片元（光栅化的过程）。然后调用片元着色器，有多少片元（片元数量由光栅化控制的）就需要调用多少次片元着色器，每个片元的颜色可被内插实现或者直接编程定义实现，并存入颜色缓冲器中，然后最后一个片元绘制完成时，浏览器显示整个的图形。（备注：图形装配过程又称图元装配过程，因为装配的点线面都成为图元）

#### 纹理映射的过程
##### 1.准备好映射到集合图形上的纹理图像
##### 2.危机和图像配置纹理映射方式
##### 3.加载纹理图像，对齐进行一些配置，并在webGL中使用它。
##### 4.在片元着色器中将相应的纹素从纹理中抽取出来，并将纹素的颜色赋给片元。

#### 纹理的作用
##### 根据纹理的图像，为之前光栅化的后的每个片元涂上合适的颜色。组成纹理的像素叫做文素，每个文素都是用RGB或者RGBA的格式。

#### 纹理坐标（st坐标系统）
##### 根据纹理的图像，为之前光栅化的后的每个片元涂上合适的颜色。组成纹理的像素叫做文素，每个文素都是用RGB或者RGBA的格式。

#### TODO
##### GPU实际执行流程
##### 关于矩阵的变化和基础数学
##### canvas坐标系统和GL坐标系统
##### 装配与内插的过程
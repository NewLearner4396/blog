---
title: matlab常用方法
date: 2022-11-30
tags:
 - matlab
categories:
-  Basic
---

## matlab常用方法

### 生成采样信号

重点是注意采样间隔，也就是时间序列步进。

```matlab
fs = 15000000;
Ts = 1 / fs;
t = Ts * 15000;
N = t * fs;
t0 = linspace(0, t-Ts, N);
```

### 滤波器

```matlab
% 调用滤波器
b = fir1(n, wc, "low", rectwin(n+1));
y = filter(b, 1, x);
```

### 采样

```matlab
% 插值
%% 对xL倍插值 
y = interp(x, L);
%% 用FFT方法对x插值到N个点
y = interpft(x, N);
%% 在x之间插入L-1个0
y = upsample(x, L);

% 抽取
%% 对xM倍抽取；
y = decimate(x, M);
%% 在x中每M个点取一个值
y = downsample(x, M);
```

### figure

```matlab
% figure
%% 图窗左上角命名
figure('name', '..', 'numbertitle', 'off')
%% 保存当前生成的图片
%% 不是savefig，这个在matlab中是保存fig参数，保存路径的文件后缀名需为.fig
saveas(gcf, 'path'); 
```

### 序列

fliplr(x, (dim)) 沿某个轴对序列翻转

### 绘图

图窗有获取键盘按键接口，以及鼠标点击动作接口，如果当前没有图窗需要先生成一个才能使用。

```matlab
%% 按下任意按键后执行以下代码段
if ~isempty(get(gcf,'CurrentCharacter'))
        ...
end

%% 按下e后执行以下代码
if isequal(get(gcf,'CurrentCharacter'),'e')
        keyboard
end

%% 双击图窗后执行以下代码
if isequal(get(gcf,'SelectionType'),'open')
    ...
end
```

具体可查看文档`CurrentCharacter`及`SelectionType`部分

保存gif

```matlab
pic_num = 1;
for ***************************
    plot(fig(i));
    F=getframe(gcf);
    I=frame2im(F);
    [I,map]=rgb2ind(I,256);

    if pic_num == 1
    imwrite(I,map,'test.gif','gif','Loopcount',inf,'DelayTime',0.2);

    else
    imwrite(I,map,'test.gif','gif','WriteMode','append','DelayTime',0.2);

    end

    pic_num = pic_num + 1;

end
```

### 转义符

'' Single quotation mark
%% Percent character
\\ Backslash
\a Alarm
\b Backspace
\f Form feed
\n New line
\r Carriage return
\t Horizontal tab
\v Vertical tab
\xN Hexadecimal number, N
\N Octal number, N

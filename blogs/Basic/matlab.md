---
title: matlab���÷���
date: 2022-11-30
tags:
 - matlab
categories:
-  Basic
---

## matlab���÷���

### ���ɲ����ź�

�ص���ע����������Ҳ����ʱ�����в�����

```matlab
fs = 15000000;
Ts = 1 / fs;
t = Ts * 15000;
N = t * fs;
t0 = linspace(0, t-Ts, N);
```

### �˲���

```matlab
% �����˲���
b = fir1(n, wc, "low", rectwin(n+1));
y = filter(b, 1, x);
```

### ����

```matlab
% ��ֵ
%% ��xL����ֵ 
y = interp(x, L);
%% ��FFT������x��ֵ��N����
y = interpft(x, N);
%% ��x֮�����L-1��0
y = upsample(x, L);

% ��ȡ
%% ��xM����ȡ��
y = decimate(x, M);
%% ��x��ÿM����ȡһ��ֵ
y = downsample(x, M);
```

### figure

```matlab
% figure
%% ͼ�����Ͻ�����
figure('name', '..', 'numbertitle', 'off')
%% ���浱ǰ���ɵ�ͼƬ
%% ����savefig�������matlab���Ǳ���fig����������·�����ļ���׺����Ϊ.fig
saveas(gcf, 'path'); 
```

### ����

fliplr(x, (dim)) ��ĳ��������з�ת

### ��ͼ

ͼ���л�ȡ���̰����ӿڣ��Լ�����������ӿڣ������ǰû��ͼ����Ҫ������һ������ʹ�á�

```matlab
%% �������ⰴ����ִ�����´����
if ~isempty(get(gcf,'CurrentCharacter'))
        ...
end

%% ����e��ִ�����´���
if isequal(get(gcf,'CurrentCharacter'),'e')
        keyboard
end

%% ˫��ͼ����ִ�����´���
if isequal(get(gcf,'SelectionType'),'open')
    ...
end
```

����ɲ鿴�ĵ�`CurrentCharacter`��`SelectionType`����

����gif

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

### ת���

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

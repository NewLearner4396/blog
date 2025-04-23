---
title: LED调光-除了PWM之外
date: 2025-04-19
tags:
 - 嵌入式
 - LED
categories:
 -  C
---

## LED调光正确方式

### PWM控制亮度

可以调节PWM波的占空比调节LED灯明亮时间控制人眼感知到的LED亮度。

但是人眼对暗部变化更敏感，如果单纯只是PWM占空比线性增加的话，感觉就是灭-暗-很亮，暗的时间很短，亮的时候变化又不明显，体感上并不是线性增加亮度。

所以需要在感觉亮度变化快的时间段内降低电压变化率，在感觉亮度变化慢的时间段内提高电压变化率，也就是一条幂曲线。

### DALI调光曲线

$$
X(n) = 10^{\frac{n-1}{253/3}-1}
$$

![DALI调光曲线值](https://image.krins.cloud/0ec25e8d4d3bd882c67b4ccf916eb5c2.png)

n: 1-254 控制值

X:0.1-100 灯光亮度%

#### C语言实现

```c
#include <math.h>
#include <stdint.h>

// 将 0-1 的亮度百分比转换为 DALI 调光值（0~254）
uint8_t brightness_to_dali(double brightness) {
    if (brightness == 0.0) {
        return 0;  // 表示关闭
    }
    if (brightness >= 1.0) {
        return 254;  // 最大亮度
    }

    // 使用公式 n = 1 + (log10(x*100) + 1) * (253 / 3) x取值(0, 1]
    double log_value = log10(brightness*100);
    double n_real = 1.0 + (log_value + 1.0) * (253.0 / 3.0);

    // 四舍五入并截断范围
    uint8_t dali_value = (uint8_t)(n_real + 0.5);
    if (dali_value < 1) dali_value = 1;
    if (dali_value > 254) dali_value = 254;
    return dali_value;
}
// 将 DALI 调光值（0~254）的亮度百分比转换为 0-1 
double dali_to_brightness(uint8_t dali_value){
    if(dali_value <= 0){
        return 0.0;
    }
    if(dali_value >= 254){
        return 1.0;
    }
    
    // X(n) = 10 ^ ((n-1)/253*3-1) 
    // [1, 254]->(0,100]
    double expo = ((double)(dali_value-1) / 253.0 * 3.0) - 1.0;
    double brightness = pow(10.0. exponent);
    double brightness /= 100;
    return brightness;
}
```

### RGB与HSV互转

**H**：`H ∈ [0, 360)`：色相角度（度）→ 颜色的种类（红、绿、蓝…）

**S**：`S ∈ [0.0, 1.0]`：饱和度 → 颜色的纯度（0 是灰色，1 是最鲜艳）

**V**：`V ∈ [0.0, 1.0]`：亮度 → 颜色的亮度（0 是黑，1 是最亮）

HSV 更符合人类对颜色的直观感受

![HSV cylinder](https://image.krins.cloud/81d7f81c16502c1e49f3216914418aa6.png)

#### RGB转HSV

**输入 R、G、B ∈ [0,255]**

1. 归一化：

   $R′=R/255, G′=G/255, B′=B/255$

2. 找最大最小值：

   $C_{max}=max⁡(R′,G′,B′),C_{max}=\max(R′,G′,B′)C_{max} = \max(R', G', B')$

   $C_{min} = \min(R', G', B'), C_{min}=\min(R′,G′,B′), C_{min}=\min(R′,G′,B′)$

   $\Delta = C_{max} - C_{min}$

3. **H（色相）：**

   - 如果 $\Delta = 0$，则 $H = 0$
   - 如果 $C_{max} = R'$，则 $H = 60 \times \left( \frac{G' - B'}{\Delta} \right) \mod 360$
   - 如果 $C_{max} = G'$，则 $H = 60 \times \left( \frac{B' - R'}{\Delta} + 2 \right) \mod 360$
   - 如果 $C_{max} = B'$，则 $H = 60 \times \left( \frac{R' - G'}{\Delta} + 4 \right) \mod 360$

4. **S（饱和度）：**

   - 如果 $C_{max} = 0$，则 $S = 0$
   - 否则 $S = \frac{\Delta}{C_{max}}$

5. **V（明度）：**

   - $V = C_{max}$

#### HSV转RGB

设 `C = V × S`
设 `H' = H / 60`（将 360° 划分为 6 个扇区）
设 `X = C × (1 - |H' mod 2 - 1|)`
设 `m = V - C`

根据 H 所处的区域：

| H范围         | R', G', B' 的顺序 |
| ------------- | ----------------- |
| 0 ≤ H < 60    | (C, X, 0)         |
| 60 ≤ H < 120  | (X, C, 0)         |
| 120 ≤ H < 180 | (0, C, X)         |
| 180 ≤ H < 240 | (0, X, C)         |
| 240 ≤ H < 300 | (X, 0, C)         |
| 300 ≤ H < 360 | (C, 0, X)         |

最后 RGB = (R'+m, G'+m, B'+m)，并映射到 [0,255] 区间即可。

#### 代码实现

```c
typedef struct {
    uint8_t r;  // 0-255
    uint8_t g;
    uint8_t b;
} RGB_u8;
typedef struct {
    double h;   // 0-360°
    double s;   // 0.0-1.0
    double v;   // 0.0-1.0
} HSV_d;
```



```c
void rgb_to_hsv(const RGB_u8* rgb, HSV_d* hsv) {
    double r = rgb->r / 255.0;
    double g = rgb->g / 255.0;
    double b = rgb->b / 255.0;

    double cmax = fmax(r, fmax(g, b));
    double cmin = fmin(r, fmin(g, b));
    double delta = cmax - cmin;

    hsv->v = cmax;

    if (delta < 1e-6) {
        hsv->h = 0.0;
        hsv->s = 0.0;
    } else {
        hsv->s = delta / cmax;

        if (cmax == r)
            hsv->h = fmod((60.0 * ((g - b) / delta) + 360.0), 360.0);
        else if (cmax == g)
            hsv->h = fmod((60.0 * ((b - r) / delta) + 120.0), 360.0);
        else
            hsv->h = fmod((60.0 * ((r - g) / delta) + 240.0), 360.0);
    }
}

void hsv_to_rgb(const HSV_d* hsv, RGB_u8* rgb) {
    double C = hsv->v * hsv->s;
    double X = C * (1.0 - fabs(fmod(hsv->h / 60.0, 2.0) - 1.0));
    double m = hsv->v - C;

    double r_p = 0, g_p = 0, b_p = 0;

    if (hsv->h < 60.0) {
        r_p = C; g_p = X;
    } else if (hsv->h < 120.0) {
        r_p = X; g_p = C;
    } else if (hsv->h < 180.0) {
        g_p = C; b_p = X;
    } else if (hsv->h < 240.0) {
        g_p = X; b_p = C;
    } else if (hsv->h < 300.0) {
        r_p = X; b_p = C;
    } else {
        r_p = C; b_p = X;
    }

    rgb->r = (uint8_t)(fmin(fmax((r_p + m) * 255.0, 0.0), 255.0));
    rgb->g = (uint8_t)(fmin(fmax((g_p + m) * 255.0, 0.0), 255.0));
    rgb->b = (uint8_t)(fmin(fmax((b_p + m) * 255.0, 0.0), 255.0));
}
```



### 参考

[一种平滑控制LED呼吸灯的方法#单片机](https://blog.csdn.net/weixin_45775305/article/details/128138914)

[DALI调光的计算方式](https://blog.csdn.net/lushoumin/article/details/70140950)

[线性调光与对数调光对调光效果有何影响](https://www.ledfriend.com/news/212.html)
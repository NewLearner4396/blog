---
title: stdio结合串口收发
date: 2023-12-02
tags:
 - STM32
 - HAL库
categories:
 -  STM32
---
## 不使用微库的串口printf及串口接收的多种处理

```c
#include <stdio.h>
#include "main.h"
#include "uart.h"
```

### 串口重定向
```c
#pragma import(__use_no_semihosting)
#ifdef __GNUC__
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif
struct __FILE
{  
	int handle;
};
FILE __stdout;
// FILE __stdin;
void _sys_exit(int x)
{
	x = x;
}
// 若是未引用"usart.h"要extern所用的串口号
// extern UART_HandleTypeDef huart2;
int fputc(int ch, FILE *f)
{
  HAL_UART_Transmit(&huart2, (uint8_t *)&ch, 1, 0xffff);// 修改为自己使用的串口
  return ch;
}
```
---
### 串口接收

#### 直接接收

直接使用`HAL_UART_Receive`函数一个字符一个字符接收

```c
HAL_UART_Receive(&huart1,receive_buff,10,0xff);// 接收10个字符
if(receive_buff[0] != 0)
{
    printf("recive buff is %s \r\n",receive_buff);
    memset(receive_buff,0,20); // 清除接收内容
}  
```

#### 使用中断接收

**初始化时记得打开串口的中断**

```c
uint8_t aRxBuffer;			//接收中断缓冲
uint8_t Uart1_RxBuff[256] = {0};		//接收缓冲
uint8_t Uart1_Rx_Cnt = 0;		//接收缓冲计数
uint8_t Uart1_RxFlag = 0;
uint8_t	cAlmStr[] = "数据溢出(大于256)\r\n";

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
    if (huart->Instance == USART1)
    {
        if(Uart1_Rx_Cnt >= 255)  //溢出判断
        {
            Uart1_Rx_Cnt = 0;
            memset(Uart1_RxBuff,0x00,sizeof(Uart1_RxBuff));
            HAL_UART_Transmit(&huart1, (uint8_t *)&cAlmStr, sizeof(cAlmStr),0xFFFF);// 发送溢出信号	
        }
        else
        {
            Uart1_RxBuff[Uart1_Rx_Cnt++] = aRxBuffer;   //接收数据转存
        
            if((Uart1_RxBuff[Uart1_Rx_Cnt-1] == 0x0A)&&(Uart1_RxBuff[Uart1_Rx_Cnt-2] == 0x0D)) //根据预先设定的结束帧判断结束
            {
                Uart1_RxFlag = 1; // 接收结束
            }
        }
        
        HAL_UART_Receive_IT(&huart1, (uint8_t *)&aRxBuffer, 1);   //再开启接收中断
    }
}
```
参考测试函数为
```c
HAL_UART_Receive_IT(&huart1,&aRxBuffer,1);
while (1)
{
    if(Uart1_RxFlag != 0)
    {
        printf("recive buff is %s\r\n",Uart1_RxBuff);
        Uart1_RxFlag = 0;
        Uart1_Rx_Cnt = 0;
        memset(Uart1_RxBuff,0x00,256);
    }
    HAL_Delay(10);
}
```

#### 使用定时器判断超时无数据发送

预设若是超过5ms未有新数据则判断接收结束，比上个方法好处是无需定义结束帧，避免结束帧出现在数据中间误触发退出机制。

因为预分频计数器是16bit最大为65535，而主频为M级别，所以我们一般能拿到的时间精度为0.1ms。
根据公式，$T=\frac{时钟频率}{(Prescaler+1)\times(CounterPeriod+1)}$，假设主频84MHz，计时周期设为5ms，预分频系数Prescaler为8399，计数周期CounterPeriod为49。

一样要定义接收相关变量和串口中断回调函数
```c
uint8_t aRxBuffer;			//接收中断缓冲
uint8_t Uart1_RxBuff[256] = {0};		//接收缓冲
uint8_t Uart1_Rx_Cnt = 0;		//接收缓冲计数
uint8_t Uart1_RxFlag = 0;
uint8_t	cAlmStr[] = "数据溢出(大于256)\r\n";

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
    if(huart -> Instance == USART1)
    {
        if(Uart1_Rx_Cnt == 0)
        {
            __HAL_TIM_CLEAR_FLAG(&htim6,TIM_FLAG_UPDATE);
            HAL_TIM_Base_Start_IT(&htim6);
            Uart1_RxBuff[Uart1_Rx_Cnt] = aRxBuffer;
            Uart1_Rx_Cnt ++;
            
        }
        else
        {
            Uart1_RxBuff[Uart1_Rx_Cnt ++] = aRxBuffer;
        }
        if(Uart1_Rx_Cnt >= 255)
        {
            Uart1_Rx_Cnt = 0;
            Uart1_RxFlag = 0;
            memset(Uart1_RxBuff,0x00,256);
        }
        HAL_UART_Receive_IT(&huart1,&aRxBuffer,1);
    }  
}
```

定时器回调函数设为

```c
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
    if(htim ->Instance == TIM6)
    {
        HAL_TIM_Base_Stop(&htim6);
        __HAL_TIM_SetCounter(&htim6,0);
        Uart1_RxFlag = 1;       
    }
}

```

测试函数并无不同

#### 使用DMA接收

当需要接收大片数据时可以启用DMA避免程序重复进入中断搬移数据到buffer中。

串口初始化如下：
（记得使能DMA和中断，我将串口速率设的比平常高。）

![20231206055037](https://image.krins.cloud/20231206055037.png)

![20231206055132](https://image.krins.cloud/20231206055132.png)

![20231206055203](https://image.krins.cloud/20231206055203.png)

CubeMX会帮我们将代码初始化好，但我们还需要在`usart.h`文件中定义一个接收结构体和一个自定义的使能函数，在`usart.c`中用上他们并把中断回调函数也写在这，不要忘记在`stm32f4xx_it.c`文件中把USART2的中断服务函数处理一下。
```c
#define USART_DMA_REC_SIZE 600
#define USART_REC_SIZE 1200

typedef struct
{
    uint8_t UsartRecFlag; // 标志位
    uint16_t UsartRecLen; // 接收数据长度
    uint16_t UsartDMARecLEN; // DMA 接收长度
    uint8_t  UsartDMARecBuffer[USART_DMA_REC_SIZE]; // DMA 接收数组
    uint8_t  UsartRecBuffer[USART_REC_SIZE]; // 接收组
}UART_UserTypeDef;

extern UART_UserTypeDef uusart2;
void EnableUsart_It(UART_HandleTypeDef* huart, UART_UserTypeDef* uusart);
```
```c
// 打开相关中断
void EnableUsart_It(UART_HandleTypeDef *huart, UART_UserTypeDef *uusart)
{
    __HAL_UART_ENABLE_IT(huart, UART_IT_RXNE);
    __HAL_UART_ENABLE_IT(huart, UART_IT_IDLE);
    __HAL_UART_CLEAR_IDLEFLAG(huart);
    HAL_UART_Receive_DMA(huart, uusart->UsartDMARecBuffer, USART_DMA_REC_SIZE);
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
    if (huart->Instance == USART2)
    {
        if (uusart2.UsartRecLen > 0)
        {
        memcpy(&uusart2.UsartRecBuffer[uusart2.UsartRecLen], uusart2.UsartDMARecBuffer, uusart2.UsartDMARecLEN);
        uusart2.UsartRecLen += uusart2.UsartDMARecLEN;
        }
        else
        {
        memcpy(&uusart2.UsartRecBuffer, uusart2.UsartDMARecBuffer, uusart2.UsartDMARecLEN);
        uusart2.UsartRecLen += uusart2.UsartDMARecLEN;
        }
        memset(uusart2.UsartDMARecBuffer, 0x00, 600);
        uusart2.UsartRecFlag = 1;
    }
}
```
```c
void USART2_IRQHandler(void)
{
    /* USER CODE BEGIN USART2_IRQn 0 */
    uint16_t temp = 0;
        __HAL_UART_CLEAR_IDLEFLAG(&huart2);
        HAL_UART_DMAStop(&huart2); // 关闭DMA
        temp = huart2.Instance -> SR; // 清除SR状态寄存器
        temp = huart2.Instance -> DR; // 清除DR数据寄存器，用来清除中断
        temp = hdma_usart2_rx.Instance -> NDTR; // 获取未传输的数据个数
        uusart2.UsartDMARecLEN = USART_DMA_REC_SIZE - temp;
        HAL_UART_RxCpltCallback(&huart2);

    /* USER CODE END USART2_IRQn 0 */
    HAL_UART_IRQHandler(&huart2);
    /* USER CODE BEGIN USART2_IRQn 1 */
    HAL_UART_Receive_DMA(&huart2, uusart2.UsartDMARecBuffer, USART_DMA_REC_SIZE); // 重新打开DMA
    /* USER CODE END USART2_IRQn 1 */
}
```
参考测试函数为
```c
int main(void)
{
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_DMA_Init();
    MX_USART1_UART_Init();

    EnableUsart_It(&huart2, &uusart2);
    while (1)
    {
        if(uusart2.UsartRecFlag == 1)
        {
            printf("rec buff is %s\r\n",uusart2.UsartRecBuffer);
            memset(uusart2.UsartRecBuffer,0x00,USART_REC_SIZE);
            uusart2.UsartRecLen = 0;
            uusart2.UsartRecFlag = 0;         
        }
        HAL_Delay(20);
    }
}
```

参考链接：[小记stm32实现串口接收的四种方法（hal库）](https://blog.csdn.net/qq_19655649/article/details/114390717)


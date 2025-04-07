---
title: C语言宏函数的一些使用技巧
date: 2025-04-02
tags:
 - MACRO
 - 嵌入式
categories:
-  C
---

## 你不知道的宏函数使用技巧

### 1. 单行宏函数

```c
#define add(a, b) (a + b)
```

- 用于简单的表达式替换。
- 注意括号的使用，避免运算优先级问题。

---

```c
#define ARW_DELAY_NS(ns)
#define ARW_DELAY_US(us)
#ifndef ARW_DELAY_NS
#error "请提供延迟函数"
#endif
```

- 提供函数接口。
- 用户需根据具体平台实现这些宏。
- 预处理时遇到`#error`命令会立刻停止编译并输出指定信息然后返回错误退出代码并报告包含错误信息的文件名和行号

### 2. 多行宏函数

```c
#define MULTILINE_MACRO(a, b) \
    do {                      \
        a += b;               \
        b *= 2;               \
    } while (0)
```

- `\`：告诉预处理器下一行是当前行的延续，反斜杠后不要有任何字符（包括空格）。
- 末尾没有`;`，最后一行没有`\`。
- 使用 `do { ... } while (0)` 包裹，确保宏在任何上下文中都能安全使用。
- 避免在`if-else`语句中作为带有结束符号的代码块，导致错误的分支解析。
- 避免潜在的语法错误。

### 3. 条件编译宏

```c
#if __has_include("FreeRTOS.h")
#define ARW_ENTER_CRITICAL()  \
    do {                      \
        taskENTER_CRITICAL(); \
        __disable_irq();      \
    } while (0)
#define ARW_EXIT_CRITICAL()  \
    do {                     \
        taskEXIT_CRITICAL(); \
        __enable_irq();      \
    } while (0)
#else
#define ARW_ENTER_CRITICAL() __disable_irq()
#define ARW_EXIT_CRITICAL() __enable_irq()
#endif
```

- 根据条件选择不同的实现。
- 常用于兼容不同平台或功能模块。

```c
/* 定义日志级别 */
/* 日志级别定义 */
#define ARW_LOG_LEVEL_NONE    0
#define ARW_LOG_LEVEL_ERROR   1
#define ARW_LOG_LEVEL_WARNING 2
#define ARW_LOG_LEVEL_INFO    3
#define ARW_LOG_LEVEL_DEBUG   4

/* 设置当前日志级别 */
#ifndef ARW_CURRENT_LOG_LEVEL
    #define ARW_CURRENT_LOG_LEVEL ARW_LOG_LEVEL_ERROR
#endif

/* 日志颜色（用于支持彩色输出的终端） */
#define ARW_LOG_COLOR_RED     "\033[1;31m"
#define ARW_LOG_COLOR_YELLOW  "\033[1;33m"
#define ARW_LOG_COLOR_GREEN   "\033[1;32m"
#define ARW_LOG_COLOR_BLUE    "\033[1;34m"
#define ARW_LOG_COLOR_RESET   "\033[0m"

/* 日志宏定义 */
#if ARW_CURRENT_LOG_LEVEL >= ARW_LOG_LEVEL_ERROR
    #define ARW_LOG_ERROR(fmt, ...) \
        ARW_PRINTF(ARW_LOG_COLOR_RED "[ERROR] %s:%d: " fmt ARW_LOG_COLOR_RESET "\n", \
                  __FILE__, __LINE__, ##__VA_ARGS__)
#else
    #define ARW_LOG_ERROR(fmt, ...) ((void)0)
#endif

#if ARW_CURRENT_LOG_LEVEL >= ARW_LOG_LEVEL_WARNING
    #define ARW_LOG_WARNING(fmt, ...) \
        ARW_PRINTF(ARW_LOG_COLOR_YELLOW "[WARN] %s:%d: " fmt ARW_LOG_COLOR_RESET "\n", \
                  __FILE__, __LINE__, ##__VA_ARGS__)
#else
    #define ARW_LOG_WARNING(fmt, ...) ((void)0)
#endif

#if ARW_CURRENT_LOG_LEVEL >= ARW_LOG_LEVEL_INFO
    #define ARW_LOG_INFO(fmt, ...) \
        ARW_PRINTF(ARW_LOG_COLOR_GREEN "[INFO] " fmt ARW_LOG_COLOR_RESET "\n", \
                  ##__VA_ARGS__)
#else
    #define ARW_LOG_INFO(fmt, ...) ((void)0)
#endif

#if ARW_CURRENT_LOG_LEVEL >= ARW_LOG_LEVEL_DEBUG
    #define ARW_LOG_DEBUG(fmt, ...) \
        ARW_PRINTF(ARW_LOG_COLOR_BLUE "[DEBUG] %s:%d: " fmt ARW_LOG_COLOR_RESET "\n", \
                  __FILE__, __LINE__, ##__VA_ARGS__)
#else
    #define ARW_LOG_DEBUG(fmt, ...) ((void)0)
#endif
```

- 文件名和行号信息
- 彩色输出（在支持的终端）
- 标准化的日志格式
- 统一的使用方式

### 4. 动态拼接宏

```c
#define ARW_WRITE_PIN(pin_name, state)                                                           \
    HAL_GPIO_WritePin(this->hardware.pin_name##_pin.port_ptr, this->hardware.pin_name##_pin.pin, \
                      state ? GPIO_PIN_SET : GPIO_PIN_RESET)
```

- 使用 `##` 拼接符动态生成变量名。
- 提高代码的灵活性。

---

```c
#define ARW_PRINTF(fmt, ...) printf(fmt, ##__VA_ARGS__)
```

- ##的特殊用法：当该参数为空时把前面的逗号删除，避免造成错误的函数调用

---

```c
#define X_ARW_ERROR_LIST                      \
    X_ARW_ERROR(Ok, Success)                  \
    X_ARW_ERROR(ErrNullPtr, Null pointer)     \
    X_ARW_ERROR(ErrSendMode, Sendmode error)  \
    X_ARW_ERROR(ErrDataSize, Data size error) \
    X_ARW_ERROR(ErrChipMode, Chip mode error) \
    X_ARW_ERROR(ErrSpiData, Spi data error)

#define X_ARW_ERROR(code, msg) kArw##code,
typedef enum ArwErr { X_ARW_ERROR_LIST } ArwErr_t;
#undef X_ARW_ERROR

#define X_ARW_ERROR(code, msg) #msg,
    const char* err_msg[] = {X_ARW_ERROR_LIST};
#undef X_ARW_ERROR
```

- 使用 `X_MACRO` 技术生成枚举值和对应的错误信息。
- 便于维护和扩展。

### 总结

- 宏函数是 C 语言中强大的工具，能够提高代码的复用性和灵活性。
- 在使用宏函数时，应注意其作用范围、潜在副作用以及调试难度。


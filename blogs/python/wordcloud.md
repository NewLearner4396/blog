---
title: 词云快速制作方法
date: 2022-09-10
tags:
 - 词云
categories:
 -  Python
---

## 如何快速制作一张词云

### 库

```python
import jieba
import wordcloud
```



### 获取分词字符串

```python
# 导入文件
f = open("path/filename.txt", "r")
t = f.read()
f.close()
```



### 去除常见标点

```python
def popPunctuation(strings):
    punctuation = r"""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~“”？，！【】（）、。：；’‘……￥·"""
    punctuationDict = {i: '' for i in punctuation}
    puncTable = str.maketrans(punctuationDict)
    strings = strings.translate(puncTable)
    return strings
```



### 创建停用词

```python
def stopwordslist(filepath):
    stopwords = [line.strip() for line in open(filepath, 'r', encoding='utf-8').readlines()]
    return stopwords
```

停用词下载链接：<https://github.com/goto456/stopwords>



### 分词

```python
def seg(strings):
    seged = jieba.cut(strings.strip()) # 删除头尾空白字符
    stopwords = stopwordslist('./cn_stopwords.txt')  # 这里加载停用词的路径
    outstr = ''
    for word in seged:
        if word not in stopwords:
            if word != '\t':
                outstr += word
                outstr += " "
    return outstr
```

#### 结巴分词

```python
s = jieba.cut(strings,cut_all=True)
# text传入要分词文本
# cut_all=True则整句逐词逐词分，False则会去掉前后重复的词
ls = jieba.lcut(strings,cut_all=True)
# 传回分好词的列表
s = jieba.cut_for_search(strings,True)
# 用于搜索引擎构建倒排索引的分词，粒度比较细
# True/False选择是否选择HMM模型
```



### 制作词云

#### wordcloud如何将文本转化为词云

- 1.分隔：以空格分隔单词
- 2.统计：单词出现次数并过滤
- 3.字体：根据统计配置字号
- 4.布局：颜色环境尺寸

```python
# 如果分词用的lcut：ls = jieba.lcut(strings)
# 则还需要加一句：txt = ' '.join(ls)，将其转为字符串

w = wordcloud.WordCloud(
    width=1600, height=900,
    background_color="white",
    font_path="msyh.ttc",
) # 配置参数
# 其他可选参数
# min_font_size、max_font_size:最小、最大字体字号
# font_step:字体字号的步进间隔，默认为1
# max_words:显示的最大单词数量，默认200
# stop_words:词云的排除词列表
# mask:指定词云聚集成的图形,默认为长方形，需要能读入图像的函数，如cv2.imread()、plt,imread()等等
# wordcloud.ImageColorGenerator配合mask，将词云文字颜色与图像颜色对应
# background_color:词云图片的背景颜色，默认为黑色
w.generate(txt) # 生成词云文本
# colors = wordcloud.ImageColorGenerator(cv2.imread('path'))
# w.recolor(color_func=colors)
w.to_file("wordcloud.png") # 输出词云文件
```

#### 修改字体颜色

```python
#!/usr/bin/env python
"""
Colored by Group Example
========================

Generating a word cloud that assigns colors to words based on
a predefined mapping from colors to words
"""

from wordcloud import (WordCloud, get_single_color_func)
import matplotlib.pyplot as plt


class SimpleGroupedColorFunc(object):
    """Create a color function object which assigns EXACT colors
       to certain words based on the color to words mapping

       Parameters
       ----------
       color_to_words : dict(str -> list(str))
         A dictionary that maps a color to the list of words.

       default_color : str
         Color that will be assigned to a word that's not a member
         of any value from color_to_words.
    """

    def __init__(self, color_to_words, default_color):
        self.word_to_color = {word: color
                              for (color, words) in color_to_words.items()
                              for word in words}

        self.default_color = default_color

    def __call__(self, word, **kwargs):
        return self.word_to_color.get(word, self.default_color)


class GroupedColorFunc(object):
    """Create a color function object which assigns DIFFERENT SHADES of
       specified colors to certain words based on the color to words mapping.

       Uses wordcloud.get_single_color_func

       Parameters
       ----------
       color_to_words : dict(str -> list(str))
         A dictionary that maps a color to the list of words.

       default_color : str
         Color that will be assigned to a word that's not a member
         of any value from color_to_words.
    """

    def __init__(self, color_to_words, default_color):
        self.color_func_to_words = [
            (get_single_color_func(color), set(words))
            for (color, words) in color_to_words.items()]

        self.default_color_func = get_single_color_func(default_color)

    def get_color_func(self, word):
        """Returns a single_color_func associated with the word"""
        try:
            color_func = next(
                color_func for (color_func, words) in self.color_func_to_words
                if word in words)
        except StopIteration:
            color_func = self.default_color_func

        return color_func

    def __call__(self, word, **kwargs):
        return self.get_color_func(word)(word, **kwargs)


wc = WordCloud(collocations=False).generate(text)


# 自定义所有单词的颜色
color_to_words = {
    # words below will be colored with a green single color function
    '#00ff00': ['beautiful', 'explicit', 'simple', 'sparse',
                'readability', 'rules', 'practicality',
                'explicitly', 'one', 'now', 'easy', 'obvious', 'better'],
    # will be colored with a red single color function
    'red': ['ugly', 'implicit', 'complex', 'complicated', 'nested',
            'dense', 'special', 'errors', 'silently', 'ambiguity',
            'guess', 'hard']
}

# Words that are not in any of the color_to_words values
# will be colored with a grey single color function
default_color = 'grey'

# Create a color function with single tone
# grouped_color_func = SimpleGroupedColorFunc(color_to_words, default_color)

# Create a color function with multiple tones
grouped_color_func = GroupedColorFunc(color_to_words, default_color)

# Apply our color function
wc.recolor(color_func=grouped_color_func)
w.to_file("wordcloud.png")
```

参考链接：<https://zhuanlan.zhihu.com/p/27626809>
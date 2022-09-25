---
title: Pandas库的学习笔记
date: 2022-09-03
tags:
 - Python
categories:
 -  Lang
---

## Pandas库的使用

`import pandas as pd`

### DataFrame的创建

`pd.DataFrame( data, index, columns, dtype, copy)`

| 参数名称 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| data     | 输入的数据，可以是 ndarray，series，list，dict，标量以及一个 DataFrame。 |
| index    | 行标签，如果没有传递 index 值，则默认行标签是 np.arange(n)，n 代表 data 的元素个数。 |
| columns  | 列标签，如果没有传递 columns 值，则默认列标签是 np.arange(n)。 |
| dtype    | dtype表示每一列的数据类型。                                  |
| copy     | 默认为 False，表示复制数据 data。                            |

1. 创建空的DataFrame

   `df = pd.DataFrame()`

   df：

   ```python
   Empty DataFrame
   Columns: []
   Index: []
   ```

2. 列表创建DataFrame对象

   ```python
   data = [1,2,3,4,5]
   df1 = pd.DataFrame(data)
   ```

   df1:

   ```python
        0
   0    1
   1    2
   2    3
   3    4
   4    5
   ```

   嵌套列表创建

   ```python
   data = [['Alex',10],['Bob',12],['Clarke',13]]
   df2 = pd.DataFrame(data,columns=['Name','Age'])
   ```

   df2:

   ```python
         Name      Age
   0     Alex      10
   1     Bob       12
   2     Clarke    13
   ```

3. 字典嵌套列表创建

   ```python
   data = {'Name':['Tom', 'Jack', 'Steve', 'Ricky'],'Age':[28,34,29,42]}
   df = pd.DataFrame(data, index=['rank1','rank2','rank3','rank4'])
   ```

   df:

   ```python
            Age    Name
   rank1    28      Tom
   rank2    34     Jack
   rank3    29    Steve
   rank4    42    Ricky
   ```

4. 列表嵌套字典创建

   ```python
   data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}]
   df = pd.DataFrame(data)
   ```

   df:

   ```python
       a    b      c
   0   1   2     NaN
   1   5   10   20.0
   ```

   注意：默认情况下，字典的键被用作列名。如果其中某个元素值缺失，也就是字典的 key 无法找到对应的 value，将使用 NaN 代替。

5. Series创建DataFrame对象

   ```python
   d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
      'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}
   df = pd.DataFrame(d)
   ```

   df:

   ```python
         one    two
   a     1.0    1
   b     2.0    2
   c     3.0    3
   d     NaN    4
   ```

   其输出结果的行索引是所有 index 的合集。

### 列索引操作

DataFrame 可以使用列索引（columns index）来完成数据的选取、添加和删除操作。

1. 选取‘one’这一列`df ['one']`

2. 选取‘one’到’two’之间的列`df['one':'two']`

3. 选取’one‘,’two’这两列`df['one','two']`

4. 使用df['列']=值，插入新的数据列

5. 使用 insert() 方法插入新的列

   ```python
   info=[['Jack',18],['Helen',19],['John',17]]
   df=pd.DataFrame(info,columns=['name','age'])
   print(df)
   #注意是column参数
   #数值1代表插入到columns列表的索引位置
   df.insert(1,column='score',value=[91,90,75])
   ```

   输出:

   ```python
   # 添加前：
       name  age
   0   Jack   18
   1  Helen   19
   2   John   17
   
   # 添加后：
       name  score  age
   0   Jack     91   18
   1  Helen     90   19
   2   John     75   17
   ```

6. del 和 pop() 都能够删除 DataFrame 中的数据列

   ```python
   del df['one']
   df.pop('two')
   ```

### 行索引操作DataFrame

1. 将行标签传递给 loc 函数，来选取数据。

   df.loc['b']

   loc 允许接两个参数分别是行和列，参数之间需要使用“逗号”隔开，但该函数只能接收标签索引。

2. 将行索引传递给 iloc 函数，来选取数据

   df.iloc[2]

   iloc 允许接受两个参数分别是行和列，参数之间使用“逗号”隔开，但该函数只能接收整数索引。

3. 切片

   `df[2:4]`  # 左闭右闭

4. 添加数据行

   ```python
   df = pd.DataFrame([[1, 2], [3, 4]], columns = ['a','b'])
   df2 = pd.DataFrame([[5, 6], [7, 8]], columns = ['a','b'])
   #在行末追加新数据行
   df = df.append(df2)
   ```

   该函数会在行末追加数据行。

5. 删除数据行

   ```python
   df = pd.DataFrame([[1, 2], [3, 4]], columns = ['a','b'])
   df2 = pd.DataFrame([[5, 6], [7, 8]], columns = ['a','b'])
   df = df.append(df2)
   #注意此处调用了drop()方法
   df = df.drop(0)
   ```

   输出：

   ```python
   # 执行drop(0)前：
      a  b
   0  1  2
   1  3  4
   0  5  6
   1  7  8
   
   # 执行drop(0)后：
     a b
   1 3 4
   1 7 8
   ```

### DataFrame常用属性

| 名称    | 属性&方法描述                                            |
| ------- | -------------------------------------------------------- |
| T       | 行和列转置。                                             |
| axes    | 返回一个仅以行轴标签和列轴标签为成员的列表。             |
| dtypes  | 返回每列数据的数据类型。                                 |
| empty   | DataFrame中没有数据或者任意坐标轴的长度为0，则返回True。 |
| ndim    | 轴的数量，也指数组的维数。                               |
| shape   | 返回一个元组，表示了 DataFrame 维度。                    |
| size    | DataFrame中的元素数量。                                  |
| values  | 使用 numpy 数组表示 DataFrame 中的元素值。               |
| head()  | 返回前 n 行数据。                                        |
| tail()  | 返回后 n 行数据。                                        |
| shift() | 将行或列移动指定的步幅长度                               |

其他一目了然，特别的，对shift()进行说明

`DataFrame.shift(periods=1, freq=None, axis=0)  `

| 参数名称   | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| peroids    | 类型为int，表示移动的幅度，可以是正数，也可以是负数，默认值为1。 |
| freq       | 日期偏移量，默认值为None，适用于时间序。取值为符合时间规则的字符串。 |
| axis       | 如果是 0 或者 "index" 表示上下移动，如果是 1 或者 "columns" 则会左右移动。 |
| fill_value | 该参数用来填充缺失值。                                       |

```python
import pandas as pd 
info= pd.DataFrame({'a_data': [40, 28, 39, 32, 18], 
'b_data': [20, 37, 41, 35, 45], 
'c_data': [22, 17, 11, 25, 15]}) 
#移动幅度为3
info.shift(periods=3)  
```

输出：

```python
   a_data  b_data  c_data
0     NaN     NaN     NaN
1     NaN     NaN     NaN
2     NaN     NaN     NaN
3    40.0    20.0    22.0
4    28.0    37.0    17.0
```

### 参考链接

[Pandas DataFrame入门教程（图解版）](http://c.biancheng.net/pandas/dataframe.html)

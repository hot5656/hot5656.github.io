---
title: python Pandas
abbrlink: fe93
date: 2024-04-17 11:36:16
categories: Coding
tags:
	- python
---

### Series,DataFrame Create
#### Series create - pandas 一維陣列

<!--more-->

``` py
# Series create - pandas 一維陣列
import pandas as pd

# Series create
se = pd.Series([1,2,3,4])
print(type(se))
print(se)
print(se.values)
print(se.index)
# <class 'pandas.core.series.Series'>
# 0    1
# 1    2
# 2    3
# 3    4
# dtype: int64
# [1 2 3 4]
# RangeIndex(start=0, stop=4, step=1)

# 自訂索引
stocks = ['p1', 'p2', 'p3', 'p4']
prices  = [42, 510, 694, 2115]
# index 索引
se2 = pd.Series(prices, index=stocks)
print('')
print(se2)
# p1      42
# p2     510
# p3     694
# p4    2115
# dtype: int64

# create Series by dict
dict1 = {'Taipei': '台北', 'Taichung': '台中', 'Kaohsiung': '高雄', }
se3 = pd.Series(dict1)
print('')
print(se3)
print(se3.values)
print(se3.index)
# Taipei       台北
# Taichung     台中
# Kaohsiung    高雄
# dtype: object
# ['台北' '台中' '高雄']
# Index(['Taipei', 'Taichung', 'Kaohsiung'], dtype='object')

# get value
print('')
print(se[2])
print(se3['Kaohsiung'])
# 3
# 高雄
```

#### DataFrame create - pandas 二維陣列
``` py
# DataFrame create - pandas 二維陣列
import pandas as pd
# create DataFrame
df = pd.DataFrame([[65,92,78,83,70],
                   [90,72,76,93,56],
                   [81,85,91,89,77],
                   [79,53,47,94,80]])
print('df1')
print(type(df))
print(df)
# <class 'pandas.core.frame.DataFrame'>
#     0   1   2   3   4
# 0  65  92  78  83  70
# 1  90  72  76  93  56
# 2  81  85  91  89  77
# 3  79  53  47  94  80

# 自訂索引,行
df2 = pd.DataFrame([[65,92,78,83,70],
                   [90,72,76,93,56],
                   [81,85,91,89,77],
                   [79,53,47,94,80]],
                  index=['大明','小王','張山','李四'],
                  columns=['英文','國文','數學','社會','生活'])
print('df2')
print(df2)
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
# 小王  90  72  76  93  56
# 張山  81  85  91  89  77
# 李四  79  53  47  94  80

# create DataFrame by dict
scores = {
 '英文':{'大明':65, '小王':90, '張山':81, '李四':79},
 '國文':{'大明':92, '小王':72, '張山':85, '李四':53},
 '數學':{'大明':25, '小王':92, '張山':21, '李四':72},
 '社會':{'大明':35, '小王':93, '張山':31, '李四':73},
 '生活':{'大明':45, '小王':94, '張山':41, '李四':74}
}
df3 = pd.DataFrame(scores)
print('df3')
print(df3)
#     英文  國文  數學  社會  生活
# 大明  65  92  25  35  45
# 小王  90  72  92  93  94
# 張山  81  85  21  31  41
# 李四  79  53  72  73  74

# create DataFrame by Series(dict)
se1 = pd.Series({'大明':65, '小王':90, '張山':81, '李四':79})
se2 = pd.Series({'大明':92, '小王':72, '張山':85, '李四':53})
se3 = pd.Series({'大明':25, '小王':92, '張山':21, '李四':72})
se4 = pd.Series({'大明':35, '小王':93, '張山':31, '李四':73})
se5 = pd.Series({'大明':45, '小王':94, '張山':41, '李四':74})
df4 = pd.DataFrame({
        '英文':se1,
        '國文':se2,
        '數學':se3,
        '社會':se4,
        '生活':se5})
print('df4')
print(df4)
#     英文  國文  數學  社會  生活
# 大明  65  92  25  35  45
# 小王  90  72  92  93  94
# 張山  81  85  21  31  41
# 李四  79  53  72  73  74

# create DataFrame by Series(concat)
se1 = pd.Series({'大明':65, '小王':90, '張山':81, '李四':79})
se2 = pd.Series({'大明':92, '小王':72, '張山':85, '李四':53})
se3 = pd.Series({'大明':25, '小王':92, '張山':21, '李四':72})
se4 = pd.Series({'大明':35, '小王':93, '張山':31, '李四':73})
se5 = pd.Series({'大明':45, '小王':94, '張山':41, '李四':74})
df5 = pd.concat([se1,se2,se3,se4,se5], axis=1)
df5.columns = ['英文','國文','數學','社會','生活']
print('df5')
print(df5)
#     英文  國文  數學  社會  生活
# 大明  65  92  25  35  45
# 小王  90  72  92  93  94
# 張山  81  85  21  31  41
# 李四  79  53  72  73  74
```

### DataFrame
#### DataFrame 取值
``` py
# DataFrame 取值
import pandas as pd

df = pd.DataFrame([[65,92,78,83,70],
                   [90,72,76,93,56],
                   [81,85,91,89,77],
                   [79,53,47,94,80]],
                  index=['大明','小王','張山','李四'],
                  columns=['英文','國文','數學','社會','生活'])
print(df)
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
# 小王  90  72  76  93  56
# 張山  81  85  91  89  77
# 李四  79  53  47  94  80

# 基本取值 column
print('--basic--')
print(df['數學'])
print(df[['英文','數學']])
# 基本取值 條件
print(df[df['國文'] > 80])
# 基本取值 以 values 取值
print(df.values)
print(df.values[1])
print(df.values[1][2])
# 大明    78
# 小王    76
# 張山    91
# 李四    47
# Name: 數學, dtype: int64
#     英文  數學
# 大明  65  78
# 小王  90  76
# 張山  81  91
# 李四  79  47
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
# 張山  81  85  91  89  77
# [[65 92 78 83 70]
#  [90 72 76 93 56]
#  [81 85 91 89 77]
#  [79 53 47 94 80]]
# [90 72 76 93 56]
# 76

# index+column 取值 .loc
print('--.loc--')
print(df.loc['小王','數學'])
print(df.loc['小王',['英文','數學']])
print(df.loc[['小王','李四'],['英文','數學']])
print(df.loc['小王':'李四','英文':'數學'])
print(df.loc['小王',:])
print(df.loc['張山':,:])
# 76
# 英文    90
# 數學    76
# Name: 小王, dtype: int64
#     英文  數學
# 小王  90  76
# 李四  79  47
#     英文  國文  數學
# 小王  90  72  76
# 張山  81  85  91
# 李四  79  53  47
# 英文    90
# 國文    72
# 數學    76
# 社會    93
# 生活    56
# Name: 小王, dtype: int64
#     英文  國文  數學  社會  生活
# 張山  81  85  91  89  77
# 李四  79  53  47  94  80

# index number+column number 取值 .iloc
print('--.iloc--')
print(df.iloc[3,4])
print(df.iloc[0,[0,4]])
print(df.iloc[[0,1],[2,3]])
print(df.iloc[0:3,2:5])
print(df.iloc[2,:])
print(df.iloc[:2,2:5])
print(df.iloc[1:,2:5])
# 80
# 英文    65
# 生活    70
# Name: 大明, dtype: int64
#     數學  社會
# 大明  78  83
# 小王  76  93
#     數學  社會  生活
# 大明  78  83  70
# 小王  76  93  56
# 張山  91  89  77
# 英文    81
# 國文    85
# 數學    91
# 社會    89
# 生活    77
# Name: 張山, dtype: int64
#     數學  社會  生活
# 大明  78  83  70
# 小王  76  93  56
#     數學  社會  生活
# 小王  76  93  56
# 張山  91  89  77
# 李四  47  94  80

# 取 最前幾列/最後幾列
print('--head/tail--')
print(df.head(2))
print(df.tail(2))
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
# 小王  90  72  76  93  56
#     英文  國文  數學  社會  生活
# 張山  81  85  91  89  77
# 李四  79  53  47  94  80

# DataFrmae 產生另一 DataFrmae
# 建立 DataFrmae
df = pd.DataFrame(data)
# 建立自變數和目標變數
X = df[['height', 'waist']]
y = df['weight']

# 移除部分column
features = data.drop(["ID", "default.payment.next.month"], axis=1)
X = df.drop(["Outcome"], axis=1)
```

#### DataFrame 操作
``` py
# DataFrame 操作
import pandas as pd

df = pd.DataFrame([[65,92,78,83,70],
                   [90,72,76,93,56],
                   [81,85,91,89,77],
                   [79,53,47,94,80]],
                  index=['大明','小王','李四','張山'],
                  columns=['英文','國文','數學','社會','生活'])
print(df)
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
# 小王  90  72  76  93  56
# 李四  81  85  91  89  77
# 張山  79  53  47  94  80

# 排序
# 依値排序
# ascending True(default)遞增, False遞減
print('--排序--')
print(df.sort_values(by='數學', ascending=False))
print(df.sort_values(['診斷年份','診斷週別'], ascending=[True, False]))
# inplace=True 表會直接更新 df
df.sort_values(['診斷年份','診斷週別'], ascending=[True, False], inplace=True)
# 依索引排序
# axis 0:index 1:column
print(df.sort_index(axis=0))
#     英文  國文  數學  社會  生活
# 李四  81  85  91  89  77
# 大明  65  92  78  83  70
# 小王  90  72  76  93  56
# 張山  79  53  47  94  80
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
# 小王  90  72  76  93  56
# 張山  79  53  47  94  80
# 李四  81  85  91  89  77

# 資料修改
# copy
df_copy = df.copy()
df.iloc[0,0] = 99
print('--修改--')
print(df)
#     英文  國文  數學  社會  生活
# 大明  99  92  78  83  70
# 小王  90  72  76  93  56
# 李四  81  85  91  89  77
# 張山  79  53  47  94  80

# 刪除
print('--刪除--')
df = df_copy
# 刪除列
print(df.drop('李四'))
# 刪除行
print(df.drop('數學', axis=1))
# 刪除連續列
print(df.drop(df.index[1:4]))
# 刪除連續行
print(df.drop(df.columns[1:4], axis=1))
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
# 小王  90  72  76  93  56
# 張山  79  53  47  94  80
#     英文  國文  社會  生活
# 大明  65  92  83  70
# 小王  90  72  93  56
# 李四  81  85  89  77
# 張山  79  53  94  80
#     英文  國文  數學  社會  生活
# 大明  65  92  78  83  70
#     英文  生活
# 大明  65  70
# 小王  90  56
# 李四  81  77
# 張山  79  80
```

#### 數值處理 - NaN 空值
``` py
# 數值處理 - NaN 空值
import pandas as pd

# NaN 表 空值
# isnull() : check NaN
# fillna(value, method): NaN 填入指定值
# dropna(): NaN 刪除
df = pd.read_csv('customer.csv')
print(df)
print('column NaN 統計:', df.isnull().sum())
print('index 有 NaN 的筆數', df.isnull().any(axis=1).sum())
print('column 有 NaN 的筆數', df.isnull().any(axis=0).sum())
print('age NaN 的紀錄:',df[df['age'].isnull()])
#          id name  gender   age    area         job
# 0   1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 1   1700002  吳俊諺     NaN   NaN  臺北市文山區     金融業和房地產
# 2   1700003  蔡俊毅     NaN   NaN  臺北市文山區    教育體育  文化
# 3   1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 4   1700004  姚鈺迪  Female  34.0  基隆市中正區      住宿和餐飲業
# 5   1700005  袁劭彥    Male  42.0  臺北市文山區     金融業和房地產
# 6   1700006  蔡登意     NaN   NaN     NaN     金融業和房地產
# 7   1700007  吳景翔     NaN  39.0     NaN       農林牧漁業
# 8   1700008  邱孝信     NaN  39.0     NaN     金融業和房地產
# 9   1700009  陳明輝     NaN  57.0  基隆市中正區     金融業和房地產
# 10  1700010  彭郁翔     NaN  55.0  基隆市中正區      住宿和餐飲業
# 11  1700011  許合蓉  Female  61.0  新北市三重區      住宿和餐飲業
# 12  1700012  武家豪    Male  53.0  新北市三重區       農林牧漁業
# 13  1700013  郭信邦     NaN  48.0  新北市三重區      教育體育文化
# 14  1700014  周聿綠  Female  57.0  基隆市中正區     金融業和房地產
# column NaN 統計:
# id        0
# name      0
# gender    8
# age       3
# area      3
# job       0
# dtype: int64
# index 有 NaN 的筆數 8
# column 有 NaN 的筆數 3
# age NaN 的紀錄:         id name gender  age    area       job
# 1  1700002  吳俊諺    NaN  NaN  臺北市文山區   金融業和房地產
# 2  1700003  蔡俊毅    NaN  NaN  臺北市文山區  教育體育  文化
# 6  1700006  蔡登意    NaN  NaN     NaN   金融業和房地產

# put NaN to 0
df_sample = df.copy()
df_sample['age'] = df_sample['age'].fillna(value=0)
print('-- fillna 0 --')
print(df_sample.head())
#         id name  gender   age    area         job
# 0  1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 1  1700002  吳俊諺     NaN   0.0  臺北市文山區     金融業和房地產
# 2  1700003  蔡俊毅     NaN   0.0  臺北市文山區    教育體育  文化
# 3  1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 4  1700004  姚鈺迪  Female  34.0  基隆市中正區      住宿和餐飲業

# 區失值填 0
final_df.fillna(0, inplace=True)

# put NaN to value
df_sample = df.copy()
df_sample['age'] = df_sample['age'].fillna(value=df_sample['age'].mean())
print('-- fillna mean() --')
print(df_sample.head())
#         id name  gender   age    area         job
# 0  1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 1  1700002  吳俊諺     NaN  45.0  臺北市文山區     金融業和房地產
# 2  1700003  蔡俊毅     NaN  45.0  臺北市文山區    教育體育  文化
# 3  1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 4  1700004  姚鈺迪  Female  34.0  基隆市中正區      住宿和餐飲業

# put NaN as forward/back
df_sample = df.copy()
df_sample['age'] = df_sample['age'].ffill()
df_sample['gender'] = df_sample['gender'].bfill()
print('-- fillna forward-fill:fffill/back-fill:bfill --')
print(df_sample.head())
print(df_sample.head(10))
#         id name  gender   age    area         job
# 0  1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 1  1700002  吳俊諺  Female  21.0  臺北市文山區     金融業和房地產
# 2  1700003  蔡俊毅  Female  21.0  臺北市文山區    教育體育  文化
# 3  1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 4  1700004  姚鈺迪  Female  34.0  基隆市中正區      住宿和餐飲業

# delete NaN record
df_sample = df.copy()
df_sample = df_sample.dropna()
print('-- dropna --' )
print(df_sample)
#          id name  gender   age    area         job
# 0   1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 3   1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 4   1700004  姚鈺迪  Female  34.0  基隆市中正區      住宿和餐飲業
# 5   1700005  袁劭彥    Male  42.0  臺北市文山區     金融業和房地產
# 11  1700011  許合蓉  Female  61.0  新北市三重區      住宿和餐飲業
# 12  1700012  武家豪    Male  53.0  新北市三重區       農林牧漁業
# 14  1700014  周聿綠  Female  57.0  基隆市中正區     金融業和房地產

# 多項計算
print(df.groupby('縣市')['確定病例數'].agg(['sum','count','max','min','mean']))
# sum	count	max	min	mean
# 縣市					
# 南投縣	2	2	1	1	1.000000
# 台中市	32	24	4	1	1.333333
# 台北市	83	56	10	1	1.482143
# 台南市	12	11	2	1	1.090909
# 嘉義市	3	3	1	1	1.000000
```

#### 數值處理 - 調整
``` py
# 數值處理 - 調整
import pandas as pd

df = pd.read_csv('customer.csv')
print(df)
#          id name  gender   age    area         job
# 0   1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 1   1700002  吳俊諺     NaN   NaN  臺北市文山區     金融業和房地產
# 2   1700003  蔡俊毅     NaN   NaN  臺北市文山區    教育體育  文化
# 3   1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 4   1700004  姚鈺迪  Female  34.0  基隆市中正區      住宿和餐飲業
# 5   1700005  袁劭彥    Male  42.0  臺北市文山區     金融業和房地產
# 6   1700006  蔡登意     NaN   NaN     NaN     金融業和房地產
# 7   1700007  吳景翔     NaN  39.0     NaN       農林牧漁業
# 8   1700008  邱孝信     NaN  39.0     NaN     金融業和房地產
# 9   1700009  陳明輝     NaN  57.0  基隆市中正區     金融業和房地產
# 10  1700010  彭郁翔     NaN  55.0  基隆市中正區      住宿和餐飲業
# 11  1700011  許合蓉  Female  61.0  新北市三重區      住宿和餐飲業
# 12  1700012  武家豪    Male  53.0  新北市三重區       農林牧漁業
# 13  1700013  郭信邦     NaN  48.0  新北市三重區      教育體育文化
# 14  1700014  周聿綠  Female  57.0  基隆市中正區     金融業和房地產


# 去除重複
df_sample = df.copy()
# subset 判斷欄位
# keep first第一筆, last最後一筆
# inplace True : 原資料更新
df_sample.drop_duplicates(subset='id', keep='first', inplace=True)
print('-- delete duplicate --')
print(df_sample)
#          id name  gender   age    area         job
# 0   1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 1   1700002  吳俊諺     NaN   NaN  臺北市文山區     金融業和房地產
# 2   1700003  蔡俊毅     NaN   NaN  臺北市文山區    教育體育  文化
# 3   1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 5   1700005  袁劭彥    Male  42.0  臺北市文山區     金融業和房地產
# 6   1700006  蔡登意     NaN   NaN     NaN     金融業和房地產

# 資料內容置換
# df.str.strip 去除左右空白
# df.str.lstrip 去除左邊空白
# df.str.rstrip 去除右邊空白
# df.str.replace(old,new) 替換文字
print('-- strip + replace --')
df_sample = df.copy()
df_sample['job'] = df_sample['job'].str.strip()
df_sample['job'] = df_sample['job'].str.replace(' ', '')
print(df_sample.head())
        # id name  gender   age    area      job
# 0  1700001  李國發    Male  21.0  新北市三重區  金融業和房地產
# 1  1700002  吳俊諺     NaN   NaN  臺北市文山區  金融業和房地產
# 2  1700003  蔡俊毅     NaN   NaN  臺北市文山區   教育體育文化
# 3  1700004  姚鈺迪  Female  34.0  基隆市中正區   住宿和餐飲業
# 4  1700004  姚鈺迪  Female  34.0  基隆市中正區   住宿和餐飲業

# 欄位格式調整
print('-- age type to int32 --')
# Cannot convert non-finite values (NA or inf) to integer
df_sample['age'] = df_sample['age'].ffill()
print("df_sample['age'] type)", type(df_sample['age'].dtype) )
df_sample['age'] = df_sample['age'].astype('int32')
print("df_sample['age'] type)", type(df_sample['age'].dtype) )
print(df_sample.head())
# df_sample['age'] type) <class 'numpy.dtypes.Float64DType'>
# df_sample['age'] type) <class 'numpy.dtypes.Int32DType'>
#         id name  gender  age    area      job
# 0  1700001  李國發    Male   21  新北市三重區  金融業和房地產
# 1  1700002  吳俊諺     NaN   21  臺北市文山區  金融業和房地產
# 2  1700003  蔡俊毅     NaN   21  臺北市文山區   教育體育文化
# 3  1700004  姚鈺迪  Female   34  基隆市中正區   住宿和餐飲業
# 4  1700004  姚鈺迪  Female   34  基隆市中正區   住宿和餐飲業
```

#### 資料篩選,分組運算
``` py
# 資料篩選,分組運算
import pandas as pd

df = pd.read_csv('customer.csv')
print(df)
#          id name  gender   age    area         job
# 0   1700001  李國發    Male  21.0  新北市三重區   金融業 和房地產
# 1   1700002  吳俊諺     NaN   NaN  臺北市文山區     金融業和房地產
# 2   1700003  蔡俊毅     NaN   NaN  臺北市文山區    教育體育  文化
# 3   1700004  姚鈺迪  Female  34.0  基隆市中正區    住宿 和 餐飲業
# 4   1700004  姚鈺迪  Female  34.0  基隆市中正區      住宿和餐飲業
# 5   1700005  袁劭彥    Male  42.0  臺北市文山區     金融業和房地產
# 6   1700006  蔡登意     NaN   NaN     NaN     金融業和房地產
# 7   1700007  吳景翔     NaN  39.0     NaN       農林牧漁業
# 8   1700008  邱孝信     NaN  39.0     NaN     金融業和房地產
# 9   1700009  陳明輝     NaN  57.0  基隆市中正區     金融業和房地產
# 10  1700010  彭郁翔     NaN  55.0  基隆市中正區      住宿和餐飲業
# 11  1700011  許合蓉  Female  61.0  新北市三重區      住宿和餐飲業
# 12  1700012  武家豪    Male  53.0  新北市三重區       農林牧漁業
# 13  1700013  郭信邦     NaN  48.0  新北市三重區      教育體育文化
# 14  1700014  周聿綠  Female  57.0  基隆市中正區     金融業和房地產

# 欄位條件
print('-- 欄位條件 --')
print(df[df['gender'] == 'Female'])
#          id name  gender   age    area        job
# 3   1700004  姚鈺迪  Female  34.0  基隆市中正區   住宿 和 餐飲業
# 4   1700004  姚鈺迪  Female  34.0  基隆市中正區     住宿和餐飲業
# 11  1700011  許合蓉  Female  61.0  新北市三重區     住宿和餐飲業
# 14  1700014  周聿綠  Female  57.0  基隆市中正區    金融業和房地產

# 欄位多條件
print('-- 欄位多條件 --')
print(df[(df['gender'] == 'Male') & (df['age'] > 50)])
#          id name gender   age    area    job
# 12  1700012  武家豪   Male  53.0  新北市三重區  農林牧漁業

# 包含多內容
print(df[df['縣市'].isin(["台北市","台中市","高雄市"])])

# 分組運算欄
print("-- gender's age mean --")
print(df.groupby('gender')['age'].mean())
# gender
# Female    46.500000
# Male      38.666667
# Name: age, dtype: float64

# 彙總統計
print("-- gender's age mean, min, max --")
print(df.groupby('gender')['age'].agg(['mean', 'min', 'max']))
#              mean   min   max
# gender
# Female  46.500000  34.0  61.0
# Male    38.666667  21.0  53.0
```

### DataFrame data access
#### read data
``` py
# read data
# read_csv():.csv
# read_json():.json
# read_excel():xlsx
# read_html():.html
# read_sql() :SQLite

import pandas as pd
# sep : 分隔號, default ','
# encoding : 編碼
df1 = pd.read_csv('covid19.csv')
print('csv', df1)
df2 = pd.read_json('./covid19.json')
print('json',df2)
# read_excel need install openpyxl : pip install openpyxl
df3 = pd.read_excel('./covid19.xlsx')
print('excel',df3)
# read_html need install lxml :
# keep_default_na  是否去除空値
url = 'https://www.tiobe.com/tiobe-index/'
tables = pd.read_html(url, keep_default_na=False)
# print(tables)
print('html',tables[0].head(10))
```

#### write data
``` py
# write data
# to_csv():.csv
# to_json():.json
# to_excel():xlsx
# to_html():.html
# to_sql() :SQLite
import pandas as pd

df = pd.DataFrame([[65,92,78,83,70],
                   [90,72,76,93,56],
                   [81,85,91,89,77],
                   [79,53,47,94,80]],
                  index=['大明','小王','李四','張山'],
                  columns=['英文','國文','數學','社會','生活'])
df.to_csv('scores2.csv')
# 不存索引
df.to_csv('new_diabetes.csv', index=False)
df.to_excel('scores2.xlsx')
df.to_json('scores2.json')
df.to_html('scores2.html')
```

### some special
#### show DataFrame 對齊
``` py
# column 對齊資料
pd.set_option('display.unicode.ambiguous_as_wide', True)
# 若含有中英文資料可以對齊
pd.set_option('display.unicode.east_asian_width', True)

print(df.head())
#     ID    Education
# 0  101         高中
# 1  102         大學
# 2  103         碩士
# 3  104         博士
# 4  105  high_school
```

#### option 設定
``` py
# 顯示所有 columns
pd.set_option('display.max_columns', None)
# 設定顯示每 row 長度
pd.set_option('display.width', 200)

# 設定輸出到第二位小數
pd.set_option('display.float_format', '{:.2f}'.format)
```

#### 檢查資料缺失
``` py
# isnull() 檢查資料缺失
print(boston.isnull().sum())
# column NaN 統計:
# id        0
# name      0
# gender    8
# age       3
# area      3
# job       0
# dtype: int64
```

#### 缺失值處理
``` py
# 將0值,替換為中位數
for column in columns_with_potential_missing_values:
    median = df[column].median()
    df[column] = df[column].replace(to_replace=0, value=median )

# 將 ? 轉成 np.nan
data = data.replace('?', np.nan)
```

#### show 出相互皮爾遜相關係數
``` py
# show 出相互皮爾遜相關係數
# > ±.7      相關性強
# ±.3 ~  ±.7 相關性中
# ±.1 ~  ±.3 相關性弱
# ≦ 0.1      相關性無
print(boston.corr())

# 使用程式挑最有相關的2個特徵
print(boston.corr().abs().nlargest(3, 'MEDV').index)
print(boston.corr().abs().nlargest(3, 'MEDV').values[:,13])

# show 出相互皮爾遜相關係數
# > ±.7      相關性強
# ±.3 ~  ±.7 相關性中
# ±.1 ~  ±.3 相關性弱
# ≦ 0.1      相關性無
print(boston.corr())

# 使用程式挑最有相關的2個特徵
print(boston.corr().abs().nlargest(3, 'MEDV').index)
print(boston.corr().abs().nlargest(3, 'MEDV').values[:,13])
```

#### 將兩個一維陣列組成二維陣列
``` py
# 將兩個一維陣列組成二維陣列
import numpy as np

a = np.array([1,2,3])
b = np.array([4,5,6])
c = np.c_[a, b]
print(c)
# [[1 4]
#  [2 5]
#  [3 6]]

# X = pd.DataFrame(np.c_[boston['LSTAT'], boston['RM']], columns=['LSTAT', 'RM'])
```

#### Series 轉成 array
``` py
print(f"測試真實分類\n{y_test.to_numpy()}")
```

#### 輸出數據統計資訊
``` py
print('輸出數據統計資訊')
print(df.describe())

# 輸出數據統計資訊
#        Pregnancies  Glucose  BloodPressure  SkinThickness  Insulin    BMI  DiabetesPedigreeF
# count       768.00   768.00         768.00         768.00   768.00 768.00
# mean          3.85   120.89          69.11          20.54    79.80  31.99
# 50%           3.00   117.00          72.00          23.00    30.50  32.00                      0.37  29.00     0.00
# 75%           6.00   140.25          80.00          32.00   127.25  36.60                      0.63  41.00     1.00
# max          17.00   199.00         122.00          99.00   846.00  67.10                      2.42  81.00     1.00
```

#### 輸出數據基本欄位資料
``` py
print(titanic.info())

# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 891 entries, 0 to 890
# Data columns (total 15 columns):
#  #   Column       Non-Null Count  Dtype
# ---  ------       --------------  -----
#  0   survived     891 non-null    int64
#  1   pclass       891 non-null    int64
#  2   sex          891 non-null    object
#  3   age          714 non-null    float64
#  4   sibsp        891 non-null    int64
#  5   parch        891 non-null    int64
#  6   fare         891 non-null    float64
#  7   embarked     889 non-null    object
#  8   class        891 non-null    category
#  9   who          891 non-null    object
#  10  adult_male   891 non-null    bool
#  11  deck         203 non-null    category
#  12  embark_town  889 non-null    object
#  13  alive        891 non-null    object
#  14  alone        891 non-null    bool
# dtypes: bool(2), category(2), float64(2), int64(4), object(5)
# memory usage: 80.7+ KB
```

#### 交叉分析
- {% post_link python-33 '# 交叉分析表格介紹' %}
- {% post_link python-33 '# 鐵達尼號交叉分析' %}

#### 列出原符號和對應的數值
``` py
or column in df.columns:
    if df[column].dtype == 'object':
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        if column != 'TotalCharges':
            # 列出原符號和對應的數值
            label_mapping = dict(zip(le.classes_, le.transform(le.classes_)))
            print(f"{column} {label_mapping}")
```

### function
#### get_dummies() 將類別變數轉為 one-hot 編碼
{% post_link python-32 '# One-hot 編碼' %}

#### rename() 用於重命名 DataFrame 或 Series 中的標籤
{% post_link python-32 '# 特徵名稱由中文改為英文' %}

#### map() 轉換資料為數值資料
{% post_link python-32 '# 資料對應 map() 方法' %}

#### 中位數
``` py
# 年齡補上中位數年齡
titanic_data['age'] = titanic_data['age'].fillna(titanic_data['age'].median())
```

#### 眾數
``` py
# 登船港口用眾位數取代缺失值
# mode() 傳回的是一個包含眾數的 Series，因此需要取 [0] 來獲取第一個眾數
titanic_data['embarked'] = titanic_data['embarked'].fillna(titanic_data['embarked'].mode()[0])
```

#### check column type
``` py
for column in df.columns:
		# check column type
    if df[column].dtype == 'object':
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
```

#### 刪除缺失值
``` py
# 刪除缺失值,處理缺失數據(本例其實不需要)
df= df.dropna()
```

#### 轉換日期
``` py
# Date 轉為日期型數據
final_df['Date'] = pd.to_datetime(final_df['Date'], format='%d/%m/%Y')

# 提出年份及月份
final_df['Year'] = final_df['Date'].dt.year
final_df['Month'] = final_df['Date'].dt.month
```

#### 更改 column name
``` py
final_df = final_df.rename(columns={'IsHoliday_x': 'IsHoliday'})
```

#### 合併 DataFrame
``` py
# 合併 features_df, sales_df, link key = 'Store' + 'Date'
merged_df = pd.merge(sales_df, features_df, on=['Store', 'Date'], how='left')
# 合併 stores_pd, link key = 'Store'
final_df = pd.merge(merged_df, stores_pd, on=['Store'], how='left')
```

#### Type 轉為數字
``` py
# 將 Type 轉成類型數據
# 將 Type 列的資料類型轉換為 category 類型
# .cat.codes：將類別型資料轉換為對應的數字編碼。每個類別將被分配一個整數編碼（從0開始）
final_df['Type'] = final_df['Type'].astype('category').cat.codes

# 將類別轉成數字
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
categorical_features = [i for i in data.columns if data.dtypes[i]=='object' ]
for col in categorical_features:
    data[col] = le.fit_transform(data[col])
```

#### 資料 2D 轉 1D
``` py
# 資料 2D 轉 1D : y.values.ravel() 2D 轉 1D
print(y)
print(y.values.ravel())
#      MEDV
# 0    24.0
# 1    21.6
# 2    34.7
# 3    33.4
# 4    36.2
# [24.  21.6 34.7 33.4 36.2 28.7 ...
```

#### 取出 columns' name
``` py
features = X.columns
```

### 繪圖
#### 長條圖
``` py
# 繪圖 - 長條圖
import pandas as pd
import matplotlib.pyplot as plt

# 加入中文字體
import matplotlib
from matplotlib.font_manager import fontManager
# 加入中文字體
fontManager.addfont('NotoSansTC-Regular.ttf')
matplotlib.rc('font', family='Noto Sans TC')
#                             default
# kind        圖形形式        Line(折線圖)
# title       圖形標題        None
# legend      顯示圖示說明    True
# grid        格線           False
# xlim        繪 x軸 刻度範圍 None
# ylim        繪 y軸 刻度範圍 None
# xtick       繪圖形 x軸刻度  None
# ytick       繪圖形 y軸刻度  None
# x           設定 x軸 資料   None
# y           設定 y軸 資料   None
# fontsize    設定 x,y軸刻度字體大小  None
# figsize     設定圖形長度及寬度      None
# kind: line(折線圖), hist(直方圖), scatter(散佈圖),
#       bar(長條圖), barh(橫條圖), pie(圓餅圖)

df = pd.DataFrame([[250,320,300,312,280],
                   [280,300,280,290,315],
                   [220,280,250,305,250]],
                  index = ['北部','中部','南部',],
                  columns = [2015,2016,2017,2018,2019])

g1 = df.plot(kind='bar', title='長條圖', figsize=[10,5])
g2 = df.plot(kind='barh', title='橫條圖', figsize=[10,5])
g3 = df.plot(kind='bar', stacked=True, title='堆疊圖', figsize=[10,5])
# also need srun plt.show()
plt.show()
```

#### 折線圖
``` py
# 繪圖 - 折線圖
import pandas as pd
import matplotlib.pyplot as plt

# 加入中文字體
import matplotlib
from matplotlib.font_manager import fontManager
# 加入中文字體
fontManager.addfont('NotoSansTC-Regular.ttf')
matplotlib.rc('font', family='Noto Sans TC')

df = pd.DataFrame([[250,320,300,312,280],
                   [280,300,280,290,315],
                   [220,280,250,305,250]],
                  index = ['北部','中部','南部',],
                  columns = [2015,2016,2017,2018,2019])

g1 = df.iloc[0].plot(kind='line', legend=True,
                            xticks=range(2015,2020),
                            title = '公司年度銷售表',
                            figsize=[10,5])
g1 = df.iloc[1].plot(kind='line', legend=True,
                            xticks=range(2015,2020))
g1 = df.iloc[2].plot(kind='line', legend=True,
                            xticks=range(2015,2020))
plt.show()
```

``` py
pd_stock = pd.read_csv(file_name, encoding='utf-8')
pd_stock.plot(kind='line', figsize=(12,6), x='日期',
              y=['收盤價', '最低價', '最高價'])

plt.show()
```

#### 圓餅圖
``` py
# 繪圖 - 圓餅圖
import pandas as pd
import matplotlib.pyplot as plt

# 加入中文字體
import matplotlib
from matplotlib.font_manager import fontManager
# 加入中文字體
fontManager.addfont('NotoSansTC-Regular.ttf')
matplotlib.rc('font', family='Noto Sans TC')

df = pd.DataFrame([[40,320,300,312,280],
                   [280,300,280,290,30],
                   [220,280,25,305,250]],
                  index = ['北部','中部','南部',],
                  columns = [2015,2016,2017,2018,2019])
# subplots=True 多張圖放在一個區域
df.plot(kind='pie', subplots=True, figsize=[20,20])
plt.show()
```
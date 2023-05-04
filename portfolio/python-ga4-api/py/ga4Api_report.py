import re
import pandas as pd
import numpy as np
from datetime import datetime as dt
from ga4Api_download import report, reportPath


noData = 'none'
# ga4Api_vars.py所定義的Site()類會作為site輸入
# ga4Api_date.py所定義的DateRange()類會作為dates輸入


def readData(site, dates, file: str):
    # file格式為tabA_1.pkl，A_1會改變，去除_1.pkl以選取合適的function
    key = re.sub(r'_\d+.pkl$', '', file)
    # 根據檔案類型以不同function處理
    fucs = {'tabA': tabA, 'tabB': tabB, 'tabC': tabC, 'tabD': tabD}
    while True:
        try:
            df = pd.read_pickle(f'{reportPath}/{site.site}/{dates.start_s}-{dates.end_s}/{file}')
            break
        except FileNotFoundError:
            # 如果檔案不存在則下載所需檔案
            fucs[key](site, dates)
    # 如果沒有資料則回傳一列為None的資料
    return pd.DataFrame({noData: [None]}) if df.empty else df


def tabA(site, dates):
    report(property_id=site.property_id, site=site.site, tab='tabA_1', start=dates.start_s,
           end=dates.end_s, dimensions=site.dimensions_A_1, metrics=site.metrics_A_1)
    report(property_id=site.property_id, site=site.site, tab='tabA_2',
           start=dates.start_s, end=dates.end_s, metrics=site.metrics_A_2)


def tabB(site, dates):
    report(property_id=site.property_id, site=site.site, tab='tabB_1', start=dates.start_s,
           end=dates.end_s, dimensions=site.dimensions_B, metrics=site.metrics_B)


def tabC(site, dates):
    report(property_id=site.property_id, site=site.site, tab='tabC_1', start=dates.start_s,
           end=dates.end_s, dimensions=site.dimensions_C_1, metrics=site.metrics_C_1)
    report(property_id=site.property_id, site=site.site, tab='tabC_2', start=dates.start_s,
           end=dates.end_s, dimensions=site.dimensions_C_2, metrics=site.metrics_C_2)
    report(property_id=site.property_id, site=site.site, tab='tabC_3', start=dates.start_s,
           end=dates.end_s, dimensions=site.dimensions_C_3, metrics=site.metrics_C_3)
    report(property_id=site.property_id, site=site.site, tab='tabC_4', start=dates.start_s,
           end=dates.end_s, dimensions=site.dimensions_C_4, metrics=site.metrics_C_4)


def tabD(site, dates):
    report(property_id=site.property_id, site=site.site, tab='tabD_1', start=dates.start_s,
           end=dates.end_s, dimensions=site.dimensions_D, metrics=site.metrics_D)


def repA(site, dates):
    df1 = readData(site, dates, 'tabA_1.pkl')
    df2 = readData(site, dates, 'tabA_2.pkl')
    if noData in df1.columns == df2.columns:
        df = df1
    else:
        df1['country'] = np.where(df1['country'] == 'Taiwan', '國內', '國際')
        df1[['sessions', 'activeUsers', 'ecommercePurchases', 'purchaseRevenue']] = df1[['sessions', 'activeUsers', 'ecommercePurchases', 'purchaseRevenue']].applymap(float)
        df = pd.concat([df1[['sessions', 'activeUsers', 'ecommercePurchases', 'purchaseRevenue']].agg('sum').to_frame().T,
                        df1.groupby('country')['activeUsers'].sum().to_frame().T.rename(index={'activeUsers': 0}),
                        df2], axis=1).rename(columns={'sessions': '總人次', 'activeUsers': '總人數', 'ecommercePurchases': '電子商務轉換數', 'purchaseRevenue': '收益', 'screenPageViewsPerSession': '平均瀏覽頁數', 'averageSessionDuration': '平均停留時間', 'bounceRate': '跳出率(%)'})
        df['日平均'] = (df['總人次'] / dates.days).round(0)
        df['跳出率(%)'] = df['跳出率(%)'].astype(float) * 100
        df[['平均瀏覽頁數', '跳出率(%)']] = df[['平均瀏覽頁數', '跳出率(%)']].applymap(lambda x: round(float(x), 2))
        df['平均停留時間'] = df['平均停留時間'].apply(lambda x: '{:02d}:{:02d}'.format(*divmod(round(float(x)), 60)))
        df['收益'] = df['收益'].round(0)
    return df.reindex(columns=site.tabA, fill_value=None)


def repB(site, dates, v=1):
    df = readData(site, dates, 'tabB_1.pkl')
    if v == 1:
        expCols = site.tabB
    else:
        expCols = site.tabC0
    if noData not in df.columns:
        medium = ['廣告流量', '社群流量', '直效推廣', '自然搜尋', '外部連結']
        df['管道流量'] = np.select(
            condlist=[df['sessionSourceMedium'].str.contains(w) for w in [r'cpc$|^(?:popin|taitra)', r'^fb \/', r'EZMail|newsletter|ibmi_edm|ibmi_web|BenchmarkEmail|edm|inno_edm|line', r'organic$', r'referral$']],
            choicelist=medium,
            default='直接流量'
        )
        df['sessions'] = df['sessions'].astype(int)
        df = df[['管道流量', 'sessions']].groupby('管道流量')['sessions'].sum().to_frame().T.rename(index={'sessions': 0})
        medium = [m for m in medium+['直接流量'] if m in df.columns]
        for m in medium:
            df[f'{m}(%)'] = (df[m] / df[medium].sum(axis=1) * 100).round(2)
    return df.reindex(columns=expCols, fill_value=None)


def repC(site, dates, v):
    if v == 1:
        df1 = readData(site, dates, 'tabC_1.pkl')
        df2 = readData(site, dates, 'tabC_2.pkl')
        date = 'yearWeek'
        dateCols = dates.weeks()
        dfmt = '%Y%U'
    elif v == 2:
        df1 = readData(site, dates, 'tabC_3.pkl')
        df2 = readData(site, dates, 'tabC_4.pkl')
        date = 'date'
        dateCols = dates.dates()
        dfmt = '%Y%m%d'
    if noData in df1.columns == df2.columns:
        df = df1
    else:
        mediums = ['廣告流量', '社群流量', '直效推廣', '自然搜尋', '外部連結']
        df1['country'] = np.where(df1['country'] == 'Taiwan', '國內', '國際')
        df1[['sessions', 'activeUsers', 'ecommercePurchases', 'purchaseRevenue']] = df1[['sessions', 'activeUsers', 'ecommercePurchases', 'purchaseRevenue']].applymap(float)
        df1['purchaseRevenue'] = df1['purchaseRevenue'].round(0)
        df2[['screenPageViewsPerSession', 'averageSessionDuration', 'bounceRate']] = df2[['screenPageViewsPerSession', 'averageSessionDuration', 'bounceRate']].applymap(float)
        df2['bounceRate'] = df2['bounceRate'] * 100
        df2[['screenPageViewsPerSession', 'averageSessionDuration', 'bounceRate']] = df2[['screenPageViewsPerSession', 'averageSessionDuration', 'bounceRate']].applymap(lambda x: round(x, 2))
        df1['管道流量'] = np.select(condlist=[df1['sessionSourceMedium'].str.contains(w) for w in [r'cpc$|^(?:popin|taitra)', r'^fb \/', r'EZMail|newsletter|ibmi_edm|ibmi_web|BenchmarkEmail|edm|inno_edm|line', r'organic$', r'referral$']],
                                choicelist=mediums,
                                default='直接流量')
        sessions = df1.groupby([date])[['sessions', 'activeUsers', 'ecommercePurchases', 'purchaseRevenue']].sum().reset_index()
        country = df1.groupby([date, 'country'])['sessions'].sum().reset_index()
        country = pd.concat([country.query(f'country=="{w}"')[[date, 'sessions']].rename(columns={'sessions': w}).set_index(date) for w in ['國內', '國際']], axis=1)
        medium = df1.groupby([date, '管道流量'])['sessions'].sum().reset_index()
        medium = pd.concat([medium.query(f'管道流量=="{w}"')[[date, 'sessions']].rename(columns={'sessions': w}).set_index(date) for w in mediums + ['直接流量']], axis=1)
        df = sessions.merge(pd.concat([country, medium], axis=1).reset_index(level=0), on=date, how='outer').merge(df2, on=date, how='outer').merge(pd.DataFrame({date: [d[0].strftime(dfmt) for d in dateCols]}), on=date, how='right').rename(columns={'sessions': '總人次', 'activeUsers': '總人數', 'screenPageViewsPerSession': '平均瀏覽頁數', 'averageSessionDuration': '平均停留時間', 'bounceRate': '跳出率(%)', 'ecommercePurchases': '電子商務轉換數', 'purchaseRevenue': '收益'})
        if v == 1:
            df['date'] = df[date].apply(lambda x: dt.strptime(f'{x}0', '%Y%U%w'))
        elif v == 2:
            df['date'] = df[date].apply(lambda x: dt.strptime(x, '%Y%m%d'))
    return df.fillna(0).reindex(columns=site.tabC, fill_value=None).loc[::-1].T


def repD(site, dates):
    df = readData(site, dates, 'tabD_1.pkl').head(30)
    df['averageSessionDuration'] = df['averageSessionDuration'].apply(lambda x: '{:02d}:{:02d}'.format(*divmod(round(float(x)), 60)))
    df['screenPageViews'] = df['screenPageViews'].apply(int)
    return df.reindex(columns=['unifiedScreenName', 'A', 'B', 'screenPageViews', 'averageSessionDuration'], fill_value=None)

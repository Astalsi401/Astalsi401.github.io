import os
import logging
import pandas as pd
from openpyxl import load_workbook
from ga4Api_date import DateRange
from ga4Api_vars import example
from ga4Api_report import repA, repB, repC, repD
from ga4Api_toExcel import List

os.chdir(os.path.dirname(os.path.abspath(__file__)))
pd.set_option('display.max.columns', None)
f = load_workbook(filename='../xlsx/output - 模版.xlsx')
f_path = '../xlsx/output.xlsx'
daterange = DateRange()

# Dimensions & Metrics
# https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema


def getReport(site):
    dfA = pd.concat([repA(site, dates) for dates in [daterange.lastyear, daterange.year, daterange.lastyearWeek, daterange.lastweek, daterange.week]])
    dfA = pd.concat([pd.DataFrame([{c: c for c in dfA.columns}]), dfA])
    dfB = pd.concat([repB(site, dates) for dates in [daterange.lastyear, daterange.year, daterange.lastyearWeek, daterange.lastweek, daterange.week]])
    dfB = pd.concat([pd.DataFrame([{c: c for c in dfB.columns}]), dfB])
    dfC0 = repB(site, daterange.year, 2).merge(repA(site, daterange.year), left_index=True, right_index=True).reindex(columns=site.tabC)
    dfC0['date'] = daterange.year.start.strftime('%Y')
    dfC1 = dfC0.T.merge(repC(site, daterange.year, 1), left_index=True, right_index=True)
    dfC2 = repC(site, daterange.year, 2)
    dfD1 = repD(site, daterange.week)
    dfD2 = repD(site, daterange.year)
    ws = f[site.sheet]
    List(dfA.fillna(0).values.tolist()).toExcel(ws, row=4, col=5)
    List(dfB.fillna(0).values.tolist()).toExcel(ws, row=12, col=5)
    List(dfC1.fillna(0).values.tolist()).toExcel(ws, row=4, col=19)
    List(dfC2.fillna(0).values.tolist()).toExcel(ws, row=28, col=19)
    List(dfD1.values.tolist()).toExcel(ws, row=20, col=4)
    List(dfD2.values.tolist()).toExcel(ws, row=20, col=10)
    List([[daterange.lastyear.start.year],
          [daterange.year.start.year],
          ['去年同期'],
          [f"{daterange.lastweek.start.strftime('%m/%d')} - {daterange.lastweek.end.strftime('%m/%d')}"],
          [f"{daterange.week.start.strftime('%m/%d')} - {daterange.week.end.strftime('%m/%d')}"]]).toExcel(ws, row=5, col=4)
    List([[daterange.lastyear.start.year],
          [daterange.year.start.year],
          ['去年同期'],
          [f"{daterange.lastweek.start.strftime('%m/%d')} - {daterange.lastweek.end.strftime('%m/%d')}"],
          [f"{daterange.week.start.strftime('%m/%d')} - {daterange.week.end.strftime('%m/%d')}"]]).toExcel(ws, row=13, col=4)


def main():
    getReport(example)
    f.save(f_path)
    logging.info(f'{f_path} saved!')


if __name__ == '__main__':
    logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO, handlers=[logging.FileHandler('../.temp/ga.log'), logging.StreamHandler()])
    main()

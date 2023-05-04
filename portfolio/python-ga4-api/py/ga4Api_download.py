import os
import logging
import pandas as pd
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange


os.chdir(os.path.dirname(os.path.abspath(__file__)))
# Set environment variables
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = f'../client/client_secrets.json'
reportPath = '../db'


def creatFolder(path: str):
    # 如果路徑不存在則創建並回傳路徑
    os.makedirs(path, exist_ok=True)
    return path


def ga4_response_to_df(response):
    # 將GA4 API回傳的資料轉為dataframe
    all_data = []
    for row in response.rows:
        row_data = {}
        for i in range(0, len(response.dimension_headers)):
            row_data.update({response.dimension_headers[i].name: row.dimension_values[i].value})
        for i in range(0, len(response.metric_headers)):
            row_data.update({response.metric_headers[i].name: row.metric_values[i].value})
        all_data.append(row_data)
    return pd.DataFrame(all_data)


def report(property_id: int, site: str, tab: str, start: str, end: str, dimensions=[], metrics=[]):
    # 下載GA資料並儲存為.pkl
    # property_id = 資源ID
    # site = 網站英文代號
    # tab = 表格類型
    # start = 開始日期
    # end = 結束日期
    path = creatFolder(f'{reportPath}/{site}/{f"{start}-{end}" if start!=end else start}')
    client = BetaAnalyticsDataClient()
    request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[{'name': d} for d in dimensions],
        metrics=[{'name': m} for m in metrics],
        date_ranges=[DateRange(start_date=start, end_date=end)],
    )
    response = client.run_report(request)
    df = ga4_response_to_df(response)
    df.to_pickle(f'{path}/{tab}.pkl')
    logging.info(f'{path}/{tab}.pkl saved!')
    return df

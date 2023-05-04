from datetime import datetime as dt, timedelta as td, date

dateFmt = '%Y-%m-%d'


class DateRange:
    class Range:
        def __init__(self, start, end) -> None:
            self.start = start
            self.end = end
            self.start_s = self.start.strftime(dateFmt)
            self.end_s = self.end.strftime(dateFmt)
            self.days = (self.end - self.start).days + 1

        def dates(self):
            # 回傳開始到結束間每一天的日期
            return [[j, j] for i in range(self.days) for j in [(self.start + td(days=i))] if j < self.end]

        def weeks(self):
            # 回傳開始到結束間每週日的日期
            return [[(self.start + td(days=i)), (self.start + td(days=i + 6))] for i in range(0, self.days, 7) if self.start + td(days=i + 6) < self.end]

    def weekday(self, input_date):
        # 回傳輸入日期前一週的週日
        return input_date - td(days=input_date.weekday() + 8)

    def __init__(self, input_date=dt.today().date()) -> None:
        year, weekISO, day_of_week = input_date.isocalendar()
        weekStart = self.weekday(input_date)
        lastyearWeek = dt.strptime(f'{year-1}-{weekISO}-0', '%Y-%U-%w').date()
        # 輸入日期的前一週
        self.week = self.Range(weekStart, weekStart + td(days=6))
        # 輸入日期的前前週
        self.lastweek = self.Range(self.week.start - td(days=7), self.week.end - td(days=7))
        # 今年
        self.year = self.Range(date(year, 1, 1), input_date)
        # 去年
        self.lastyear = self.Range(date(year - 1, 1, 1), date(year - 1, 12, 31))
        # 去年與今天同一週
        self.lastyearWeek = self.Range(lastyearWeek, lastyearWeek + td(days=6))

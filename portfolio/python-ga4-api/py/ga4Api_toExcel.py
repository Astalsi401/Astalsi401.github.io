class List(list):
    def toExcel(self, workSheet, row: int, col: int or str):
        for i, rowData in enumerate(self):
            for j, cellData in enumerate(rowData):
                workSheet.cell(row=row+i, column=col+j, value=cellData)

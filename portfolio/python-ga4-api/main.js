class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "定義下載日期區間",
        content: (
          <div>
            <CodeChunkFromFile path="./py/ga4Api_date.py" lang="python" />
          </div>
        ),
      },
      {
        title: "下載報表",
        content: (
          <div>
            <CodeChunkFromFile path="./py/ga4Api_download.py" lang="py" />
          </div>
        ),
      },
      {
        title: "讀取並彙整為所需格式",
        content: (
          <div>
            <CodeChunkFromFile path="./py/ga4Api_report.py" lang="python" />
          </div>
        ),
      },
      {
        title: "將list匯出至excel的特定位置",
        content: (
          <div>
            <CodeChunkFromFile path="./py/ga4Api_toExcel.py" lang="python" />
          </div>
        ),
      },
      {
        title: "定義需下載的資源資訊",
        content: (
          <div>
            <CodeChunkFromFile path="./py/ga4Api_vars.py" lang="python" />
          </div>
        ),
      },
      {
        title: "執行程式",
        content: (
          <div>
            <CodeChunkFromFile path="./py/ga4Api_main.py" lang="python" />
          </div>
        ),
      },
    ];
  }
  render() {
    return (
      <div>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </div>
    );
  }
}

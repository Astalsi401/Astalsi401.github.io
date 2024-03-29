const Content = () => {
  const sections = [
    {
      title: "定義下載日期區間",
      content: <CodeChunkFromFile path="./py/ga4Api_date.py" lang="python" />,
    },
    {
      title: "下載報表",
      content: <CodeChunkFromFile path="./py/ga4Api_download.py" lang="py" />,
    },
    {
      title: "讀取並彙整為所需格式",
      content: <CodeChunkFromFile path="./py/ga4Api_report.py" lang="python" />,
    },
    {
      title: "將list匯出至excel的特定位置",
      content: <CodeChunkFromFile path="./py/ga4Api_toExcel.py" lang="python" />,
    },
    {
      title: "定義需下載的資源資訊",
      content: <CodeChunkFromFile path="./py/ga4Api_vars.py" lang="python" />,
    },
    {
      title: "執行程式",
      content: <CodeChunkFromFile path="./py/ga4Api_main.py" lang="python" />,
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};

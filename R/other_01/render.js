ReactDOM.createRoot(document.getElementById("App-header")).render(<Header category="R" />);
ReactDOM.createRoot(document.getElementById("1-1")).render(
  <Block
    title="networkD3"
    content={
      <div>
        <ul>
          <li>
            載入套件包
            <CodeChunk code={`library(networkD3)\nlibrary(magrittr)\nlibrary(dplyr)`} language="r" />
            <CodeChunk code={`## \n## 載入套件：'dplyr'`} language="output" />
            <CodeChunk code={`## 下列物件被遮斷自 'package:stats':\n## \n##     filter, lag`} language="output" />
            <CodeChunk code={`## 下列物件被遮斷自 'package:base':\n## \n##     intersect, setdiff, setequal, union`} language="output" />
          </li>
          <li>
            輸入資料
            <p>
              本資料為2020立委選舉期間，營利事業捐贈之政治獻金資料，資料中只包含本屆(第10屆)立委。原始資料來源於<a href="https://ardata.cy.gov.tw/home">監察院政治獻金公開查閱平台</a>。
            </p>
            <p>經整理後建立以下檔案:</p>
            <ol>
              <li>
                <p>edgelist：edges list格式之資料，actors包含立委與企業，edges為政治獻金。</p>
              </li>
              <li>
                <p>nodes：nodes的屬性，區分為企業、國民黨、民進黨、無黨籍、台灣基進，日後將對企業之產業別進行細分。</p>
              </li>
              <li>
                <p>edges：edges的屬性，以政治獻金金額（inc_n）區分，分為三個層級，在圖中以不同寬度顯示。</p>
                <ul>
                  <li>
                    <p>inc_n &lt;= 100000</p>
                  </li>
                  <li>
                    <p>100000 &lt; inc_n &lt; 500000</p>
                  </li>
                  <li>
                    <p>inc_n &gt;= 500000</p>
                  </li>
                </ul>
              </li>
            </ol>
            <CodeChunk code={`rm(list = ls())\nsetwd("D:/documents/data/legislative_elections_109/r-net")\n\n# 匯入edgelist\nedgelist <- read.csv("edgelist.csv", header = T, sep = ",", fileEncoding="UTF-8-BOM")\nsrc <- edgelist$src\ntarget <- edgelist$target\nnodes <- read.csv("nodes.csv", header = T, sep = ",", fileEncoding="UTF-8-BOM")\n# 可能是編碼原因導致匯入檔案時出現多於變項，在此進行清理\nname <- nodes$name\nid <- nodes$id\ngroup <- nodes$group\nsize <- nodes$nodesize\nrm(nodes)\nnodes <- data.frame(name, id, group, size)\n\n# 建立edges資訊\nedges <- edgelist %>%\n  left_join(nodes, by = c("src" = "name")) %>%\n  select(-src) %>%\n  rename(source = id) %>%\n  left_join(nodes, by = c("target" = "name")) %>%\n  select(-target) %>%\n  rename(target = id)\n\n# 匯入政治獻金金額(inc_n)\nw <- read.csv("edges.csv", header = T, sep = ",", fileEncoding="UTF-8-BOM")\nedges$width <- w$inc_n`} language="r" />
          </li>
          <li>
            開始繪圖
            <CodeChunk code={`# 為nodes上色\nColourScale <- 'd3.scaleOrdinal()\n            .domain(["企業", "國民黨", "民進黨", "無黨籍", "台灣基進"])\n           .range(["#000000", "#8C8CFF", "#96FF96", "#CFCFCF", "#FF5959"]);'\n\n# 繪圖\nforceNetwork(Links = edges, Nodes = nodes, \n             Source = "source",\n             Target = "target",\n             NodeID ="name",\n             Nodesize = "size",\n             Group = "group",\n             Value = "width",\n             opacity = 0.9,\n             zoom = T,\n             legend = T,\n             fontSize = 24,\n             fontFamily = "fantasy",\n             colourScale = JS(ColourScale))`} language="r" />
            <div className="w-lg-50 w-sm-75 mx-auto"></div>
          </li>
        </ul>
      </div>
    }
  />
);

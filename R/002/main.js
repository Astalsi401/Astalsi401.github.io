class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: ".csv",
        content: (
          <div>
            <CodeChunk code={`setwd("D:/Documents/R/site/data")\nlist.files()`} lang="r" />
            <CodeChunk code={`## [1] "data.fauxhigh.csv"   "edges.fauxhigh.csv"  "export01.csv"       \n## [4] "export02.csv"        "export03.rdata"      "export04_ids.rds"   \n## [7] "export05.dta"        "matrix.fauxhigh.csv"`} lang="output" />
            <CodeChunk code={`# 將匯入的文件命名為fauxhs\nfauxhs <- read.csv("data.fauxhigh.csv")\nhead(fauxhs)`} lang="r" />
            <CodeChunk code={`##   ids grade gender  race      gpa\n## 1   1     7      F  Hisp 3.074965\n## 2   2     7      F  Hisp 1.826402\n## 3   3    10      F White 2.521067\n## 4   4    11      M NatAm 1.976382\n## 5   5     9      M White 1.599860\n## 6   6     9      M  Hisp 1.288948`} lang="output" />
            <CodeChunk code={`# 匯出為csv\n# 方法1\nwrite.csv(fauxhs, file = "export01.csv")\nlist.files()`} lang="r" />
            <CodeChunk code={`## [1] "data.fauxhigh.csv"   "edges.fauxhigh.csv"  "export01.csv"       \n## [4] "export02.csv"        "export03.rdata"      "export04_ids.rds"   \n## [7] "export05.dta"        "matrix.fauxhigh.csv"`} lang="output" />
            <CodeChunk code={`# 方法2\n# sep <- 逗點分隔\n# row.names = F <- 不匯出列名稱\n# na = "NA" <- 設定遺漏直\nwrite.table(fauxhs, file = "export02.csv", sep = ",", row.names = F, na = "NA")\nlist.files()`} lang="r" />
            <CodeChunk code={`## [1] "data.fauxhigh.csv"   "edges.fauxhigh.csv"  "export01.csv"       \n## [4] "export02.csv"        "export03.rdata"      "export04_ids.rds"   \n## [7] "export05.dta"        "matrix.fauxhigh.csv"`} lang="output" />
          </div>
        ),
      },
      {
        title: ".Rdata",
        content: (
          <div>
            <p>用以儲存多個變項組成的資料</p>
            <CodeChunk code={`setwd("D:/Documents/R/site/data")\n\n# 匯出\nsave(fauxhs, file = "export03.rdata")\nlist.files()`} lang="r" />
            <CodeChunk code={`## [1] "data.fauxhigh.csv"   "edges.fauxhigh.csv"  "export01.csv"       \n## [4] "export02.csv"        "export03.rdata"      "export04_ids.rds"   \n## [7] "export05.dta"        "matrix.fauxhigh.csv"`} lang="output" />
            <CodeChunk code={`# 匯入\nload("export03.rdata")`} lang="r" />
          </div>
        ),
      },
      {
        title: ".rds",
        content: (
          <div>
            <p>用來儲存單一變項</p>
            <CodeChunk code={`setwd("D:/Documents/R/site/data")\n\n# 例如：只儲存fauxhs中的ids變項\nhead(fauxhs)`} lang="r" />
            <CodeChunk code={`##   ids grade gender  race      gpa\n## 1   1     7      F  Hisp 3.074965\n## 2   2     7      F  Hisp 1.826402\n## 3   3    10      F White 2.521067\n## 4   4    11      M NatAm 1.976382\n## 5   5     9      M White 1.599860\n## 6   6     9      M  Hisp 1.288948`} lang="output" />
            <CodeChunk code={`saveRDS(fauxhs$ids, file = "export04_ids.rds")\nlist.files()`} lang="r" />
            <CodeChunk code={`## [1] "data.fauxhigh.csv"   "edges.fauxhigh.csv"  "export01.csv"       \n## [4] "export02.csv"        "export03.rdata"      "export04_ids.rds"   \n## [7] "export05.dta"        "matrix.fauxhigh.csv"`} lang="output" />
            <CodeChunk code={`# 匯入rds\n# 將重新匯入的ids命名為newids\nnewids <- readRDS("export04_ids.rds")\nhead(newids)`} lang="r" />
            <CodeChunk code={`## [1] 1 2 3 4 5 6`} lang="output" />
            <CodeChunk code={`# 將ids.rds重新匯入fauxhs中，成為一個新的變項\nfauxhs$newids <- readRDS("export04_ids.rds")\nhead(fauxhs)`} lang="r" />
            <CodeChunk code={`##   ids grade gender  race      gpa newids\n## 1   1     7      F  Hisp 3.074965      1\n## 2   2     7      F  Hisp 1.826402      2\n## 3   3    10      F White 2.521067      3\n## 4   4    11      M NatAm 1.976382      4\n## 5   5     9      M White 1.599860      5\n## 6   6     9      M  Hisp 1.288948      6`} lang="output" />
          </div>
        ),
      },
      {
        title: ".dta",
        content: (
          <div>
            <CodeChunk code={`setwd("D:/Documents/R/site/data")\n\n# 匯出.dta\n\n#install.packages("foreign")\nrequire(foreign)`} lang="r" />
            <CodeChunk code={`## Loading required package: foreign`} lang="output" />
            <CodeChunk code={`write.dta(fauxhs, "export05.dta")\nlist.files()`} lang="r" />
            <CodeChunk code={`## [1] "data.fauxhigh.csv"   "edges.fauxhigh.csv"  "export01.csv"       \n## [4] "export02.csv"        "export03.rdata"      "export04_ids.rds"   \n## [7] "export05.dta"        "matrix.fauxhigh.csv"`} lang="output" />
            <CodeChunk code={`# 匯入.dta\n\nimport_dta <- read.dta("export05.dta", convert.dates = T, convert.factors = T, missing.type = F, convert.underscore = F, warn.missing.labels = T)\nhead(import_dta)`} lang="r" />
            <CodeChunk code={`##   ids grade gender  race      gpa newids\n## 1   1     7      F  Hisp 3.074965      1\n## 2   2     7      F  Hisp 1.826402      2\n## 3   3    10      F White 2.521067      3\n## 4   4    11      M NatAm 1.976382      4\n## 5   5     9      M White 1.599860      5\n## 6   6     9      M  Hisp 1.288948      6`} lang="output" />
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

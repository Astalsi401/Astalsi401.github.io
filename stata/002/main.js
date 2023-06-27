class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "工作目錄",
        content: (
          <>
            <p>匯入資料前最好先確認STATA的工作目錄，這樣可以減少需要輸入的路徑的長度。</p>
            <p>
              <code>cd "路徑"</code>：直接指定工作目錄
            </p>
            <CodeChunk code={`cd "C:\\Users\\misti\\Documents\\Stata\\unify"`} lang="stata" />
            <CodeChunk code={`. cd "C:\\Users\\misti\\Documents\\Stata\\unify"\nC:\\Users\\misti\\Documents\\Stata\\unify`} lang="output" />
            <p>
              <code>pwd</code>：確認當前目錄
            </p>
            <CodeChunk code={`pwd`} lang="stata" />
            <CodeChunk code={`. pwd\nC:\\Users\\misti\\Documents\\Stata\\unify`} lang="output" />
            <p>
              <code>cd ..</code>：回到上一層目錄
            </p>
            <CodeChunk code={`cd ..`} lang="stata" />
            <CodeChunk code={`. cd ..\nC:\\Users\\misti\\Documents\\Stata`} lang="output" />
            <p>
              <code>ls</code>：確認目前工作目錄中有哪些檔案及資料夾
            </p>
            <CodeChunk code={`ls`} lang="stata" />
            <CodeChunk code={`. ls\n<dir>  11/18/20 13:42  .                 \n<dir>  11/18/20 13:42  ..                \n<dir>   6/10/20 14:20  data              \n1929.2k  11/18/20 20:40  stata-1.html      \n2.4k  11/17/20 21:32  stata.html        \n314.7k  11/14/19 13:03  stata快捷.png   \n1908.7k  11/17/20 20:13  test.html         \n<dir>   6/09/20 11:40  thesis            \n<dir>  11/19/20 19:42  unify             \n0.2k   4/19/18 12:41  中文編碼轉換.do\n<dir>   6/03/20 12:53  天下雜誌-選舉\n<dir>  10/29/20 21:31  教學文件      \n<dir>   9/23/20 15:36  社會一         \n<dir>  10/29/20 21:31  社會三         \n<dir>   9/23/20 15:37  社會二         \n<dir>   9/23/20 15:50  社會四     `} lang="output" />
            <p>
              <code>cd 資料夾名稱</code>：進入當前目錄中的資料夾，如此處為unify。
            </p>
            <CodeChunk code={`cd unify`} lang="stata" />
            <CodeChunk code={`. cd unify\nC:\\Users\\misti\\Documents\\Stata\\unify`} lang="output" />
          </>
        ),
      },
      {
        title: "資料檔匯入",
        content: (
          <>
            <div className="my-2">
              <div className="text-bold text-large">
                Txt匯入：<code>insheet</code>
              </div>
              <p>直接從指定的目錄匯入，無須變更工作目錄。</p>
              <CodeChunk code={`insheet using "C:\\Users\\misti\\Documents\\Stata\\社會一\\社會統計\\統計1-06\\grade.txt", clear\nta v1`} lang="stata" />
              <CodeChunk code={`. insheet using "C:\\Users\\misti\\Documents\\Stata\\社會一\\社會統計\\統計1-06\\grade.txt", clear\n(1 var, 34 obs)\n. ta v1\n         v1 |      Freq.     Percent        Cum.\n------------+-----------------------------------\n         40 |          5       14.71       14.71\n         60 |          2        5.88       20.59\n         61 |          2        5.88       26.47\n         62 |          1        2.94       29.41\n         63 |          1        2.94       32.35\n         65 |          1        2.94       35.29\n         68 |          1        2.94       38.24\n         69 |          1        2.94       41.18\n         70 |          2        5.88       47.06\n         71 |          1        2.94       50.00\n         72 |          1        2.94       52.94\n         73 |          2        5.88       58.82\n         75 |          1        2.94       61.76\n         77 |          1        2.94       64.71\n         78 |          1        2.94       67.65\n         79 |          1        2.94       70.59\n         82 |          1        2.94       73.53\n         86 |          2        5.88       79.41\n         88 |          2        5.88       85.29\n         90 |          1        2.94       88.24\n         91 |          1        2.94       91.18\n         92 |          1        2.94       94.12\n         94 |          1        2.94       97.06\n         96 |          1        2.94      100.00\n------------+-----------------------------------\n      Total |         34      100.00\n. /*路徑、檔案與變項名稱請自行更改*/`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">
                Csv匯入：<code>insheet</code>
              </div>
              <CodeChunk code={`cd data\ninsheet using data1b.csv, c n clear  /*c 導入逗點分隔值檔案*/\nsort id /*以id排序*/\nlist in 1/10 /*列出這份資料的前10筆*/`} lang="stata" />
              <CodeChunk code={`. cd data\nC:\\Users\\misti\\Documents\\Stata\\unify\\data\n\n. insheet using data1b.csv, c n clear  /*c 導入逗點分隔值檔案*/\n(3 vars, 30 obs)\n\n. sort id /*以id排序*/\n\n. list in 1/10 /*列出這份資料的前10筆*/\n\n     +--------------------+\n     | id   male   score1 |\n     |--------------------|\n  1. | 31      0       64 |\n  2. | 32      0       70 |\n  3. | 33      0       61 |\n  4. | 34      0       67 |\n  5. | 35      0       84 |\n     |--------------------|\n  6. | 36      0       67 |\n  7. | 37      0       63 |\n  8. | 38      0       80 |\n  9. | 39      0       71 |\n 10. | 40      0       52 |\n     +--------------------+`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">
                Excel檔匯入（.Xlsx）：<code>import</code>
              </div>
              <CodeChunk code={`import exc data2b.xlsx, first clear\n/*import exc option\nfirst: first row as var name\nsheet("sheetname")*/\nsort id\nlist in 1/10`} lang="stata" />
              <CodeChunk code={`. import exc data2b.xlsx, first clear\n. /*import exc option\n. first: first row as var name\n. sheet("sheetname")*/\n\n. sort id\n\n. list in 1/10\n\n     +----------------------------+\n     | id   score2   class   dist |\n     |----------------------------|\n  1. |  1       56       3      3 |\n  2. |  2       63       2      3 |\n  3. |  3       52       3      5 |\n  4. |  4       59       1      4 |\n  5. |  5       78       2      1 |\n     |----------------------------|\n  6. |  6       59       3      5 |\n  7. |  7       55       3      5 |\n  8. |  8       74       3      5 |\n  9. |  9       64       3      4 |\n 10. | 10       43       1      1 |\n     +----------------------------+`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">匯入有多個分頁的Excel</div>
              <p>
                <code>cellra(A2)</code>: 從A2開始讀取資料
              </p>
              <CodeChunk code={`import exc using data2b.xlsx, sh("sheetname") cellra(A2) first clear`} lang="stata" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">
                STATA資料檔匯入（.dta）：<code>use</code>
              </div>
              <CodeChunk code={`use data1a, clear\nlist in 1/5\ncd ..`} lang="stata" />
              <CodeChunk code={`. use data1a, clear\n. list in 1/5\n     +--------------------+\n     | id   male   score1 |\n     |--------------------|\n  1. |  1      1       58 |\n  2. |  2      1       65 |\n  3. |  3      1       55 |\n  4. |  4      1       62 |\n  5. |  5      1       78 |\n     +--------------------+\n. cd ..\nC:\\Users\\misti\\Documents\\Stata\\unify`} lang="output" />
            </div>
          </>
        ),
      },
      {
        title: "資料檔匯出",
        content: (
          <>
            <p>
              <code>sysuse auto, clear</code>清除上一筆資料，使用stata內建，名為auto的資料
            </p>
            <p>查看資料中的變項。</p>
            <CodeChunk code={`sysuse auto, clear\ndes\ncd data`} lang="stata" />
            <CodeChunk code={`. sysuse auto, clear\n(1978 Automobile Data)\n\n. des\n\nContains data from D:\\Tools\\Stata15\\ado\\base/a/auto.dta\n  obs:            74                          1978 Automobile Data\n vars:            12                          13 Apr 2016 17:45\n size:         3,182                          (_dta has notes)\n---------------------------------------------------------------------------------------------\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------\nmake            str18   %-18s                 Make and Model\nprice           int     %8.0gc                Price\nmpg             int     %8.0g                 Mileage (mpg)\nrep78           int     %8.0g                 Repair Record 1978\nheadroom        float   %6.1f                 Headroom (in.)\ntrunk           int     %8.0g                 Trunk space (cu. ft.)\nweight          int     %8.0gc                Weight (lbs.)\nlength          int     %8.0g                 Length (in.)\nturn            int     %8.0g                 Turn Circle (ft.)\ndisplacement    int     %8.0g                 Displacement (cu. in.)\ngear_ratio      float   %6.2f                 Gear Ratio\nforeign         byte    %8.0g      origin     Car type\n---------------------------------------------------------------------------------------------\nSorted by: foreign\n\n. cd data\nD:\\documents\\stata\\stata\\unify\\data`} lang="output" />
            <div className="my-2">
              <div className="text-bold text-large">匯出Csv</div>
              <p>
                <code>outfile</code>匯出
              </p>
              <CodeChunk code={`outfile make price rep78 weight length using "1978 Automobile_part.csv", comma replace`} lang="stata" />
              <CodeChunk code={`. outfile make price rep78 weight length using "1978 Automobile_part.csv", comma replace\n(note: file 1978 Automobile_part.csv not found)`} lang="output" />
              <p>或直接全部匯出。</p>
              <CodeChunk code={`outfile using "1978 Automobile.csv", comma replace`} lang="stata" />
              <CodeChunk code={`. outfile using "1978 Automobile.csv", comma replace\n(note: file 1978 Automobile.csv not found)`} lang="output" />
              <p>
                <code>outsheet</code>匯出
              </p>
              <CodeChunk code={`outsheet using "1978 Automobile.csv", c n replace`} lang="stata" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">匯出Xlsx</div>
              <CodeChunk code={`export exc using 1978 Automobile.xlsx, sh("sheetname") first(var) sheetrep`} lang="stata" />
            </div>
          </>
        ),
      },
      {
        title: "圖表匯入",
        content: (
          <>
            <p>在STATA中開啟圖表</p>
            <CodeChunk code={`graph use "1978auto.gph`} lang="stata" />
            <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/1978auto_1.png" alt="1978auto_1.png" />
          </>
        ),
      },
      {
        title: "圖表匯出",
        content: (
          <>
            <div className="my-2">
              <div className="text-bold text-large">匯出為png</div>
              <CodeChunk code={`twoway (sca weight length) (qfit weight length), ///\n       title("1978 Automobile Data")\ngraph save "1978auto.gph", replace  /*將圖表儲存為stata專用的gph格式*/\ngraph export "1978auto.png", replace   /*將圖表儲存為png格式*/`} lang="stata" />
              <CodeChunk code={`. twoway (sca weight length) (qfit weight length), ///\n>        title("1978 Automobile Data")\n. graph save "1978auto.gph", replace  /*將圖表儲存為stata專用的gph格式*/\n(file 1978auto.gph saved)\n. graph export "1978auto.png", replace   /*將圖表儲存為png格式*/\n(file 1978auto.png written in PNG format)`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">匯出png至excel</div>
              <p>
                <code>A1</code>= excel表格位置
              </p>
              <CodeChunk code={`putexcel set pathToXlsxFile.xlsx, sheet("xlsxSheetName") modify\nputexcel A1 = picture(pathToPngFile.png)`} lang="stata" />
            </div>
          </>
        ),
      },
      {
        title: "資料檔合併",
        content: (
          <>
            <p>以下將介紹兩種資料合併的方法：</p>
            <div className="my-2">
              <div className="text-bold text-large">
                方法一：<code>append</code>
              </div>
              <p>
                <code>append</code>是將資料b直接添加在資料a的後方，此時兩份資料必須擁有完全相同的變項才能成功合併。
              </p>
              <p>首先匯入資料a（data1a）觀察後可發現，這份資料有3個變項（id、male、score1），樣本數（obs）為30。</p>
              <CodeChunk code={`cd data\nuse data1a, clear\nd /*簡單列出資料檔的資訊*/`} lang="stata" />
              <CodeChunk code={`. cd data\nC:\\Users\\misti\\Documents\\Stata\\unify\\data\n\n. use data1a, clear\n\n. d /*簡單列出資料檔的資訊*/\n\nContains data from data1a.dta\n  obs:            30                          \n vars:             3                          26 Nov 2020 19:06\n size:           360                          \n---------------------------------------------------------------------------------------------------------------\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\nid              float   %9.0g                 \nmale            float   %9.0g                 \nscore1          float   %9.0g                 \n---------------------------------------------------------------------------------------------------------------\nSorted by: id`} lang="output" />
              <p>再來匯入data1b觀察後可發現這份資料與data1a擁有相同的變項，而樣本數則是30。</p>
              <CodeChunk code={`use data1b, clear\nd`} lang="stata" />
              <CodeChunk code={`. use data1b, clear\n\n. d\n\nContains data from data1b.dta\n  obs:            30                          \n vars:             3                          26 Nov 2020 19:06\n size:            90                          \n---------------------------------------------------------------------------------------------------------------\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\nid              byte    %8.0g                 \nmale            byte    %8.0g                 \nscore1          byte    %8.0g                 \n---------------------------------------------------------------------------------------------------------------\nSorted by: id`} lang="output" />
              <p>
                現在利用<code>append</code>將data1a與data1b合併，然後存檔為data1_all。
              </p>
              <p>
                像這樣直接使用<span class="code">save 檔名</span>存檔，檔案格式為STATA專用的.dta，存檔位置為當前的工作目錄。
              </p>
              <CodeChunk code={`append using data1a\nsort id  /*以變項id來為合併後的資料排序*/\nsave data1_all, replace  /*replace: 如果存檔位置已存在同名的檔案，則取代它*/`} lang="stata" />
              <CodeChunk code={`. append using data1a\n(note: variable id was byte, now float to accommodate using data's values)\n(note: variable male was byte, now float to accommodate using data's values)\n(note: variable score1 was byte, now float to accommodate using data's values)\n\n. sort id  /*以變項id來為合併後的資料排序*/\n\n. save data1_all, replace  /*replace: 如果存檔位置已存在同名的檔案，則取代它*/\nfile data1_all.dta saved`} lang="output" />
              <p>現在觀察這份資料可以發現，變項依然是3個，而樣本數則增加到60個。</p>
              <CodeChunk code={`d`} lang="stata" />
              <CodeChunk code={`. d\n\nContains data from data1_all.dta\n  obs:            60                          \n vars:             3                          27 Nov 2020 21:27\n size:           720                          \n---------------------------------------------------------------------------------------------------------------\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\nid              float   %8.0g                 \nmale            float   %8.0g                 \nscore1          float   %8.0g                 \n---------------------------------------------------------------------------------------------------------------\nSorted by: id`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">
                方法二：<code>merge</code>
              </div>
              <p>
                <code>merge</code>是將資料2中的變項新增到資料1中，不過這種合併依然要求兩份資料至少有一個變項相同，且該變項的性質必須類似身分證號碼，每個樣本都有其自身的編號，這樣才能成功配對。
              </p>
              <p>匯入data2b，觀察後可發現這份資料中同樣有id這個變項，以及另外3個新變項（score2、class、dist）。</p>
              <CodeChunk code={`use data2b, clear\nd`} lang="stata" />
              <CodeChunk code={`. use data2b, clear\n\n. d\n\nContains data from data2b.dta\n  obs:            60                          \n vars:             4                          26 Nov 2020 19:07\n size:           240                          \n---------------------------------------------------------------------------------------------------------------\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\nid              byte    %10.0g                id\nscore2          byte    %10.0g                score2\nclass           byte    %10.0g                class\ndist            byte    %10.0g                dist\n---------------------------------------------------------------------------------------------------------------\nSorted by: id`} lang="output" />
              <p>以id來為data2b、data1_all進行配對，並儲存為data2_all</p>
              <CodeChunk code={`merge 1:1 id using data1_all\ncap drop _merge\nsort id\nsave data2_all, replace\ncd ..`} lang="stata" />
              <CodeChunk code={`. merge 1:1 id using data1_all\n(note: variable id was byte, now float to accommodate using data's values)\n\n    Result                           # of obs.\n    -----------------------------------------\n    not matched                             0\n    matched                                60  (_merge==3)\n    -----------------------------------------\n\n. cap drop _merge\n\n. sort id\n\n. save data2_all, replace\nfile data2_all.dta saved\n\n. cd ..\nC:\\Users\\misti\\Documents\\Stata\\unify`} lang="output" />
              <p>可以看到data1_all的資料成功與data2b合併，變項增加為6個，而樣本數仍維持20個。</p>
              <CodeChunk code={`d`} lang="stata" />
              <CodeChunk code={`. d\n\nContains data from data2_all.dta\n  obs:            60                          \n vars:             6                          27 Nov 2020 21:27\n size:           900                          \n---------------------------------------------------------------------------------------------------------------\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\nid              float   %10.0g                id\nscore2          byte    %10.0g                score2\nclass           byte    %10.0g                class\ndist            byte    %10.0g                dist\nmale            float   %8.0g                 \nscore1          float   %8.0g                 \n---------------------------------------------------------------------------------------------------------------\nSorted by: id`} lang="output" />
            </div>
          </>
        ),
      },
      {
        title: "資料長寬轉換",
        content: (
          <>
            <p>在這份資料中可以看到score1、score2，利用以下指令，將score合併為一個變項，另外新增exam變項作為兩次分數的區分。</p>
            <CodeChunk code={`reshape long score, i(id) j(exam)\nlist in 1/10`} lang="stata" />
            <CodeChunk code={`. reshape long score, i(id) j(exam)\n(note: j = 1 2)\n\nData                               wide   ->   long\n-----------------------------------------------------------------------------\nNumber of obs.                       60   ->     120\nNumber of variables                   6   ->       6\nj variable (2 values)                     ->   exam\nxij variables:\n                          score1 score2   ->   score\n-----------------------------------------------------------------------------\n\n. list in 1/10\n\n     +-----------------------------------------+\n     | id   exam   score   class   dist   male |\n     |-----------------------------------------|\n  1. |  1      1      58       3      3      1 |\n  2. |  1      2      56       3      3      1 |\n  3. |  2      1      65       2      3      1 |\n  4. |  2      2      63       2      3      1 |\n  5. |  3      1      55       3      5      1 |\n     |-----------------------------------------|\n  6. |  3      2      52       3      5      1 |\n  7. |  4      1      62       1      4      1 |\n  8. |  4      2      59       1      4      1 |\n  9. |  5      1      78       2      1      1 |\n 10. |  5      2      78       2      1      1 |\n     +-----------------------------------------+`} lang="output" />
            <p>轉回原本格式</p>
            <CodeChunk code={`reshape wide score, i(id) j(exam)  /*或輸入reshape wide也能恢復原本格式*/\nlist in 1/5`} lang="stata" />
            <CodeChunk code={`. reshape wide score, i(id) j(exam)  /*或輸入reshape wide也能恢復原本格式*/\n(note: j = 1 2)\n\nData                               long   ->   wide\n-----------------------------------------------------------------------------\nNumber of obs.                      120   ->      60\nNumber of variables                   6   ->       6\nj variable (2 values)              exam   ->   (dropped)\nxij variables:\n                                  score   ->   score1 score2\n-----------------------------------------------------------------------------\n\n. list in 1/5\n\n     +--------------------------------------------+\n     | id   score1   score2   class   dist   male |\n     |--------------------------------------------|\n  1. |  1       58       56       3      3      1 |\n  2. |  2       65       63       2      3      1 |\n  3. |  3       55       52       3      5      1 |\n  4. |  4       62       59       1      4      1 |\n  5. |  5       78       78       2      1      1 |\n     +--------------------------------------------+`} lang="output" />
          </>
        ),
      },
    ];
  }
  render() {
    return (
      <>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "整理資料常用指令",
        content: (
          <>
            <p>載入資料</p>
            <CodeChunk code={`cd "C:/Users/misti/Documents/Stata/unify/data"\nls\nuse 2012_063Q1xia.dta, clear\ncd ..`} lang="stata" />
            <CodeChunk code={`. cd "C:/Users/misti/Documents/Stata/unify/data"\nC:\\Users\\misti\\Documents\\Stata\\unify\\data\n\n. ls\n  <dir>  11/20/20 21:16  .                 \n  <dir>  11/20/20 21:16  ..                \n  11.3M   5/31/18 10:37  2012_063Q1xia.dta \n   0.2k   3/29/18 11:14  data1b.csv        \n  33.0k   3/29/18 11:14  data2b.xlsx       \n2272.7k   4/26/18 12:18  tscs131.dta       \n\n. use 2012_063Q1xia.dta, clear\n\n. cd ..\nC:\\Users\\misti\\Documents\\Stata\\unify`} lang="output" />
            <p>
              以表格呈現資料中的學歷變項（<code>v11</code>）。
            </p>
            <p>通常下載下來的資料會有一份codebook，裡面有每個問題的代號，以及選項的編碼方式。</p>
            <ul>
              <li>
                <p>
                  <b>
                    <code>describe varname</code>
                  </b>
                </p>
              </li>
              <li>
                <p>
                  <b>
                    <code>tabulate varname</code>
                  </b>
                </p>
                <CodeChunk code={`d v11   /*d: describe的縮寫，也可以寫成des，檢視該份資料的屬性*/\nta v11  /*ta: tabulate的縮寫，以表格呈現，也能寫為tab*/`} lang="stata" />
                <CodeChunk
                  code={`. d v11   /*d: describe的縮寫，也可以寫成des，檢視該份資料的屬性*/\n\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\nv11             byte    %30.0g     V11        v11 請問您的教育程度是:(提示卡1)\n\n. ta v11  /*ta: tabulate的縮寫，以表格呈現，也能寫為tab*/\n\n                   v11 |\n        請問您的教育程 |\n        度是:(提示卡1) |      Freq.     Percent        Cum.\n-----------------------+-----------------------------------\n     無/不識字(跳答14) |        101        4.73        4.73\n自修/識字/私塾(跳答14) |         13        0.61        5.34\n          小學(跳答13) |        305       14.29       19.63\n      國(初)中(跳答13) |        241       11.29       30.93\n          初職(跳答13) |          5        0.23       31.16\n    高中普通科(跳答13) |         84        3.94       35.10\n    高中職業科(跳答13) |         68        3.19       38.28\n          高職(跳答13) |        391       18.32       56.61\n      士官學校(跳答13) |          6        0.28       56.89\n                  五專 |         70        3.28       60.17\n                  二專 |        148        6.94       67.10\n                  三專 |         22        1.03       68.13\n          軍警校專修班 |          5        0.23       68.37\n          軍警校專科班 |          4        0.19       68.56\n         空中行專/商專 |          7        0.33       68.88\n              空中大學 |          9        0.42       69.31\n        軍警官校或大學 |         16        0.75       70.06\n         技術學院,科大 |        177        8.29       78.35\n                  大學 |        316       14.81       93.16\n                  碩士 |        131        6.14       99.30\n                  博士 |         11        0.52       99.81\n          其他(請說明) |          4        0.19      100.00\n-----------------------+-----------------------------------\n                 Total |      2,134      100.00`}
                  lang="output"
                />
                <p>
                  從<code>d v11</code>這個指令可以知道v11的value label是V11
                </p>
              </li>
              <li>
                <p>
                  <b>
                    <code>numlabel varname, add</code>
                  </b>
                </p>
                <p>
                  利用<code>numlabel V11, add</code>可以檢視各個選項的編號。
                </p>
                <p>
                  <code>numlabel _all, add</code>可以一次處理所有變項，但資料較大時可能要等它運行幾秒鐘。
                </p>
                <CodeChunk code={`numlabel V11, add\nta v11`} lang="stata" />
                <CodeChunk code={`. numlabel V11, add\n\n. ta v11\n\n                      v11 |\n         請問您的教育程度 |\n             是:(提示卡1) |      Freq.     Percent        Cum.\n--------------------------+-----------------------------------\n     1. 無/不識字(跳答14) |        101        4.73        4.73\n2. 自修/識字/私塾(跳答14) |         13        0.61        5.34\n          3. 小學(跳答13) |        305       14.29       19.63\n      4. 國(初)中(跳答13) |        241       11.29       30.93\n          5. 初職(跳答13) |          5        0.23       31.16\n    6. 高中普通科(跳答13) |         84        3.94       35.10\n    7. 高中職業科(跳答13) |         68        3.19       38.28\n          8. 高職(跳答13) |        391       18.32       56.61\n      9. 士官學校(跳答13) |          6        0.28       56.89\n                 10. 五專 |         70        3.28       60.17\n                 11. 二專 |        148        6.94       67.10\n                 12. 三專 |         22        1.03       68.13\n         13. 軍警校專修班 |          5        0.23       68.37\n         14. 軍警校專科班 |          4        0.19       68.56\n        15. 空中行專/商專 |          7        0.33       68.88\n             16. 空中大學 |          9        0.42       69.31\n       17. 軍警官校或大學 |         16        0.75       70.06\n        18. 技術學院,科大 |        177        8.29       78.35\n                 19. 大學 |        316       14.81       93.16\n                 20. 碩士 |        131        6.14       99.30\n                 21. 博士 |         11        0.52       99.81\n         22. 其他(請說明) |          4        0.19      100.00\n--------------------------+-----------------------------------\n                    Total |      2,134      100.00`} lang="output" />
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "定義遺漏值",
        content: (
          <>
            <p>將編號22的「其他」設為遺漏值，可以發現「22. 其他」消失了</p>
            <CodeChunk code={`preserve\nmvdecode v11, mv(22)\nta v11\nrestore`} lang="stata" />
            <CodeChunk code={`. preserve\n\n. mvdecode v11, mv(22)\n         v11: 4 missing values generated\n\n. ta v11\n\n                      v11 |\n         請問您的教育程度 |\n             是:(提示卡1) |      Freq.     Percent        Cum.\n--------------------------+-----------------------------------\n     1. 無/不識字(跳答14) |        101        4.74        4.74\n2. 自修/識字/私塾(跳答14) |         13        0.61        5.35\n          3. 小學(跳答13) |        305       14.32       19.67\n      4. 國(初)中(跳答13) |        241       11.31       30.99\n          5. 初職(跳答13) |          5        0.23       31.22\n    6. 高中普通科(跳答13) |         84        3.94       35.16\n    7. 高中職業科(跳答13) |         68        3.19       38.36\n          8. 高職(跳答13) |        391       18.36       56.71\n      9. 士官學校(跳答13) |          6        0.28       57.00\n                 10. 五專 |         70        3.29       60.28\n                 11. 二專 |        148        6.95       67.23\n                 12. 三專 |         22        1.03       68.26\n         13. 軍警校專修班 |          5        0.23       68.50\n         14. 軍警校專科班 |          4        0.19       68.69\n        15. 空中行專/商專 |          7        0.33       69.01\n             16. 空中大學 |          9        0.42       69.44\n       17. 軍警官校或大學 |         16        0.75       70.19\n        18. 技術學院,科大 |        177        8.31       78.50\n                 19. 大學 |        316       14.84       93.33\n                 20. 碩士 |        131        6.15       99.48\n                 21. 博士 |         11        0.52      100.00\n--------------------------+-----------------------------------\n                    Total |      2,130      100.00\n\n. restore`} lang="output" />
            <p>將編號18、22設為遺漏值</p>
            <CodeChunk code={`preserve\nmvdecode v11, mv(18=.\\22=.)\nta v11\nrestore`} lang="stata" />
            <CodeChunk code={`. preserve\n\n. mvdecode v11, mv(18=.\\22=.)\n         v11: 181 missing values generated\n\n. ta v11\n\n                      v11 |\n         請問您的教育程度 |\n             是:(提示卡1) |      Freq.     Percent        Cum.\n--------------------------+-----------------------------------\n     1. 無/不識字(跳答14) |        101        5.17        5.17\n2. 自修/識字/私塾(跳答14) |         13        0.67        5.84\n          3. 小學(跳答13) |        305       15.62       21.45\n      4. 國(初)中(跳答13) |        241       12.34       33.79\n          5. 初職(跳答13) |          5        0.26       34.05\n    6. 高中普通科(跳答13) |         84        4.30       38.35\n    7. 高中職業科(跳答13) |         68        3.48       41.83\n          8. 高職(跳答13) |        391       20.02       61.85\n      9. 士官學校(跳答13) |          6        0.31       62.16\n                 10. 五專 |         70        3.58       65.75\n                 11. 二專 |        148        7.58       73.32\n                 12. 三專 |         22        1.13       74.45\n         13. 軍警校專修班 |          5        0.26       74.71\n         14. 軍警校專科班 |          4        0.20       74.91\n        15. 空中行專/商專 |          7        0.36       75.27\n             16. 空中大學 |          9        0.46       75.73\n       17. 軍警官校或大學 |         16        0.82       76.55\n                 19. 大學 |        316       16.18       92.73\n                 20. 碩士 |        131        6.71       99.44\n                 21. 博士 |         11        0.56      100.00\n--------------------------+-----------------------------------\n                    Total |      1,953      100.00\n\n. restore`} lang="output" />
            <p>將編號18至22全部設為遺漏值</p>
            <CodeChunk code={`preserve\nmvdecode v11, mv(18//22=.)\nta v11\nrestore`} lang="stata" />
            <CodeChunk code={`. preserve\n\n. mvdecode v11, mv(18//22=.)\n         v11: 639 missing values generated\n\n. ta v11\n\n                      v11 |\n         請問您的教育程度 |\n             是:(提示卡1) |      Freq.     Percent        Cum.\n--------------------------+-----------------------------------\n     1. 無/不識字(跳答14) |        101        6.76        6.76\n2. 自修/識字/私塾(跳答14) |         13        0.87        7.63\n          3. 小學(跳答13) |        305       20.40       28.03\n      4. 國(初)中(跳答13) |        241       16.12       44.15\n          5. 初職(跳答13) |          5        0.33       44.48\n    6. 高中普通科(跳答13) |         84        5.62       50.10\n    7. 高中職業科(跳答13) |         68        4.55       54.65\n          8. 高職(跳答13) |        391       26.15       80.80\n      9. 士官學校(跳答13) |          6        0.40       81.20\n                 10. 五專 |         70        4.68       85.89\n                 11. 二專 |        148        9.90       95.79\n                 12. 三專 |         22        1.47       97.26\n         13. 軍警校專修班 |          5        0.33       97.59\n         14. 軍警校專科班 |          4        0.27       97.86\n        15. 空中行專/商專 |          7        0.47       98.33\n             16. 空中大學 |          9        0.60       98.93\n       17. 軍警官校或大學 |         16        1.07      100.00\n--------------------------+-----------------------------------\n                    Total |      1,495      100.00\n\n. restore`} lang="output" />
            <p>
              若codebook中已經標明遺漏值（通常為999），那也可以使用<code>mvdecode _all, mv(999)</code>來一次定義資料中所有變項的遺漏值，不過視需求而定，某些變項有可能需要個別調整。
            </p>
          </>
        ),
      },
      {
        title: "重新編碼",
        content: (
          <>
            <p>將各個選項重新編碼為教育年數，如：選項1.無/不識字=0年</p>
            <p>這裡有兩種不同的方式，各有其用處，會在不同地方派上用場</p>
            <div className="my-2">
              <div className="text-bold text-large">
                第一種方式：<code>recode</code>
              </div>
              <p>
                <code>recode</code>是針對單一變項重新編碼，指令較簡短，常常會遇到有些資料需要進行反項編碼才能讓人更容易理解，此時適合使用這種方式。
              </p>
              <CodeChunk code={`cap drop edyear  /*如過有edyear這個變項就先拋棄，如過沒有則不做動作。*/\n/*\n因為下一條指令會建立名為edyear的變項，而STATA不能同時存在同名的變項\n，若重複執行這條指令會出現錯誤，因此用cap drop先把edyear拋棄。\n*/\nrecode v11 (1=0) (2=3) (3=6) (4/5=9) (6/9=12) (10/11 13/15 =14) /// /*代碼過長時可用///換行*/\n           (12=15) (16/19=16) (20=18) (21=22) (22=.), g(edyear)\nta edyear`} lang="stata" />
              <CodeChunk code={`. cap drop edyear  /*如過有edyear這個變項就先拋棄，如過沒有則不做動作。*/\n\n. /*\n> 因為下一條指令會建立名為edyear的變項，而STATA不能同時存在同名的變項\n> ，若重複執行這條指令會出現錯誤，因此用cap drop先把edyear拋棄。\n> */\n. recode v11 (1=0) (2=3) (3=6) (4/5=9) (6/9=12) (10/11 13/15 =14) /// /*代碼過長時可用///換行*/\n>            (12=15) (16/19=16) (20=18) (21=22) (22=.), g(edyear)\n(2121 differences between v11 and edyear)\n\n. ta edyear\n\n  RECODE of |\n   v11 (v11 |\n     請問您 |\n     的教育 |\n   程度是:( |\n   提示卡1) |\n          ) |      Freq.     Percent        Cum.\n------------+-----------------------------------\n          0 |        101        4.74        4.74\n          3 |         13        0.61        5.35\n          6 |        305       14.32       19.67\n          9 |        246       11.55       31.22\n         12 |        549       25.77       57.00\n         14 |        234       10.99       67.98\n         15 |         22        1.03       69.01\n         16 |        518       24.32       93.33\n         18 |        131        6.15       99.48\n         22 |         11        0.52      100.00\n------------+-----------------------------------\n      Total |      2,130      100.00`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">
                第二種方式：<code>replace</code>
              </div>
              <p>
                <code>replace</code>是一一指定新變項中obs的條件，雖然較繁複，但好處是可以將多個變項中的obs整合進同一個變項中。
              </p>
              <CodeChunk code={`cap drop edyear\ng edyear = .  /*g: generate的縮寫，建立變項，也能寫為gen。建立一個名為edyear，裡面沒有任何obs的變項*/\nreplace edyear = 0  if v11 == 1\nreplace edyear = 3  if v11 == 2\nreplace edyear = 6  if v11 == 3\nreplace edyear = 9  if v11 == 4 | v11 == 5\nreplace edyear = 12 if v11 >= 6 & v11 <= 9\nreplace edyear = 14 if v11 == 10 | v11 == 11 | v11 >= 13 & v11 <= 15\nreplace edyear = 15 if v11 == 12\nreplace edyear = 16 if v11 >= 16 & v11 <= 19\nreplace edyear = 18 if v11 == 20\nreplace edyear = 22 if v11 == 21\nreplace edyear = .  if v11 == 22\nta edyear`} lang="stata" />
              <CodeChunk code={`. cap drop edyear\n\n. g edyear = .  /*g: generate的縮寫，建立變項，也能寫為gen。建立一個名為edyear，裡面沒有任何obs的變項*/\n(2,134 missing values generated)\n\n. replace edyear = 0  if v11 == 1\n(101 real changes made)\n\n. replace edyear = 3  if v11 == 2\n(13 real changes made)\n\n. replace edyear = 6  if v11 == 3\n(305 real changes made)\n\n. replace edyear = 9  if v11 == 4 | v11 == 5\n(246 real changes made)\n\n. replace edyear = 12 if v11 >= 6 & v11 <= 9\n(549 real changes made)\n\n. replace edyear = 14 if v11 == 10 | v11 == 11 | v11 >= 13 & v11 <= 15\n(234 real changes made)\n\n. replace edyear = 15 if v11 == 12\n(22 real changes made)\n\n. replace edyear = 16 if v11 >= 16 & v11 <= 19\n(518 real changes made)\n\n. replace edyear = 18 if v11 == 20\n(131 real changes made)\n\n. replace edyear = 22 if v11 == 21\n(11 real changes made)\n\n. replace edyear = .  if v11 == 22\n(0 real changes made)\n\n. ta edyear\n\n     edyear |      Freq.     Percent        Cum.\n------------+-----------------------------------\n          0 |        101        4.74        4.74\n          3 |         13        0.61        5.35\n          6 |        305       14.32       19.67\n          9 |        246       11.55       31.22\n         12 |        549       25.77       57.00\n         14 |        234       10.99       67.98\n         15 |         22        1.03       69.01\n         16 |        518       24.32       93.33\n         18 |        131        6.15       99.48\n         22 |         11        0.52      100.00\n------------+-----------------------------------\n      Total |      2,130      100.00`} lang="output" />
            </div>
          </>
        ),
      },
      {
        title: "職業地位計算（EGP Class Scheme）",
        content: (
          <>
            <p>
              <a href="https://www.jstor.org/stable/589632?seq=1">EGP Class Scheme</a>是一種職業地位的分類方法，在STATA中可以利用<code>iscoegp</code>進行分類。
            </p>
            <p>
              以<code>iscoegp</code>計算職業地位需要先獲取以下資訊：
            </p>
            <ol>
              <li>職業編碼：isco88碼（在以下範例資料中為v34b5）</li>
              <li>在哪裡工作？為誰工作？</li>
              <li>工作的公司/機構大約雇有多少員工？</li>
            </ol>
            <div className="my-2">
              <div className="text-bold text-large">是否受雇</div>
              <CodeChunk code={`cap drop sempnow \nrecode v36 (1 3/99=0) (2=1), g(sempnow)\nlab var sempnow "自雇"`} lang="stata" />
              <CodeChunk code={`. cap drop sempnow \n\n. recode v36 (1 3/99=0) (2=1), g(sempnow)\n(2134 differences between v36 and sempnow)\n\n. lab var sempnow "自雇"`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">工作單位規模</div>
              <CodeChunk code={`cap drop suvpnow\ng suvpnow=.\nreplace suvpnow=v37 if v37<10\nreplace suvpnow=0 if v37>9 & v37<100\nlab var suvpnow "工作單位規模"`} lang="stata" />
              <CodeChunk code={`. cap drop suvpnow\n\n. g suvpnow=.\n(2,134 missing values generated)\n\n. replace suvpnow=v37 if v37<10\n(1,531 real changes made)\n\n. replace suvpnow=0 if v37>9 & v37<100\n(603 real changes made)\n\n. lab var suvpnow "工作單位規模"`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">計算社經地位</div>
              <CodeChunk code={`cap drop _egpnow\niskoegp _egpnow,  isko(v34b5) sempl(sempnow) supvis(suvpnow)\ncap drop egpnow\nrecode _egpnow (1=1 "Mangement") (2/3=2 "whiteC") (4/5=3 "PetitiB") ///\n               (7/9=4 "BWorer") (10/11=5 "Farmer"), g(egpnow)\nlab var egpnow "職業地位"`} lang="stata" />
              <CodeChunk code={`. cap drop _egpnow\n\n. iskoegp _egpnow,  isko(v34b5) sempl(sempnow) supvis(suvpnow)\n\n. \n. cap drop egpnow\n\n. recode _egpnow (1=1 "Mangement") (2/3=2 "whiteC") (4/5=3 "PetitiB") ///\n>                (7/9=4 "BWorer") (10/11=5 "Farmer"), g(egpnow)\n(1104 differences between _egpnow and egpnow)\n\n. lab var egpnow "職業地位"`} lang="output" />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">定義遺漏值</div>
              <CodeChunk code={`list v34b5 egpnow if egpnow==. & v34b5<9997\nreplace egpnow=1 if (v34b5==1114 | v34b5==1124) & egpnow==.\nreplace egpnow=3 if (v34b5==3341 | v34b5==3343) & egpnow==.\nreplace egpnow=4 if  v34b5==8410                & egpnow==.`} lang="stata" />
              <CodeChunk
                code={`. list v34b5 egpnow if egpnow==. & v34b5<9997\n\n      +----------------------------------------+\n      |                         v34b5   egpnow |\n      |----------------------------------------|\n  11. |         國,高中升學補習班老師        . |\n 116. | 成人語文補習班,各種才藝班老師        . |\n 135. |         國,高中升學補習班老師        . |\n 147. | 成人語文補習班,各種才藝班老師        . |\n 247. |         國,高中升學補習班老師        . |\n      |----------------------------------------|\n 305. | 成人語文補習班,各種才藝班老師        . |\n 454. |         國,高中升學補習班老師        . |\n 479. |         國,高中升學補習班老師        . |\n 514. |                鄉鎮市民意代表        . |\n 527. |         國,高中升學補習班老師        . |\n      |----------------------------------------|\n 582. | 成人語文補習班,各種才藝班老師        . |\n 606. | 成人語文補習班,各種才藝班老師        . |\n 659. |         國,高中升學補習班老師        . |\n 670. |         國,高中升學補習班老師        . |\n 774. |         國,高中升學補習班老師        . |\n      |----------------------------------------|\n 951. | 成人語文補習班,各種才藝班老師        . |\n 995. | 成人語文補習班,各種才藝班老師        . |\n1136. |         國,高中升學補習班老師        . |\n1209. |         國,高中升學補習班老師        . |\n1461. | 成人語文補習班,各種才藝班老師        . |\n      |----------------------------------------|\n1712. |              公立高中(職)校長        . |\n1780. |         國,高中升學補習班老師        . |\n1803. | 成人語文補習班,各種才藝班老師        . |\n1857. |                其他半技術工人        . |\n1908. | 成人語文補習班,各種才藝班老師        . |\n      |----------------------------------------|\n2085. | 成人語文補習班,各種才藝班老師        . |\n2130. |         國,高中升學補習班老師        . |\n      +----------------------------------------+\n\n. replace egpnow=1 if (v34b5==1114 | v34b5==1124) & egpnow==.\n(2 real changes made)\n\n. replace egpnow=3 if (v34b5==3341 | v34b5==3343) & egpnow==.\n(24 real changes made)\n\n. replace egpnow=4 if  v34b5==8410                & egpnow==.\n(1 real change made)`}
                lang="output"
              />
            </div>
            <div className="my-2">
              <div className="text-bold text-large">職業分類建立完成</div>
              <CodeChunk code={`table egpnow, c(mean edyear sd edyear n edyear) format(%9.2f) row`} lang="stata" />
              <CodeChunk code={`. table egpnow, c(mean edyear sd edyear n edyear) format(%9.2f) row\n\n----------------------------------------------------\n 職業地位 | mean(edyear)    sd(edyear)     N(edyear)\n----------+-----------------------------------------\nMangement |        16.83          2.79            71\n   whiteC |        13.88          3.16           940\n  PetitiB |        15.07          2.90            30\n   BWorer |        10.09          3.96           848\n   Farmer |         5.69          4.87           143\n          | \n    Total |        11.84          4.48         2,032\n----------------------------------------------------`} lang="output" />
            </div>
          </>
        ),
      },
      {
        title: "其他技巧",
        content: (
          <>
            <ol>
              <li>
                <code>egen miny = min(y), by(x)</code>：
              </li>
              <p>
                依據變項<code>x</code>分類建立最小值，命名為<code>miny</code>。
              </p>
              <li>
                <code>by varname: g count = _N</code>：
              </li>
              <p>計算重複變項的數量。</p>
              <li>
                <code>by varname: g count = _n</code>：
              </li>
              <p>為重複變項編號。</p>
              <li>
                <code>nrow</code>
              </li>
              <p>將第一列作為變項名稱</p>
              <li>
                <code>replace x = subinstr(x, ",", "", .)</code>
              </li>
              <p>將變項x中的逗號替換掉</p>
              <li>
                <code>g y = "a" if strmatch(x, "*a*")</code>
              </li>
              <p>
                如果<code>x</code>包含字母"a"，建立變項<code>y = "a"</code>
              </p>
              <li>
                <code>g y = usubstr("abcde", 2, 2)</code>
              </li>
              <p>
                從字串<code>abcde</code>的第2個字開始，往後數2個字母，建立<code>y</code>變項，在本範例中<code>y = "bc"</code>
              </p>
              <li>
                <code>preserve</code>、<code>restore</code>
              </li>
              <p>建立還原點、回到還原點</p>
              <li>
                <code>split strvar, p("/") g(a)</code>
              </li>
              <p>
                依據字符<code>/</code>分割文字變項<code>strvar</code>為<code>a1</code>、<code>a2</code>、<code>a3</code>...
              </p>
              <li>
                <code>char(10)</code>
              </li>
              <p>ASCII編碼中的換行符，可插入字串中</p>
              <li>
                stata if/else用法，<code>var</code> = 變項名稱
              </li>
            </ol>
            <CodeChunk code={`local varType: type var  /*獲取變項類型*/if substr("\`varType'", 1, 3) == "str" {  如果變項類型為文字(str) do some stata code...} else {  some stata code...}`} lang="stata" />
          </>
        ),
      },
    ];
  }
  render() {
    return (
      <>
        <p>大多數剛匯入的資料並不適合直接分析，為了讓資料更符合符合我們的需求，需要對資料進行整理，以下介紹幾個整理資料經常用到的指令。</p>
        {this.section.map((section) => (
          <Block title={section.title} content={section.content} />
        ))}
      </>
    );
  }
}

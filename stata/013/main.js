class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "迴歸分析的意義",
        content: (
          <>
            <ol>
              <li>
                相關與迴歸
                <ul>
                  <li>相關是用來探討兩變項之間的關連程度，但分析中對兩個變項並不設計因果關係。</li>
                  <li>
                    在迴歸分析中，變項之間具有因果關係的意義，其中一定有一個變項被設定為<b>結果</b>。
                  </li>
                </ul>
              </li>
              <li>
                迴歸分析
                <ul>
                  <li>當自變數只有一個時，為簡單迴歸分析，而超過一個自變項時，為多元迴歸分析（multiple regression，又稱複迴歸）。簡單迴歸分析是所有迴歸分析的基礎，可看做迴歸分析的原型。</li>
                  <li>基本上，迴歸分析的原型在自變項與應變項所用到的尺度皆是間距尺度（interval scale）或比例尺度（ratio scale）。</li>
                  <li>迴歸分析是以數學等式表示，研究者可根據數學等式去預測變項的變化。因此，在統計分析中，迴歸分析具有預測的作用。</li>
                </ul>
              </li>
              <li>
                函數關係與統計關係
                <ol type="i">
                  <li>
                    函數關係：是一種確定關係，表現在某一數值改變後，另一現象也隨之產生變化，而且有確定的值與之相對應。例如：
                    <ul>
                      <li>
                        求圓的面積：
                        <center>
                          <p>
                            <i>
                              S=πr<sup>2</sup>
                            </i>
                          </p>
                        </center>
                      </li>
                      <li>
                        加速度的公式：
                        <center>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAAAsCAYAAABxNQYsAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASGSURBVHhe7ZpZKH1fFMeJB1KUiJIoklIypjwgw4tQygtlKDJkeECkpEh5MJUUTyQyZ4gHIsOTMTMllCEKmcdM319r/7bfX3/3uo7f717nOudTu85a95zT6X7PWWvttbcOZESDLIaIkMUQEbIYIkIWQ0TIYghgdnYWMTExiIyMRF5eHjY2NvgvwMHBAfLz89lvLS0t3CsMWQyBxMfHQ0dHhwnzf5qbm+Hr64uXlxfuEYYshkDoDycx+vr6uOc/AgMDsba2xi3haIUYX33T1MHi4iITo7y8nHt+09vbi5ycHG59DVGLMTw8DE9PT6SkpHAPUFRUBBcXF25pnru7O+jp6SE5OZl7gPv7e/j5+eH6+pp7vobov4zCwkJ4eXlxC9jb24OdnR23gPX1dYyMjODp6Yl71I+9vT38/f25BZSUlKCzs5NbX0f0YvT398PIyOhPqLq6ukJ6ejo7rq6uRk1NDba3txEeHs7e0I/o7u5GfX39h2N0dJSfrZzQ0FBYW1uz4/39fURERLDjv0X0YqyurrIYvbu7y2x6Cw8PD3F6egpbW1s8PDwwf3Z2NioqKtixMqKjo+Hj4/PhKCgo4GcrJzc3F7q6uri9vWXV1dsS9xV6LhJfCKIX4+bmhokxPz/PKhVKlERjYyMCAgLYMdHV1YWgoCBuqZeGhgb2TLW1tQrFoyRPlVVcXByOjo64VzWiF4PQ19dHR0cHKisruQeoqqpi4eKVgYEBODg4cEu9zMzMMDGcnJzY16EId3d3HB8fc+tzaIUYJiYmiI2NxfPzM/eAvZXBwcHc+p1bnJ2duaVeKG9RmFI01yBOTk7g5ubGrc+jFWJkZGS8S86Tk5Pw8PDgFlBXV8daEZqC2iHKoK84KyuLW59HK8RQhre395/EHhYWxvKKGKB5UVtbG6vyhKDVYuzs7LDqikrS1tZW7v1+qLKjZxKKVovx01ApBlUEY2NjODs7w8rKCqvxZdSDUjGociktLUVmZiY2NzdRVlYGAwODD7uSg4ODLFaqGkJLPqmgVAyKe4mJidwCi4FWVlbcUkxUVBSrcFSNubk5foXMWxSK0d7eDlNTU1xcXHAPWD+IVrk0AfWhqPH3E8bbuZEqFIrh6uqK1NRUboHd1MLCgrUBNEFxcTGb4f6EQSt/n+WdGMvLy+wmlLRfoRBFPmpffwT19M3MzFSOiYkJfoViaIJ3fn7+I4aQNY53YgwNDbE/nrqlxNLSEhISEmBpacn6MAsLC8yvCBJyampK5bi8vORXyLzlnRi0y8Hc3Jw14agxR91RWl2zsbFhFdXj4yM/U+ZfozBn0FdBCzev7QUqbZuamgQlIxnhKBRD5nuQvBgUdik0iwFJi0FhNykpia3MiQHJikFVHS3TGhoasqVcKkO/G8mKMT09zTYgUNU4Pj6udPlUk0g6TGmyq/AZJCvGa6eB9j2JBcmKQRNaR0dHbokDyYoREhKCtLQ0bokDSYpBXWhjY2P09PSIau1ckmJsbW2xfEFbM2lTg1iQbJii3et/u4X/XyNZMcSILIaIkMUQDcAv9rmZv2mSWwcAAAAASUVORK5CYII=" width="99" heigh="44" id="12" />
                        </center>
                      </li>
                      <li>
                        以及常見之兩變量x與y之間的函數關係一般可以用下列數學關係表示：
                        <center>
                          <p>
                            <i>y=f(x)</i>
                          </p>
                        </center>
                      </li>
                    </ul>
                  </li>
                  <li>統計關係: 指現象之間存在的非確定性的數量依存關係。也就是說，雖然現象之間存在著數量的關係，當一變項的數值改變時，另一變項的數值也產生相應的變化，但這種關係並不是嚴格一對一對應的。</li>
                  <ul>
                    <li>大多數的社會現象都有這種意涵。例如，教育程度與收入有關，但並不是所有教育程度高的人，收入就一定高。</li>
                    <li>
                      下式中的<i>&#1013;</i>為隨機誤差，反映隨機因素對y的影響。
                      <center>
                        <p>
                          <i>y=f(x)+&#1013;</i>
                        </p>
                      </center>
                    </li>
                    <li>
                      下圖顯示的就是兩變量之間的統計關係，雖然Y的變化隨著X的改變而增長，但不是所有的Y都在那條直線上，而是散佈在其周圍。
                      <ZoomImage className="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/reg01.png" />
                    </li>
                  </ul>
                  <li>
                    線性關係
                    <ol type="i">
                      <li>
                        在線性關係中，用來表達自變項與應變項之間關係的方程式為：
                        <center>
                          <p>
                            <i>Y=A+BX</i>
                          </p>
                        </center>
                        <ul>
                          <li>其中，Y是應變項，X是自變項，A是截距或常數（intercept or constant），B是迴歸係數或稱斜率（regression coeﬃcient or slope）。</li>
                          <li>以下圖為例，截距為11.5，斜率為2.3，表示每增加1個單位的X，則y會增加2.3個單位。</li>
                          <CodeChunk code={`\nclear\nset obs 50vations (_N) was 0, now 50\nset seed 1245\ngen x= int((100-1)*runiform() +1)\n\ngen y= 11.5+2.3*x\n*sc= scatter\ntwoway sc y x || lfit y x, ///\n    legend(off) ///\n    text(250 24 "y= 11.5+2.3*x") ///\n    text(215 24 "when the rangr of {&epsilon} is 0") ///\n    legend(off) ytitle("y")\ngraph save reg2-1.gph, replace\n\ngen e1= (20-1)*runiform() +1\ncap drop y\ngen y= 11.5+2.3*x+e1\ntwoway sc y x || lfit y x, ///\n    legend(off) ///\n    text(285 24 "y= 11.5+2.3*x + {&epsilon}{sub:1}") ///\n    text(250 24 "when the rangr of {&epsilon} is") ///\n    text(215 24 "between 0-20") ///\n    legend(off) ytitle("y")\n*{&epsilon}{sub:1} 希臘字母 下標1\ngraph save reg2-2.gph, replace\n\ngen e2= (100-1)*runiform() +1\ncap drop y\ngen y= 11.5+2.3*x+e2\ntwoway sc y x || lfit y x, ///\n    legend(off) ///\n    text(295 24 "y= 11.5+2.3*x + {&epsilon}{sub:1}") ///\n    text(260 24 "when the rangr of {&epsilon} is") ///\n    text(225 24 "between 0-100") ///\n    legend(off) ytitle("y")\ngraph save reg2-3.gph, replace\n\ngen e3= (200-1)*runiform() +1\ncap drop y\ngen y= 11.5+2.3*x+e3\ntwoway sc y x || lfit y x, ///\n    legend(off) ///\n    text(100 70 "y= 11.5+2.3*x + {&epsilon}{sub:1}") ///\n    text(65  70 "when the rangr of {&epsilon} is") ///\n    text(30  70 "between 0-200") ///\n    legend(off) ytitle("y")\ngraph save reg2-4.gph, replace\ngraph export reg01.png, replace\n\ngraph combine reg2-1.gph reg2-2.gph reg2-3.gph reg2-4.gph, ycommon\ngraph export "reg02.png", replace`} lang="stata" />
                          <CodeChunk
                            code={`. clear\n\n. set obs 50\nnumber of observations (_N) was 0, now 50\n\n. set seed 1245\n\n. gen x= int((100-1)*runiform() +1)\n\n. \n. gen y= 11.5+2.3*x\n\n. *sc= scatter\n. twoway sc y x || lfit y x, ///\n>        legend(off) ///\n>            text(250 24 "y= 11.5+2.3*x") ///\n>            text(215 24 "when the rangr of {&epsilon} is 0") ///\n>            legend(off) ytitle("y")\n\n. graph save reg2-1.gph, replace\n(file reg2-1.gph saved)\n\n. \n. gen e1= (20-1)*runiform() +1\n\n. cap drop y\n\n. gen y= 11.5+2.3*x+e1\n\n. twoway sc y x || lfit y x, ///\n>        legend(off) ///\n>            text(285 24 "y= 11.5+2.3*x + {&epsilon}{sub:1}") ///\n>            text(250 24 "when the rangr of {&epsilon} is") ///\n>            text(215 24 "between 0-20") ///\n>            legend(off) ytitle("y")\n\n. *{&epsilon}{sub:1} 希臘字母 下標1\n. graph save reg2-2.gph, replace\n(file reg2-2.gph saved)\n\n. \n. gen e2= (100-1)*runiform() +1\n\n. cap drop y\n\n. gen y= 11.5+2.3*x+e2\n\n. twoway sc y x || lfit y x, ///\n>        legend(off) ///\n>            text(295 24 "y= 11.5+2.3*x + {&epsilon}{sub:1}") ///\n>            text(260 24 "when the rangr of {&epsilon} is") ///\n>            text(225 24 "between 0-100") ///\n>            legend(off) ytitle("y")\n\n. graph save reg2-3.gph, replace\n(file reg2-3.gph saved)\n\n. \n. gen e3= (200-1)*runiform() +1\n\n. cap drop y\n\n. gen y= 11.5+2.3*x+e3\n\n. twoway sc y x || lfit y x, ///\n>        legend(off) ///\n>            text(100 70 "y= 11.5+2.3*x + {&epsilon}{sub:1}") ///\n>            text(65  70 "when the rangr of {&epsilon} is") ///\n>            text(30  70 "between 0-200") ///\n>            legend(off) ytitle("y")\n\n. graph save reg2-4.gph, replace\n(file reg2-4.gph saved)\n\n. graph export reg01.png, replace\n(file reg01.png written in PNG format)\n\n. \n. graph combine reg2-1.gph reg2-2.gph reg2-3.gph reg2-4.gph, ycommon\n\n. graph export "reg02.png", replace\n(file reg02.png written in PNG format)`}
                            lang="output"
                          />
                          <ZoomImage className="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/reg02.png" />
                        </ul>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                線性迴歸模型
                <ul>
                  <li>
                    在線性迴歸模型中，如上圖，雖然截距與斜率都一樣，但意義上卻相當不同。其不同點就在散佈于直線周遭的散佈點上，即在同一個X上的散佈點與直線上的點的距離上，即<i>&#1013;</i>上。此處的<i>&#1013;</i>代表隨機誤差。
                  </li>
                  <li>
                    換句話說，有些x值並不能夠準確地預測到所有的y值。這就說明了社會現象並非存在著一對一的對應關係。即因此故，正確的迴歸模型（regression model）應為：
                    <center>
                      <p>
                        <i>Y=A+BX+&#1013;</i>
                      </p>
                    </center>
                  </li>
                </ul>
              </li>
            </ol>
          </>
        ),
      },
      {
        title: "STATA迴歸分析範例",
        content: (
          <>
            <CodeChunk code={`clear\ninput x y\n0  12\n3  13\n1  15\n0  19\n6  26\n5  27\n3  29\n4  31\n10 40\n8  48\nend\n\nlab var x "先前犯罪紀錄"\nlab var y "刑期(⽉)"\n\nreg y x`} lang="stata" />
            <CodeChunk code={`. clear\n\n. input x y\n\n             x          y\n  1. 0  12\n  2. 3  13\n  3. 1  15\n  4. 0  19\n  5. 6  26\n  6. 5  27\n  7. 3  29\n  8. 4  31\n  9. 10 40\n 10. 8  48\n 11. end\n\n. lab var x "先前犯罪紀錄"\n\n. lab var y "刑期(⽉)"\n\n. \n. reg y x\n\n      Source |       SS           df       MS      Number of obs   =        10\n-------------+----------------------------------   F(1, 8)         =     20.57\n       Model |         900         1         900   Prob > F        =    0.0019\n    Residual |         350         8       43.75   R-squared       =    0.7200\n-------------+----------------------------------   Adj R-squared   =    0.6850\n       Total |        1250         9  138.888889   Root MSE        =    6.6144\n\n------------------------------------------------------------------------------\n           y |      Coef.   Std. Err.      t    P>|t|     [95% Conf. Interval]\n-------------+----------------------------------------------------------------\n           x |          3   .6614378     4.54   0.002     1.474722    4.525278\n       _cons |         14   3.372684     4.15   0.003     6.222576    21.77742\n------------------------------------------------------------------------------`} lang="output" />
            <p>此結果可分成兩部分，上面是有關模型的結果，下面則是迴歸係數的部分。</p>
            <ol>
              <li>在上表中，Rseidual為殘差和，代表不能解釋的部分，平均殘差值為43.75。</li>
              <li>Model SS會受到X與迴歸係數的影響，因此代表可以被解釋的部分，此處為900。</li>
              <li>如何判斷一個模型的好壞：</li>
              <ul>
                <li>F ratio：代表可解釋部分與不可解釋之間的比值，比值愈高代表可被解釋的成分愈大。換言之，虛無假設為0的可能性愈低。</li>
                <li>
                  <i>
                    R<sup>2</sup>
                  </i>
                  ：是Model-ss/Total-ss之間的比值，其值域介於0與1之間。愈接近1，代表模型擬合程度愈高，即散佈點愈接近那條迴歸線。在本模型中，
                  <i>
                    R<sup>2</sup>
                  </i>
                  =0.72，是相當擬合的模型。
                </li>
                <li>
                  在只有一個自變項的情況下，X和Y之間相關係數的平方=
                  <i>
                    R<sup>2</sup>
                  </i>
                </li>
              </ul>
            </ol>
            <div className="my-2">
              <div className="text-bold text-large">迴歸係數的功用</div>
              <ol>
                <li>首先，重點在斜率部分。以此處所得到的迴歸係數為例，3意味著每增加一次的犯罪紀錄，則刑期會多增加3個月。</li>
                <li>
                  可用來推算出迴歸線的各個點（即，迴歸預測值，用<i>Y&#770;</i>表示），從而畫出迴歸線。
                  <CodeChunk code={`cap drop yhat\npredict yhat, xb\nlist x y yhat, nolab clean noobs\ntwoway (sca y x, mc(black)) ///\n       (sca yhat x, c(l) mc(red)), ///\n       ylab(0(5)50, angle(0)) ///\n       ytitle("刑期（月）") ///\n       legend(label(1 "x的原始觀察點") label(2 "y的預測點"))\ngraph export reg03.png, replace`} lang="stata" />
                  <CodeChunk code={`. cap drop yhat\n\n. predict yhat, xb\n\n. list x y yhat, nolab clean noobs\n\n     x    y   yhat  \n     0   12     14  \n     3   13     23  \n     1   15     17  \n     0   19     14  \n     6   26     32  \n     5   27     29  \n     3   29     23  \n     4   31     26  \n    10   40     44  \n     8   48     38  \n\n. twoway (sca y x, mc(black)) ///\n>            (sca yhat x, c(l) mc(red)), ///\n>        ylab(0(5)50, angle(0)) ///\n>        ytitle("刑期（月）") ///\n>        legend(label(1 "x的原始觀察點") label(2 "y的預測點"))\n\n. graph export reg03.png, replace\n(file reg03.png written in PNG format)`} lang="output" />
                  <ZoomImage className="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/reg03.png" />
                </li>
                <li>得到的迴歸係數可用來估算當x在某一狀況時，Y可能有的結果。</li>
                <li>
                  其次，我們可以從迴歸係數故估算殘差值，從而了解模型的擬合程度（The goodness of ﬁt）。此部分可以用來了解模型的優劣。
                  <CodeChunk code={`predict cancha, resid\nlist x y yhat cancha, nolab clean noobs`} lang="stata" />
                  <CodeChunk code={`. predict cancha, resid\n\n. list x y yhat cancha, nolab clean noobs\n\n     x    y   yhat   cancha  \n     0   12     14       -2  \n     3   13     23      -10  \n     1   15     17       -2  \n     0   19     14        5  \n     6   26     32       -6  \n     5   27     29       -2  \n     3   29     23        6  \n     4   31     26        5  \n    10   40     44       -4  \n     8   48     38       10`} lang="output" />
                </li>
                <li>
                  一個好的迴歸模型其殘差與X變項之間的關係為0，例如：
                  <CodeChunk code={`corr x cancha`} lang="stata" />
                  <CodeChunk code={`. corr x cancha\n(obs=10)\n\n             |        x   cancha\n-------------+------------------\n           x |   1.0000\n      cancha |   0.0000   1.0000`} lang="output" />
                </li>
                <li>
                  殘差與y的預測值之間的相關係數也應該是0，例如：
                  <CodeChunk code={`corr yhat cancha`} lang="stata" />
                  <CodeChunk code={`. corr yhat cancha \n(obs=10)\n\n             |     yhat   cancha\n-------------+------------------\n        yhat |   1.0000\n      cancha |   0.0000   1.0000`} lang="output" />
                </li>
              </ol>
            </div>
          </>
        ),
      },
      {
        title: "矩陣運算與迴歸",
        content: (
          <>
            <div className="my-2">
              <div className="text-bold text-large">矩陣解聯立方程式</div>
              <p>6x+3y+7z=51</p>
              <p>1x+4y+0z=26</p>
              <p>5x+2y+8z=46</p>
              <p>輸入資料：</p>
              <CodeChunk code={`clear matrix\nmat a = [6,3,7\\1,4,0\\5,2,8]  /*mat: matrix的縮寫，輸入矩陣a*/\nmat list a    /*列出矩陣a*/\nmat b = [51\\26\\46]\nmat list b`} lang="stata" />
              <CodeChunk code={`. clear matrix\n\n. mat a = [6,3,7\\1,4,0\\5,2,8]  /*mat: matrix的縮寫，輸入矩陣a*/\n\n. mat list a    /*列出矩陣a*/\n\na[3,3]\n    c1  c2  c3\nr1   6   3   7\nr2   1   4   0\nr3   5   2   8\n\n. mat b = [51\\26\\46]\n\n. mat list b\n\nb[3,1]\n    c1\nr1  51\nr2  26\nr3  46`} lang="output" />
              <p>
                求解公式：r =(a<sup>-1</sup>)*b
              </p>
              <CodeChunk code={`mat inva=inv(a)\nmat r=inva*b\nmat list r`} lang="stata" />
              <CodeChunk code={`. mat inva=inv(a)\n\n. mat r=inva*b\n\n. mat list r\n\nr[3,1]\n    c1\nc1   2\nc2   6\nc3   3`} lang="output" />
              <p>Ans：x=2, y=6, z=3</p>
            </div>
            <div className="my-2">
              <div className="text-bold text-large">矩陣與迴歸係數的運算</div>
              <p>輸入資料：</p>
              <CodeChunk code={`clear\ninput y x1 x2 x3 \n .6  8 12 5\n1.2 11  6 2\n1.0  9  6 1\n .7  6  3 3\n .3  6 18 4\nend`} lang="stata" />
              <CodeChunk code={`. clear\n\n. input y x1 x2 x3 \n\n             y         x1         x2         x3\n  1.  .6  8 12 5\n  2. 1.2 11  6 2\n  3. 1.0  9  6 1\n  4.  .7  6  3 3\n  5.  .3  6 18 4\n  6. end`} lang="output" />
              <p>建立變項數與樣本數</p>
              <CodeChunk code={`clear matrix\nd\nsca k = r(k)\nsca n=r(N)`} lang="stata" />
              <CodeChunk code={`. clear matrix\n\n. d\n\nContains data\n  obs:             5                          \n vars:             4                          \n size:            80                          \n---------------------------------------------------------------------------------------------------------------\n              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\ny               float   %9.0g                 \nx1              float   %9.0g                 \nx2              float   %9.0g                 \nx3              float   %9.0g                 \n---------------------------------------------------------------------------------------------------------------\nSorted by: \n     Note: Dataset has changed since last saved.\n\n. sca k = r(k)\n\n. sca n=r(N)`} lang="output" />
              <p>輸入矩陣y</p>
              <CodeChunk code={`mat y =(.6\\1.2\\1.0\\.7\\.3)\nmat list y, title(Y變項的矩陣)`} lang="stata" />
              <CodeChunk code={`. mat y =(.6\\1.2\\1.0\\.7\\.3)\n\n. mat list y, title(Y變項的矩陣)\n\ny[5,1]:  Y變項的矩陣\n     c1\nr1   .6\nr2  1.2\nr3    1\nr4   .7\nr5   .3`} lang="output" />
              <p>輸入矩陣 X1, X2, and X3。</p>
              <p>迴歸計算的是自變項每增加1單位，應變項的變化量，因此矩陣每一行的第一個數字都是1。</p>
              <CodeChunk code={`matrix x =(1,8,12,5\\1,11,6,2\\1,9,6,1\\1,6,3,3\\1,6,18,4)\n\n/* 產生 x'，即x的轉置矩陣(transpose matrix) */ \nmatrix xp=x'\nmat list xp, title(轉置矩陣 x')  \n\n/* 產生 x'x，意即成為下三角矩陣(triangular matrix)，右上空白位置對應左下數值  */ \nmatrix xpx=xp*x             \nmatrix list xpx, title(產生下三角矩陣 x'x)  \n\n/* 產生 x'y  */     \nmatrix xpy=xp*y\nmatrix list xpy\n\n/* 產生 x'x的反矩陣，意即 (x'x)^-1 */\nmatrix invxp= inv(xpx)\nmatrix list invxp, title(x'x的反矩陣) `} lang="stata" />
              <CodeChunk code={`. matrix x =(1,8,12,5\\1,11,6,2\\1,9,6,1\\1,6,3,3\\1,6,18,4)\n\n. \n. /* 產生 x'，即x的轉置矩陣(transpose matrix) */ \n. matrix xp=x'\n\n. mat list xp, title(轉置矩陣 x')  \n\nxp[4,5]:  轉置矩陣 x'\n    r1  r2  r3  r4  r5\nc1   1   1   1   1   1\nc2   8  11   9   6   6\nc3  12   6   6   3  18\nc4   5   2   1   3   4\n\n. \n. /* 產生 x'x，意即成為下三角矩陣(triangular matrix)，右上空白位置對應左下數值  */ \n. matrix xpx=xp*x             \n\n. matrix list xpx, title(產生下三角矩陣 x'x)  \n\nsymmetric xpx[4,4]:  產生下三角矩陣 x'x\n     c1   c2   c3   c4\nc1    5\nc2   40  338\nc3   45  342  549\nc4   15  113  159   55\n\n. \n. /* 產生 x'y  */     \n. matrix xpy=xp*y         \n\n. matrix list xpy  \n\nxpy[4,1]\n      c1\nc1   3.8\nc2    33\nc3  27.9\nc4   9.7\n\n. \n. /* 產生 x'x的反矩陣，意即 (x'x)^-1 */\n. matrix invxp= inv(xpx)           \n\n. matrix list invxp, title(x'x的反矩陣) \n\nsymmetric invxp[4,4]:  x'x的反矩陣\n            c1          c2          c3          c4\nc1   8.9730892\nc2  -.77388535   .07643312\nc3  -.03158174   .00106157   .01158882\nc4  -.76592357   .05095541  -.02707006   .20063694`} lang="output" />
              <p>計算出迴歸係數</p>
              <CodeChunk code={`matrix regbx=invxp*xpy  \nmatrix list regbx, title(迴歸係數)`} lang="stata" />
              <CodeChunk code={`. matrix regbx=invxp*xpy  \n\n. matrix list regbx, title(迴歸係數)\n\nregbx[4,1]:  迴歸係數\n            c1\nc1   .24893312\nc2   .10541401\nc3  -.02423036\nc4  -.03805732`} lang="output" />
              <p>迴歸係數的變異數</p>
              <CodeChunk code={`mat e = y-x*regbx   /* e=y-xp，意即迴歸的殘差 */\nmat ep=e'\nmat _sb=((ep*e)/(n-k))*inv(xpx) \nmat list _sb, title(迴歸係數的變異數)`} lang="stata" />
              <CodeChunk code={`. mat e = y-x*regbx   /* e=y-xp，意即迴歸的殘差 */\n\n. mat ep=e'\n\n. mat _sb=((ep*e)/(n-k))*inv(xpx) \n\n. mat list _sb, title(迴歸係數的變異數)\n\nsymmetric _sb[4,4]:  迴歸係數的變異數\n            c1          c2          c3          c4\nc1    .0051581\nc2  -.00044486   .00004394\nc3  -.00001815   6.102e-07   6.662e-06\nc4  -.00044028   .00002929  -.00001556   .00011533`} lang="output" />
              <p>迴歸係數的標準誤</p>
              <CodeChunk code={`/* 將上面矩陣中轉換成為對角線矩陣，意即保留對角線的數值，但將其它數值轉為0。*/\nmat S = diag(vecdiag(_sb))  \nmat S = cholesky(S)   /*開根號*/\nmat li S, title(迴歸係數的標準誤)\n\n/*將上面矩陣中對角線上的標準誤轉置成為行矩陣（Column Matrix ）*/\nmat ste = vecdiag(S)'\nmat li ste`} lang="stata" />
              <CodeChunk code={`. /* 將上面矩陣中轉換成為對角線矩陣，意即保留對角線的數值，但將其它數值轉為0。*/\n. mat S = diag(vecdiag(_sb))  \n\n. mat S = cholesky(S)   /*開根號*/\n\n. mat li S, title(迴歸係數的標準誤)\n\nsymmetric S[4,4]:  迴歸係數的標準誤\n           c1         c2         c3         c4\nc1   .0718199\nc2          0  .00662849\nc3          0          0  .00258103\nc4          0          0          0  .01073938\n\n. \n. /*將上面矩陣中對角線上的標準誤轉置成為行矩陣（Column Matrix ）*/\n. mat ste = vecdiag(S)'\n\n. mat li ste\n\nste[4,1]\n           r1\nc1   .0718199\nc2  .00662849\nc3  .00258103\nc4  .01073938`} lang="output" />
              <p>與迴歸結果對照</p>
              <CodeChunk code={`reg y x1 x2 x3`} lang="stata" />
              <CodeChunk code={`. reg y x1 x2 x3\n\n      Source |       SS           df       MS      Number of obs   =         5\n-------------+----------------------------------   F(3, 1)         =    284.96\n       Model |  .491425183         3  .163808394   Prob > F        =    0.0435\n    Residual |  .000574842         1  .000574842   R-squared       =    0.9988\n-------------+----------------------------------   Adj R-squared   =    0.9953\n       Total |  .492000025         4  .123000006   Root MSE        =    .02398\n\n------------------------------------------------------------------------------\n           y |      Coef.   Std. Err.      t    P>|t|     [95% Conf. Interval]\n-------------+----------------------------------------------------------------\n          x1 |    .105414   .0066285    15.90   0.040      .021191     .189637\n          x2 |  -.0242304    .002581    -9.39   0.068    -.0570255    .0085648\n          x3 |  -.0380573   .0107394    -3.54   0.175    -.1745142    .0983995\n       _cons |    .248933   .0718199     3.47   0.179    -.6636259    1.161492\n------------------------------------------------------------------------------`} lang="output" />
            </div>
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

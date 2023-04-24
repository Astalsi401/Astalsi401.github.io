class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "單因子變異數分析（One-way Anova）",
        content: (
          <div>
            <ol>
              <li>分析的目的是檢驗各組平均值是否相等，而判斷的準則是透過變異數的比較。</li>
              <li>在下例中，在同一班中，樣本的觀測值是不同的，由於這是隨機抽取的案例，因此其中的差異可視為隨機的差異，也稱為隨機誤差。在進行分析時，此類誤差的推算稱之為組內變異數。</li>
              <li>在下例中，各班之間的觀測值也不同。這種差異可能是由於抽樣的隨機性所造成，也可能是由於各班的差異（如老師的教學方法、按學業成績分班的結果）。在此，我們將各班的差異視為系統性的誤差。在進行分析時，此類誤差的推算稱之為組間變異數。</li>
              <li>換句話說，組間變異數（組別效應）愈大，而組內變異數（隨機誤差效應）愈小的話，則F值就愈大，意味著虛無假設被排斥的可能性就愈大。</li>
              <li>當只有兩組時，t 分配與Anova的結果是一樣的。即F test比T test更容易拒絕虛無假設，因為t test虛無假設之條件只有兩個，而f test的虛無假設之條件有多個。</li>
            </ol>
            <p>
              <code>di invFtail(組間df, 組內df, CI)</code>
            </p>
            <p>
              <code>di Ftail(組間df, 組內df, F值)</code>
            </p>
            <div className="my-2">
              <div className="text-bold text-large">範例1：不同班級的成績是否有影響</div>
              <CodeChunk code={`clear\ninput class score\n1 70\n1 75\n1 80\n2 75\n2 80\n2 85\n3 80\n3 85\n3 90\nend\n\nlab var class "班級別"\nlab def class 1 "A班" 2 "B班" 3 "C班"\nlab val class class\nlab var score "考試成績"\nanova score class`} language="stata"></CodeChunk>
              <CodeChunk code={`. clear\n\n. input class score\n\n   class      score\n  1. 1 70\n  2. 1 75\n  3. 1 80\n  4. 2 75\n  5. 2 80\n  6. 2 85\n  7. 3 80\n  8. 3 85\n  9. 3 90\n 10. end\n\n. lab var class "班級別"\n\n. lab def class 1 "A班" 2 "B班" 3 "C班"\n\n. lab val class class\n\n. lab var score "考試成績"\n\n. anova score class\n\n                         Number of obs =          9    R-squared     =  0.5000\n                         Root MSE      =          5    Adj R-squared =  0.3333\n\n                  Source | Partial SS         df         MS        F    Prob>F\n              -----------+----------------------------------------------------\n                   Model |        150          2          75      3.00  0.1250\n                         |\n                   class |        150          2          75      3.00  0.1250\n                         |\n                Residual |        150          6          25  \n              -----------+----------------------------------------------------\n                   Total |        300          8        37.5`} language="output"></CodeChunk>
              <p>表格解讀：</p>
              <p>若我們設定α=0.05，查F分配表，則在自由度為2, 6的情形下，F分配的數值為5.14</p>
              <CodeChunk code={`di invFtail(2, 6, 0.05)`} language="stata"></CodeChunk>
              <CodeChunk code={`. di invFtail(2, 6, 0.05)\n5.1432528`} language="output"></CodeChunk>
              <p>由於3&lt;5.14，因此不能拒絕虛無假設。對於這個結果，可以有以下的的說法：</p>
              <ol>
                <li>應變項（考試分數）上的方差並不會造成組間的差異。</li>
                <li>班級在考試成績上的差異並不顯著（也就是說，雖然有差異，但差異並不顯著）。</li>
                <li>就讀的班級與學生的考試成績無顯著關係。</li>
              </ol>
            </div>
            <div className="my-2">
              <div className="text-bold text-large">範例2：姓名的性別感覺在求職是否有影響？</div>
              <CodeChunk code={`set more off\nclear\n\ninput type interest\n1 6\n1 7\n1 8\n1 6\n1 4\n2 2\n2 5\n2 4\n2 3\n2 5\n3 3\n3 2\n3 4\n3 4\n3 3\nend\n\nlab var type "姓名性別感覺"\nlab def type 1 "男性" 2 "中性" 3 "女性"\nlab val type type\nlab var interest "感興趣程度"\npwmean interest, over(type) mcompare(tuk) effects`} language="stata"></CodeChunk>
              <CodeChunk code={`. set more off\n\n. clear\n\n. input type interest\n\n    type   interest\n  1. 1 6\n  2. 1 7\n  3. 1 8\n  4. 1 6\n  5. 1 4\n  6. 2 2\n  7. 2 5\n  8. 2 4\n  9. 2 3\n 10. 2 5\n 11. 3 3\n 12. 3 2\n 13. 3 4\n 14. 3 4\n 15. 3 3\n 16. end\n\n. lab var type "姓名性別感覺"\n\n. lab def type 1 "男性" 2 "中性" 3 "女性"\n\n. lab val type type\n\n. lab var interest "感興趣程度"\n\n. pwmean interest, over(type) mcompare(tuk) effects\n\nPairwise comparisons of means with equal variances\n\nover         : type\n\n---------------------------\n             |    Number of\n             |  Comparisons\n-------------+-------------\n        type |            3\n---------------------------\n\n-------------------------------------------------------------------------------\n              |                              Tukey                Tukey\n     interest |   Contrast   Std. Err.      t    P>|t|     [95% Conf. Interval]\n--------------+----------------------------------------------------------------\n         type |\n 中性 vs 男性 |       -2.4    .783156    -3.06   0.025    -4.489353   -.3106466\n 女性 vs 男性 |         -3    .783156    -3.83   0.006    -5.089353   -.9106466\n 女性 vs 中性 |        -.6    .783156    -0.77   0.730    -2.689353    1.489353\n-------------------------------------------------------------------------------`} language="output"></CodeChunk>
              <p>姓名的性別感覺在求職時無效果的說法是得不到支持的</p>
              <p>(F ratio=8.22 P value&lt;0.01)</p>
              <CodeChunk code={`oneway interest type, sch  /*只有一個自變項才能用oneway*/\nanova interest type\nmargins type\nmarginsplot, ylabel(0(2)10, angle(0)) noci\n*                   0(2)10  ylabel從0~10排列，每2為一距 \n*                           angle調整文字傾斜角度\ngraph export "anova01.png", replace`} language="stata"></CodeChunk>
              <CodeChunk
                code={`. oneway interest type, sch  /*只有一個自變項才能用oneway*/\n\nAnalysis of Variance\nSource              SS         df      MS            F     Prob > F\n------------------------------------------------------------------------\nBetween groups        25.2      2         12.6      8.22     0.0056\nWithin groups         18.4     12   1.53333333\n------------------------------------------------------------------------\nTotal                 43.6     14   3.11428571\n                \nBartlett's test for equal variances:  chi2(2) =   1.1517  Prob>chi2 = 0.562\n                \nComparison of 感興趣程度 by 姓名性別感覺\n(Scheffe)\nRow Mean-|\nCol Mean |       男性       中性\n---------+----------------------\n    中性 |       -2.4\n         |      0.031\n         |\n    女性 |         -3        -.6\n         |      0.008      0.751\n                \n. anova interest type\n                \nNumber of obs =         15    R-squared     =  0.5780\nRoot MSE      =    1.23828    Adj R-squared =  0.5076\n                \n    Source | Partial SS         df         MS        F    Prob>F\n-----------+----------------------------------------------------\n     Model |       25.2          2        12.6      8.22  0.0056\n           |\n      type |       25.2          2        12.6      8.22  0.0056\n           |\n  Residual |       18.4         12   1.5333333  \n-----------+----------------------------------------------------\n     Total |       43.6         14   3.1142857  \n                \n. margins type\n                \nAdjusted predictions                            Number of obs     =         15\n                \nExpression   : Linear prediction, predict()\n                \n------------------------------------------------------------------------------\n             |            Delta-method\n             |     Margin   Std. Err.      t    P>|t|     [95% Conf. Interval]\n-------------+----------------------------------------------------------------\n        type |\n       男性  |        6.2   .5537749    11.20   0.000     4.993428    7.406572\n       中性  |        3.8   .5537749     6.86   0.000     2.593428    5.006572\n       女性  |        3.2   .5537749     5.78   0.000     1.993428    4.406572\n------------------------------------------------------------------------------\n                \n. marginsplot, ylabel(0(2)10, angle(0)) noci\n                \nVariables that uniquely identify margins: type\n                \n. *                   0(2)10  ylabel從0~10排列，每2為一距 \n. *                           angle調整文字傾斜角度\n. graph export "anova01.png", replace\n(file anova01.png written in PNG format)`}
                language="output"
              ></CodeChunk>
              <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/anova01.png"></ZoomImage>
            </div>
          </div>
        ),
      },
      {
        title: "兩因子變異數分析（Twoway Anova）",
        content: (
          <div>
            <ol>
              <li>兩因子變異數分析的重點</li>
              <ol type="i">
                <li>ANOVA分析是進入迴歸分析的基礎，不僅可以處理理單一因子多組的平均數分析，更可以處理多因子下多組平均數的分析。</li>
                <li>本節之分析包括兩個自變項與一個應變項。換言之，因子有兩個，而分析的目的就是探討這兩個因子是否與應變項有關。此處開始涉及到多因素分析。</li>
                <li>雙因素變異數分析的目的，在於檢驗以下三者：</li>
                <ul>
                  <li>A因子是否與應變項有關（亦稱為主效應 main effects）。即A因素之間各組的平均數不存在差異。</li>
                  <li>B因⼦是否與應變項有關。即B因素之間各組的平均數不存在差異。</li>
                  <li>AB因子間是否存在交互作用效應（interaction effect）。</li>
                </ul>
              </ol>
              <li>用途行顯示兩因子的效應，及其交互作用</li>
              <ol type="i">
                <li>A和B因子均無效應：</li>
                <p>顯示無論有沒有使用到A因子，心率⼀直停留在60bps(Beats per minutes) </p>
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/twoway-anova01.png"></ZoomImage>
                <li>只有A因子有效應：</li>
                <p>顯示在無論有沒有使用到B因子的情況下，若使用到A因子，則心率會從60bps增加到80bps。</p>
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/twoway-anova02.png"></ZoomImage>
                <li>只有B因子有效應：</li>
                <p>顯示在無論有沒有使用到A因子的情況下，若沒有使用到B因子，則心率會一直停留在60bps，但若使用了B因子時，則⼼率增加到70bps。</p>
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/twoway-anova03.png"></ZoomImage>
                <li>A因子和B因子之間不存在交互作用：</li>
                <p>當沒使用到A因子時，若沒使用B因子，則心跳停留在60bps，而一旦使用到B因子時，則心率增加到70bps。換言之，在沒使用到A因子的狀況下，使用B因子，則心跳會增加10bps。</p>
                <p>當沒使用到A因子時，若沒使用B因子，則⼼跳停留在80bps，而一旦使用到B因子時，則心率增加到90bps。換言之，即是使用了A因子，使用B因子與否的效應也僅是10bps。和前面沒使用A因⼦時一樣。</p>
                <p>因此，A與B之間沒有交互影響。</p>
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/twoway-anova04.png"></ZoomImage>
                <li>A因子和B因子之間存在交互作用，但主要效應僅在B因子上：</li>
                <p>這裡心率增加的15bps是A與B交互作用的效應。另外，我們也可以說A因子是沒有效應的，但⼀旦增加了B因⼦後，我們不但看到了B因子的效應，也看到了A和B合起來的效應。</p>
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/twoway-anova05.png"></ZoomImage>
                <li>A和B都存在著主效應，並且交互作用的效應也存在。</li>
                <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/twoway-anova06.png"></ZoomImage>
              </ol>
            </ol>
            <div className="my-2">
              <div className="text-bold text-large">範例：電影內容與獲得評分</div>
              <CodeChunk code={`clear\ninput violent sexual score\n0 0 8\n0 0 10\n0 0 7\n0 0 9\n0 1 9\n0 1 5\n0 1 7\n0 1 7\n1 0 6\n1 0 4\n1 0 8\n1 0 6\n1 1 2\n1 1 1\n1 1 1\n1 1 2\nend\n\nlab var violent "電影是否暴力"\nlab var sexual "電影是否色情"\nlab var score "Empathy Scores"\nlab def violent 0 "無暴力" 1 "有暴力"\nlab def sexual 0 "無色情" 1 "有色情"\nlab val violent violent\nlab val sexual sexual\n\nanova score violent sexual violent#sexual\nmargins violent sexual violent#sexual\nmarginsplot, ylabel(0(2)10) noci\ngraph export "twoway anova07.png", replace\n\ntable violent sexual, c(mean score n score) row col format(%8.2f)`} language="stata"></CodeChunk>
              <CodeChunk
                code={`. clear\n\n. input violent sexual score\n\nviolent sexual score\n 1. 0 0 8\n 2. 0 0 10\n 3. 0 0 7\n 4. 0 0 9\n 5. 0 1 9\n 6. 0 1 5\n 7. 0 1 7\n 8. 0 1 7\n 9. 1 0 6\n10. 1 0 4\n11. 1 0 8\n12. 1 0 6\n13. 1 1 2\n14. 1 1 1\n15. 1 1 1\n16. 1 1 2\n17. end\n\n. lab var violent "電影是否暴力"\n\n. lab var sexual "電影是否色情"\n\n. lab var score "Empathy Scores"\n\n. lab def violent 0 "無暴力" 1 "有暴力"\n\n. lab def sexual 0 "無色情" 1 "有色情"\n\n. lab val violent violent\n\n. lab val sexual sexual\n\n. anova score violent sexual violent#sexual\n\nNumber of obs =  16 R-squared = 0.8321\n Root MSE =  1.35401 Adj R-squared = 0.7901\n\n        Source | Partial SS    df          MS        F      Prob>F\n---------------+----------------------------------------------------\n         Model |        109     3   36.333333    19.82      0.0001\n               |\n       violent |         64     1          64    34.91      0.0001\n        sexual |         36     1          36    19.64      0.0008\nviolent#sexual |          9     1           9     4.91      0.0468\n               |\n      Residual |         22    12   1.8333333 \n---------------+----------------------------------------------------\n         Total |        131    15   8.7333333 \n\n. margins violent sexual violent#sexual\n\nPredictive margins Number of obs =  16\n\nExpression : Linear prediction, predict()\n\n--------------------------------------------------------------------------------\n               | Delta-method\n               | Margin Std.      Err.        t    P>|t|   [95% Conf. Interval]\n---------------+----------------------------------------------------------------\n       violent |\n        無暴力 |        7.75    .47871    16.19    0.000     6.706973 8.793027\n        有暴力 |        3.75  .4787136     7.83    0.000     2.706973 4.793027\n               |\n        sexual |\n        無色情 |        7.25  .4787136    15.14    0.000     6.206973 8.293027\n        有色情 |        4.25  .4787136     8.88    0.000     3.206973 5.293027\n               |\nviolent#sexual |\n 無暴力#無色情 |         8.5  .6770032    12.56    0.000     7.024937 9.975063\n 無暴力#有色情 |           7  .6770032    10.34    0.000     5.524937 8.475063\n 有暴力#無色情 |           6  .6770032     8.86    0.000     4.524937 7.475063\n 有暴力#有色情 |         1.5  .6770032     2.22    0.047     .0249367 2.975063\n--------------------------------------------------------------------------------\n\n. marginsplot, ylabel(0(2)10) noci\n\nVariables that uniquely identify margins: violent sexual\n\n. graph export "twoway anova07.png", replace\n(file twoway anova07.png written in PNG format)\n\n. table violent sexual, c(mean score n score) row col format(%8.2f)\n\n----------------------------------\n 電影是否 | 電影是否色情\n     暴力 | 無色情  有色情  Total\n----------+-----------------------\n   無暴力 |   8.50    7.00   7.75\n          |      4       4      8\n          |\n   有暴力 |   6.00    1.50   3.75\n          |      4       4      8\n          |\n    Total |   7.25    4.25   5.75\n          |      8       8     16\n----------------------------------`}
                language="output"
              ></CodeChunk>
              <ZoomImage class="w-lg-50 w-sm-75 mx-auto" src="https://astalsi401.github.io/assets/images/twoway-anova07.png"></ZoomImage>
            </div>
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

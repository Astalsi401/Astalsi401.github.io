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
              <p>
                <b>範例1：不同班級的成績是否有影響</b>
              </p>
              <CodeChunk code={`clear\ninput class score\n1 70\n1 75\n1 80\n2 75\n2 80\n2 85\n3 80\n3 85\n3 90\nend\n\nlab var class "班級別"\nlab def class 1 "A班" 2 "B班" 3 "C班"\nlab val class class\nlab var score "考試成績"\nanova score class`} language="stata"></CodeChunk>
              <CodeChunk code={`. clear\n\n. input class score\n\n   class      score\n  1. 1 70\n  2. 1 75\n  3. 1 80\n  4. 2 75\n  5. 2 80\n  6. 2 85\n  7. 3 80\n  8. 3 85\n  9. 3 90\n 10. end\n\n. lab var class "班級別"\n\n. lab def class 1 "A班" 2 "B班" 3 "C班"\n\n. lab val class class\n\n. lab var score "考試成績"\n\n. anova score class\n\n                         Number of obs =          9    R-squared     =  0.5000\n                         Root MSE      =          5    Adj R-squared =  0.3333\n\n                  Source | Partial SS         df         MS        F    Prob>F\n              -----------+----------------------------------------------------\n                   Model |        150          2          75      3.00  0.1250\n                         |\n                   class |        150          2          75      3.00  0.1250\n                         |\n                Residual |        150          6          25  \n              -----------+----------------------------------------------------\n                   Total |        300          8        37.5`} language="output"></CodeChunk>
              <p>表格解讀：</p>
              <p>若我們設定α=0.05，查F分配表，則在自由度為2, 6的情形下，F分配的數值為5.14</p>
            </div>
            <div className="my-2">
              <CodeChunk code={``} language="stata"></CodeChunk>
              <CodeChunk code={``} language="output"></CodeChunk>
            </div>
            <ZoomImage src=""></ZoomImage>
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

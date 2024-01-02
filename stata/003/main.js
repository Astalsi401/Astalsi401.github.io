const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <p>輸入資料</p>
          <CodeChunk code={`clear\ninput str9 name iq /*str9: 空出9個字元的長度*/\n"Gene"    125\n"Steve"    92\n"Bob"      72\n"Michael" 126\n"Joan"    120\n"Jim"      99\n"Jane"    130\n"Mary"    100\n"Kevin"   120\nend`} lang="stata" />
          <CodeChunk code={`. clear\n. input str9 name iq /*str9: 空出9個字元的長度*/\n\n     name     iq\n 1. "Gene"    125\n 2. "Steve"    92\n 3. "Bob"      72\n 4. "Michael" 126\n 5. "Joan"    120\n 6. "Jim"      99\n 7. "Jane"    130\n 8. "Mary"    100\n 9. "Kevin"   120\n10. end`} lang="output" />
          <p>檢視資料信息</p>
          <CodeChunk code={`su iq, d\n/*su:summarize的縮寫，大致呈現一份資料的分配狀況，d代表detail，可以看到更詳細的信息。*/`} lang="stata" />
          <CodeChunk code={`. su iq, d\n/*su:summarize的縮寫，大致呈現一份資料的分配狀況，d代表detail，可以看到更詳細的信息。*/\n                             iq\n-------------------------------------------------------------\n      Percentiles      Smallest\n 1%           72             72\n 5%           72             92\n10%           72             99       Obs                   9\n25%           99            100       Sum of Wgt.           9\n\n50%          120                      Mean           109.3333\n                        Largest       Std. Dev.      19.57677\n75%          125            120\n90%          130            125       Variance         383.25\n95%          130            126       Skewness      -.6967588\n99%          130            130       Kurtosis       2.295479`} lang="output" />
          <p>另一種檢視資料的指令</p>
          <CodeChunk code={`univar iq`} lang="stata" />
          <CodeChunk code={`. univar iq\n                                        -------------- Quantiles --------------\nVariable       n     Mean     S.D.      Min      .25      Mdn      .75      Max\n-------------------------------------------------------------------------------\n      iq       9   109.33    19.58    72.00    99.00   120.00   125.00   130.00\n-------------------------------------------------------------------------------`} lang="output" />
          <p>
            單獨叫出資料中的某項資訊，需搭配<code>summarize</code>一起使用，可將其命名後作為數值代入計算。
          </p>
          <CodeChunk code={`g dnp = r(N)    /*樣本數*/\ng dns = r(N)-1  /*自由度*/\ng mean = r(mean)\ndi "樣本數:" _col(8) dnp /*在該行8字元後顯示樣本數r(N)*/\ndi "加總:" _col(6) r(sum)\ndi "平均:" _col(6) mean\ndi "中位數:" _col(8) r(p50)\negen mo = mode(iq)\ndi "眾數:" _col(6) mo\ng vd = (iq-mean)^2\nsu vd\ndi "母體變異數:" _col(12) r(sum)/dnp\ndi "樣本變異數:" _col(12) r(sum)/dns /*r(sum)/(r(N)-1)*/\nsca sdp = sqrt(r(sum)/dnp)\ndi "母體標準差:" _col(12) sdp  /*stata會以樣本變異數進行計算 r(sd)*/\nsca sds = sqrt(r(sum)/dns)\ndi "樣本標準差:" _col(12) sds\nsca sep = sdp/sqrt(dnp)\ndi "母體標準誤:" sep\nsca ses = sds/sqrt(dnp)\ndi "樣本標準誤:" ses`} lang="stata" />
          <CodeChunk code={`. g dnp = r(N)    /*樣本數*/\n\n. g dns = r(N)-1  /*自由度*/\n\n. g mean = r(mean)\n\n. di "樣本數:" _col(8) dnp /*在該行8字元後顯示樣本數r(N)*/\n樣本數:9\n\n. di "加總:" _col(6) r(sum)\n加總:984\n\n. di "平均:" _col(6) mean\n平均:109.33334\n\n. di "中位數:" _col(8) r(p50)\n中位數:120\n\n. egen mo = mode(iq)\n\n. di "眾數:" _col(6) mo\n眾數:120\n\n. g vd = (iq-mean)^2\n\n. su vd\n\n    Variable |        Obs        Mean    Std. Dev.       Min        Max\n-------------+---------------------------------------------------------\n          vd |          9    340.6667    411.2645   87.11116   1393.778\n\n. di "母體變異數:" _col(12) r(sum)/dnp\n母體變異數:340.66666\n\n. di "樣本變異數:" _col(12) r(sum)/dns /*r(sum)/(r(N)-1)*/\n樣本變異數:383.24999\n\n. sca sdp = sqrt(r(sum)/dnp)\n\n. di "母體標準差:" _col(12) sdp  /*stata會以樣本變異數進行計算 r(sd)*/\n母體標準差:18.457157\n\n. sca sds = sqrt(r(sum)/dns)\n\n. di "樣本標準差:" _col(12) sds\n樣本標準差:19.576772\n\n. sca sep = sdp/sqrt(dnp)\n\n. di "母體標準誤:" sep\n母體標準誤:6.1523858\n\n. sca ses = sds/sqrt(dnp)\n\n. di "樣本標準誤:" ses\n樣本標準誤:6.5255906`} lang="output" />
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};

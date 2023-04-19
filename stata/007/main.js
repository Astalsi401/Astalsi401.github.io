class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "常態分配曲線",
        content: (
          <div>
            <CodeChunk code={`twoway (function y=normalden(x) , range(-4 4)        ///\n        droplines(-2 -1 0 1 2)),                       ///\n        title("常態分配曲線")                         ///\n        plotregion(margin(zero))                       ///\n        yscale(off) ylabel(, nogrid)                   ///\n        xlabel(-4 -3 -2 -1 0 1 2 3 4, format(%4.2f))       ///\n        xtitle("Standard deviations") \ngraph export "normal curve.png", replace`} language="stata"></CodeChunk>
            <CodeChunk code={`. twoway (function y=normalden(x) , range(-4 4)        ///\n>         droplines(-2 -1 0 1 2)),                       ///\n>         title("常態分配曲線")                         ///\n>         plotregion(margin(zero))                       ///\n>         yscale(off) ylabel(, nogrid)                   ///\n>         xlabel(-4 -3 -2 -1 0 1 2 3 4, format(%4.2f))       ///\n>         xtitle("Standard deviations") \n\n. graph export "normal curve.png", replace\n(file normal curve.png written in PNG format)`} language="output"></CodeChunk>
            <ZoomImage src="https://astalsi401.github.io/assets/images/normal-curve.png"></ZoomImage>
            <div className="c-my-2">
              <p>
                <b>Kernel density estimation</b>
              </p>
              <p>利用迴圈快速建立規律的資料檔</p>
              <CodeChunk code={`cd "C:/Users/misti/Documents/Stata/unify/temp"\nclear\ninput s3\n1\n2\n3\n4\n5\n6\nend\n\nsave d0, replace\n\nforv x = 0/5 {\n    forv i = 1/6 {\n        clear\n        use d\`x'\n        cap drop s2\n        g s2 = \`i'\n        save d\`i', replace\n    }\n}\n\nuse d1\nforvalues i = 2 (1) 6 {\n    append using d\`i'\n}\n\nsave d0, replace\nforv x = 0/5 {\n    forv i = 1/6 {\n        clear\n        use d\`x'\n        cap drop s1\n        g s1 = \`i'\n        save d\`i', replace\n    }\n}\n\nuse d1\n\nforvalues i = 2 (1) 6 {\n    append using d\`i'\n}\n\n\ncd "C:/Users/misti/Documents/Stata/unify"\n\negen mean=rowmean(s1 s2 s3)\ntabplot mean\ngraph export "tabplot01.png", replace\nkdensity mean, normal\ngraph export "kdnesity01.png", replace`} language="stata"></CodeChunk>
              <CodeChunk
                code={`. cd "C:/Users/misti/Documents/Stata/unify/temp"\nC:\\Users\\misti\\Documents\\Stata\\unify\\temp\n\n. clear\n\n. input s3\n\n     s3\n  1. 1\n  2. 2\n  3. 3\n  4. 4\n  5. 5\n  6. 6\n  7. end\n\n. save d0, replace\nfile d0.dta saved\n\n. \n. forv x = 0/5 {\n  2.         forv i = 1/6 {\n  3.                 clear\n  4.                 use d\`x'\n  5.                 cap drop s2\n  6.                 g s2 = \`i'\n  7.                 save d\`i', replace\n  8.         }\n  9. }\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\n. use d1\n\n. forvalues i = 2 (1) 6 {\n  2.         append using d\`i'\n  3. }\n\n. save d0, replace\nfile d0.dta saved\n\n. \n. forv x = 0/5 {\n  2.         forv i = 1/6 {\n  3.                 clear\n  4.                 use d\`x'\n  5.                 cap drop s1\n  6.                 g s1 = \`i'\n  7.                 save d\`i', replace\n  8.         }\n  9. }\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\nfile d1.dta saved\nfile d2.dta saved\nfile d3.dta saved\nfile d4.dta saved\nfile d5.dta saved\nfile d6.dta saved\n\n. use d1\n\n. forvalues i = 2 (1) 6 {\n  2.         append using d\`i'\n  3. }\n\n. \n        . cd "C:/Users/misti/Documents/Stata/unify"\nC:\\Users\\misti\\Documents\\Stata\\unify\n\n. egen mean=rowmean(s1 s2 s3)\n\n. tabplot mean\n\n. graph export "tabplot01.png", replace\n(file tabplot01.png written in PNG format)\n\n. kdensity mean, normal\n\n. graph export "kdnesity01.png", replace\n(file kdnesity01.png written in PNG format)`}
                language="output"
              ></CodeChunk>
              <div className="row">
                <div className="col-md-6">
                  <ZoomImage src="https://astalsi401.github.io/assets/images/tabplot01.png"></ZoomImage>
                </div>
                <div className="col-md-6">
                  <ZoomImage src="https://astalsi401.github.io/assets/images/kdnesity01.png"></ZoomImage>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "t score",
        content: (
          <div>
            <CodeChunk code={`clear\ninput x freq\n1 21\n2 32 \n3 22\n4 17\n5 13\n6 8\n7 4\n8 3\nend\n\nexpand freq\nsu x, d\n\nsca se=r(sd)/sqrt(r(N))\n*95% CI\nsca tscore95=invttail(120-1, 0.05/2)\nsca ME95=tscore95*se\ndi r(mean)-ME95\ndi r(mean)+ME95\n*99% CI\nsca tscore99=invttail(120-1, 0.01/2)\nsca ME99=tscore99*se\ndi r(mean)-ME99\ndi r(mean)+ME99`} language="stata"></CodeChunk>
            <CodeChunk code={`. clear\n\n. input x freq\n\n    x freq\n 1. 1 21\n 2. 2 32 \n 3. 3 22\n 4. 4 17\n 5. 5 13\n 6. 6 8\n 7. 7 4\n 8. 8 3\n 9. end\n\n. expand freq\n(112 observations created)\n\n. su x, d\n\n                              x\n-------------------------------------------------------------\n      Percentiles      Smallest\n 1%            1              1\n 5%            1              1\n10%            1              1       Obs                 120\n25%            2              1       Sum of Wgt.         120\n\n50%            3                      Mean                3.2\n                                Largest       Std. Dev.      1.813117\n75%            4              7\n90%            6              8       Variance       3.287395\n95%            7              8       Skewness       .7536421\n99%            8              8       Kurtosis       2.838571\n\n. sca se=r(sd)/sqrt(r(N))\n\n. *95% CI\n. sca tscore95=invttail(120-1, 0.05/2)\n\n. sca ME95=tscore95*se\n\n. di r(mean)-ME95\n2.8722653\n\n. di r(mean)+ME95\n3.5277347\n\n. *99% CI\n. sca tscore99=invttail(120-1, 0.01/2)\n\n. sca ME99=tscore99*se\n\n. di r(mean)-ME99\n2.7667208\n\n. di r(mean)+ME99\n3.6332792`} language="output"></CodeChunk>
          </div>
        ),
      },
      {
        title: "zcalc的使用方法",
        content: (
          <div>
            <p>建立亂數成績資料</p>
            <CodeChunk code={`clear\nset obs 100000\nset seed 1\ng grade = int(floor((101)*runiform()+0))\nsu grade, d`} language="stata"></CodeChunk>
            <CodeChunk code={`. clear\n\n. set obs 100000\nnumber of observations (_N) was 0, now 100,000\n\n. set seed 1 \n\n. g grade = int(floor((101)*runiform()+0))\n\n. su grade, d\n\n                            grade\n-------------------------------------------------------------\n      Percentiles      Smallest\n 1%            0              0\n 5%            5              0\n10%           10              0       Obs             100,000\n25%           25              0       Sum of Wgt.     100,000\n\n50%           50                      Mean           50.10906\n                        Largest       Std. Dev.      29.11979\n75%           75            100\n90%           90            100       Variance       847.9622\n95%           95            100       Skewness      -.0053086\n99%           99            100       Kurtosis        1.80178`} language="output"></CodeChunk>
            <p>
              <b>
                求70分者高於多少人?<code>zcalc X mean sd</code>
              </b>
            </p>
            <CodeChunk code={`zcalc 70 50.10906 29.11979\ndi 100000*(1-normal(.68))\n/*\ndi normal(.68) = .75174777  求出由-∞ 到Z=0.68的累積面積（機率）=75.17\ndi invnormal(.75174777) = .68  求出累積機率為0.75174777時的Z分數\n*/`} language="stata"></CodeChunk>
            <CodeChunk code={`. zcalc 70 50.10906 29.11979\n\nz-score for sample observations\n\n      (X - m)       (70 - 50.10906)\n z = ---------  =  ------------------  =  0.68\n         s              29.11979\n\n. di 100000*(1-normal(.68))\n24825.223\n\n. /*\n> di normal(.68) = .75174777  求出由-∞ 到Z=0.68的累積面積（機率）=75.17\n> di invnormal(.75174777) = .68  求出累積機率為0.75174777時的Z分數\n> */`} language="output"></CodeChunk>
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

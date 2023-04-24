class Content extends React.Component {
  constructor(props) {
    super(props);
    this.section = [
      {
        title: "",
        content: (
          <div>
            <p>測試不同教育程度（大學 vs. 高中或以下）是否會影響生理健康狀況</p>
            <CodeChunk code={`\nclear\nuse "C:/Users/misti/Documents/Stata/社會一/社會統計/統計2-02/GSS2010.dta"\nset more off\n\ncapture drop college\nrecode educ (0/12=0 "high school and below") ///\n            (13/20=1 "College and beyond"), gen(college)\ntab educ college, m\nttest physhlth , by(college)`} language="stata"></CodeChunk>
            <CodeChunk
              code={`. clear\n\n. use "C:/Users/misti/Documents/Stata/社會一/社會統計/統計2-02/GSS2010.dta"\n\n. set more off\n\n. capture drop college\n\n. recode educ (0/12=0 "high school and below") ///\n>             (13/20=1 "College and beyond"), gen(college)\n(2034 differences between educ and college)\n\n. tab educ college, m\n\n   HIGHEST |\n   YEAR OF |   RECODE of educ (HIGHEST YEAR OF SCHOOL\n    SCHOOL |                 COMPLETED)\n COMPLETED | high scho  College a         .b         .c |     Total\n-----------+--------------------------------------------+----------\n         0 |         5          0          0          0 |         5 \n         1 |         1          0          0          0 |         1 \n         2 |         5          0          0          0 |         5 \n         3 |         4          0          0          0 |         4 \n         4 |         9          0          0          0 |         9 \n         5 |         6          0          0          0 |         6 \n         6 |        30          0          0          0 |        30 \n         7 |        12          0          0          0 |        12 \n         8 |        45          0          0          0 |        45 \n         9 |        55          0          0          0 |        55 \n        10 |        66          0          0          0 |        66 \n        11 |       108          0          0          0 |       108 \n        12 |       558          0          0          0 |       558 \n        13 |         0        186          0          0 |       186 \n        14 |         0        229          0          0 |       229 \n        15 |         0        109          0          0 |       109 \n        16 |         0        334          0          0 |       334 \n        17 |         0         71          0          0 |        71 \n        18 |         0        101          0          0 |       101 \n        19 |         0         33          0          0 |        33 \n        20 |         0         72          0          0 |        72 \n        dk |         0          0          1          0 |         1 \n        .c |         0          0          0          4 |         4 \n-----------+--------------------------------------------+----------\n     Total |       904      1,135          1          4 |     2,044 \n\n\n. ttest physhlth , by(college)\n\nTwo-sample t test with equal variances\n------------------------------------------------------------------------------\n   Group |     Obs        Mean    Std. Err.   Std. Dev.   [95% Conf. Interval]\n---------+--------------------------------------------------------------------\nhigh sch |     421    3.315914    .3454995    7.089057    2.636791    3.995038\n College |     733    2.837653    .2296183     6.21668    2.386865    3.288442\n---------+--------------------------------------------------------------------\ncombined |   1,154    3.012132    .1927969    6.549421     2.63386    3.390404\n---------+--------------------------------------------------------------------\n    diff |             .478261    .4004354               -.3074034    1.263925\n------------------------------------------------------------------------------\n    diff = mean(high sch) - mean(College)                         t =   1.1944\nHo: diff = 0                                     degrees of freedom =     1152\n\n    Ha: diff < 0                 Ha: diff != 0                 Ha: diff > 0\nPr(T < t) = 0.8837         Pr(|T| > |t|) = 0.2326          Pr(T > t) = 0.1163`}
              language="output"
            ></CodeChunk>
            <p>t value = 1.1944, P value&gt;0.05</p>
            <p>支持虛無假設，兩群體間沒有差異</p>
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

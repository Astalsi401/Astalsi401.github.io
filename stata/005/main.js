const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <p>在量化分析的過程中，從一開始清理資料、統計分析，到最後輸出結果都少不了大量重複性高的步驟，若能學會利用迴圈處理將使效率大幅提升。</p>
          <p>以下將做簡單的示範，首先匯入資料，並觀察資料的信息：</p>
          <CodeChunk code={`use "tscs071 v5.dta", clear\nnumlabel _all, add\nta e2_1`} lang="stata" />
          <CodeChunk code={`       因為努力不夠 |      Freq.     Percent        Cum.\n--------------------+-----------------------------------\n          1. 很贊成 |        227       11.13       11.13\n            2. 贊成 |      1,053       51.62       62.75\n          3. 不贊成 |        696       34.12       96.86\n        4. 很不贊成 |         46        2.25       99.12\n     95. 不瞭解題意 |          3        0.15       99.26\n97. 不知道,無法選擇 |         13        0.64       99.90\n           98. 拒答 |          2        0.10      100.00\n--------------------+-----------------------------------\n              Total |      2,040      100.00`} lang="output" />
          <CodeChunk code={`d e2_*  /*列出所有以e2_開頭的變項*/`} lang="stata" />
          <CodeChunk code={`              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\ne2_1            byte    %26.0f     e2a        因為努力不夠\ne2_2            byte    %26.0f     e2a        因為命運不好\ne2_3            byte    %26.0f     e2a        因為能力,才智不夠\ne2_4            byte    %26.0f     e2a        因為隨意用錢\ne2_5            byte    %26.0f     e2a        因為身體不好\ne2_6            byte    %26.0f     e2a        因為沒有工作機會\ne2_7            byte    %26.0f     e2a        因為社會對他(她)不公平\ne2_8            byte    %26.0f     e2a        因為他(她)不願意工作\ne2_9            byte    %26.0f     e2a        因為他(她)家庭背景不好`} lang="output" />
          <CodeChunk code={`/*如果後方文字是有序排列，如英文字母或本資料中的數字，亦可用以下方法*/\nd e2_1-e2_9`} lang="stata" />
          <CodeChunk code={`              storage   display    value\nvariable name   type    format     label      variable label\n---------------------------------------------------------------------------------------------------------------\ne2_1            byte    %26.0f     e2a        因為努力不夠\ne2_2            byte    %26.0f     e2a        因為命運不好\ne2_3            byte    %26.0f     e2a        因為能力,才智不夠\ne2_4            byte    %26.0f     e2a        因為隨意用錢\ne2_5            byte    %26.0f     e2a        因為身體不好\ne2_6            byte    %26.0f     e2a        因為沒有工作機會\ne2_7            byte    %26.0f     e2a        因為社會對他(她)不公平\ne2_8            byte    %26.0f     e2a        因為他(她)不願意工作\ne2_9            byte    %26.0f     e2a        因為他(她)家庭背景不好`} lang="output" />
        </>
      ),
    },
    {
      title: "forvalues",
      content: (
        <>
          <p>適合用於將數字代入，例如：</p>
          <p>利用迴圈反向編碼，並將95到98定義為遺失值</p>
          <CodeChunk code={`forvalues i = 1/9 {\n  cap drop e2r_\`i'\n  recode e2_\`i' (1=4) (2=3) (95/98=.) (3=2) (4=1), g(e2r_\`i')\n}`} lang="stata" />
          <CodeChunk code={`(2040 differences between e2_1 and e2r_1)\n(2040 differences between e2_2 and e2r_2)\n(2040 differences between e2_3 and e2r_3)\n(2040 differences between e2_4 and e2r_4)\n(2040 differences between e2_5 and e2r_5)\n(2040 differences between e2_6 and e2r_6)\n(2040 differences between e2_7 and e2r_7)\n(2040 differences between e2_8 and e2r_8)\n(2040 differences between e2_9 and e2r_9)`} lang="output" />
        </>
      ),
    },
    {
      title: "foreach",
      content: (
        <>
          <p>適合用於將文字代入，例如：</p>
          <p>利用迴圈重新命名變項</p>
          <CodeChunk code={`use "tscs071 v4.dta", clear\npreserve\nforeach w in a b c d e f g h {\n  rename e2\`w' e2\`w'new\n}\nrestore`} lang="stata" />
        </>
      ),
    },
    {
      title: "其他範例：",
      content: (
        <>
          <p>在迴圈中放入兩個變數</p>
          <CodeChunk code={`local i = 1\nforeach w in a b c d e f g h i {\n  cap drop e2_\`i'\n  recode e2\`w' (1=4) (2=3) (95/98=.) (3=2) (4=1), g(e2_\`i')\n  local i = \`i'+1\n}`} lang="stata" />
          <CodeChunk code={`(2040 differences between e2a and e2_1)\n(2040 differences between e2b and e2_2)\n(2040 differences between e2c and e2_3)\n(2040 differences between e2d and e2_4)\n(2040 differences between e2e and e2_5)\n(2040 differences between e2f and e2_6)\n(2040 differences between e2g and e2_7)\n(2040 differences between e2h and e2_8)\n(2040 differences between e2i and e2_9)`} lang="output" />
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};

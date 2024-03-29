const Content = () => {
  const sections = [
    {
      title: "Mann Whitney U Test",
      content: (
        <>
          <ol>
            <li>適用範圍：</li>
            <ul>
              <li>此檢驗可看作為t test的替代。當後者違反所謂的equal variance時，可用Mann Whitney U Test作為替代。</li>
              <li>此檢驗屬於nonparametric test，不需要假定母體的分佈呈常態分配。</li>
              <li>即令如此，此假定仍然包含樣本來自隨機抽樣的假定。</li>
              <li>適用於ordinal data，比較兩組之間的差距。</li>
            </ul>
            <li>作法：</li>
            <ol type="i">
              <li>先對樣本中的資訊進行排序</li>
              <li>
                在下列公式中找尋較小值的U
                <img
                  src="data:image/png;base64,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"
                  width="254px"
                  heigh="105px"
                />
                <ul>
                  <li>
                    <i>
                      N<sub>1</sub>
                    </i>
                    與
                    <i>
                      N<sub>2</sub>
                    </i>
                    為各組的個案數
                  </li>
                  <li>
                    &Sigma;
                    <i>
                      R<sub>1</sub>
                    </i>
                    與&Sigma;
                    <i>
                      R<sub>2</sub>
                    </i>
                    為第一組與第二組的排序總和
                  </li>
                </ul>
              </li>
              <li>
                取較小的U值，用於下列公式中，去取得Z值
                <img
                  src="data:image/png;base64,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"
                  width="157"
                  heigh="72"
                />
              </li>
              <li>若Z值大於1.96，則意味著虛無假設遭到拒絕，反之，則保留虛無假設</li>
            </ol>
          </ol>
          <div className="my-2">
            <div className="text-bold text-large">範例：</div>
            <CodeChunk code={`clear\ninput g stress rank\n1 12 10\n1 15 11\n1 4  1\n1 7  3\n1 8  5\n1 16 12\n1 20 15\n1 10 8\n1 8  5\n2 23 17\n2 11 9\n2 24 18\n2 18 13.5\n2 18 13.5\n2 6  2  \n2 9  7\n2 8  5\n2 21 16\nend\n\nranksum stress, by(g)`} lang="stata" />
            <CodeChunk code={`. clear\n\n. input g stress rank\n\n             g     stress       rank\n  1. 1 12 10\n  2. 1 15 11\n  3. 1 4  1\n  4. 1 7  3\n  5. 1 8  5\n  6. 1 16 12\n  7. 1 20 15\n  8. 1 10 8\n  9. 1 8  5\n 10. 2 23 17\n 11. 2 11 9\n 12. 2 24 18\n 13. 2 18 13.5\n 14. 2 18 13.5\n 15. 2 6  2  \n 16. 2 9  7\n 17. 2 8  5\n 18. 2 21 16\n 19. end\n\n. \n. ranksum stress, by(g)\n\nTwo-sample Wilcoxon rank-sum (Mann-Whitney) test\n\n           g |      obs    rank sum    expected\n-------------+---------------------------------\n           1 |        9          70        85.5\n           2 |        9         101        85.5\n-------------+---------------------------------\n    combined |       18         171         171\n\nunadjusted variance      128.25\nadjustment for ties       -0.66\n                     ----------\nadjusted variance        127.59\n\nHo: stress(g==1) = stress(g==2)\n             z =  -1.372\n    Prob > |z| =   0.1700`} lang="output" />
          </div>
        </>
      ),
    },
    {
      title: "Kruskal-Wallis Test",
      content: (
        <>
          <ol>
            <li>
              適用範圍：
              <ul>
                <li>此檢驗可看作為ANOVA的替代。當後者違反所謂的equal variance時，可用Kruskal-Wallis Test作為替代。</li>
                <li>此檢驗屬於nonparametric test，不需要假定母體的分佈呈常態分配。</li>
                <li>即令如此，此假定仍然包含樣本來自隨機抽樣的假定。</li>
                <li>適用於ordinal data，比較三組或以上組別之間的差距。</li>
              </ul>
            </li>
            <li>
              做法：
              <ol type="i">
                <li>先對樣本中的資訊進行排序</li>
                <li>
                  在下列公式中找尋較小值的H
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPUAAAA5CAYAAADum22qAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA2aSURBVHhe7Z0JsM1VHMelRZqmopiSyjoqpCLUUJrs2aKYJEkhChkpURIjO0ORnUqjhRKyDBoqVFJkabNlKUS02FJOfc47571z//d/t+fd++697/eZOfPu//zvu/d/7////Z/f+S3n5lOCIKQVImpBSDNE1IKQZoioBSHNEFELQpohohaENENELQhphohaENIMEbUgpBkiaiHH+Pfff1XXrl3VNddco2rUqKF++eUXs0dIJCJqIceYOnWq+uabb9Tp06dVp06d1F133WX2CIlERO3hxIkT5lEwhw4dktEnDFu3bjWPlNq4caOqWLGi2RISiYja8OOPP6o2bdqoDh06mJ4sEHKdOnXUWWedpfLly6duuOEG9fXXX5u9yc/+/ftV+fLl1VVXXaXq1aun7r///szWtGlTbS7fe++95tkZbNmyRa1bty6z8Xn37t1r9kbmgw8+UEOHDjVbQiIRUf/P5s2b1TvvvKMuvPBC9fDDD5veLO688041c+ZM/bw33nhDP++KK65Qf//9t3lG8jNv3jyVP39+dcstt6jjx4+b3gyWL1+uatWqZbYy+Omnn1T16tX1Tey5555Tb775prr55pvVTTfdpE3scGB+d+nSRR07dsz0CIlERO1QtmzZIFF/+umnavbs2WYrgwkTJuiL/ZNPPjE9qcGQIUP0cbdu3dr0ZDFixAjzKAtuZoUKFVL//POP3j5y5Ii66KKLVJUqVfR2KCZPnqz27dtntoREI6J28BP1jh079Mjj8sUXX2hxrFmzxvSkDkwxOPbBgwebHn8YZQsUKKDuu+8+05MBpnrRokXNVjCM6IzywGtgxguJRUTt4CdqPz788ENVpkwZderUKdOTOuAIrFatmjbFmfeGYtGiRVr8U6ZMMT1KrVq1Svf17NnT9ATy6quv6pG9RIkSul155ZXq8OHDZq+QKETUDtGK+u6779Zz7FQFxx8+gb59+5qeYJ588kkt4FmzZqkVK1aoAQMGaMF27NgxaE5uwUzHz2BbKt700gERtUM0ov78889V27ZtzVZqwoj70EMPBU0rXK6//np17bXX6pEax+Btt92m/vjjD7M3iw0bNgT5HITcRUTtEEnUP//8s3rsscdSyuvthVjyPffc4xuPt59r9+7depR++umn9TbfCfNr4vRe8C+4JrqQ+4ioHcKJ+rffflOPP/54SodpEGXjxo19xfn777/rOTEgUkS9bNkyvY2Xn+2XX35Zb7sw2ouZnVyIqB1CifrPP//UcVcufJexY8eGzUBLJk6ePKlq166t3n333YCkEhrm+B133KEWLFign9uyZUtVsGDBgM/Gd0Oc2uWHH35QxYsXD8gkE3IfEbWB0BUxWC58G5cFnELEawnjWK8uDUdT586dzbOSnwceeECPtuHat99+q0fdwoULByWjDBo0SD/HzaT79ddfdRRASC5E1P+zbds2bXKOGTNGN0YzG4rZtGlTZr+3bd++XT8nUTDaMiqGa8yHvRw4cMD3+L2N+HK7du30KF26dGm1cOFC8wpK7dmzRzvMyEizGWV4xvExJAtMK95++2313nvv6USZUFBNxk08Gfnqq6/Moww4Vs5rLASImrglec3nnHOOatCggVq9erXu58siWYF+whqTJk3S/UJiOXr0qC6SYMSkAoqQlG3EjosVKxZkIseTRx55RL3//vvqr7/+Mj25x9KlS1XlypVVixYttBXFTWnnzp1mbxaInfJQbnSWt956S1199dXqsssu09+xC579yy+/XFtrTDfiBdMgQqXnnXee6cli2rRpYXMKvASN1M2bN1fnn39+0InatWuXvpi6d+9ueoTcgBGGiw8TmSIUF5x5TB8SBUksOM9yO8GElNSnnnoqwHtfpEgR1bt3b71tQdD169fPzHhzYSrF9e3nya9atarv/4Ti+++/j+lGx3Ex9eEYzj33XNMbCJGIJUuWmK3wBIgaTyZfht+Fwd2CD02mkZC7rFy5Up/86667Lsh5N3/+fPMo/nCD8YtdJxqmT14P/K233qpeeOEFs5UBzk7r4feCZYqV6rV0+H4pbIkFfC4UycTKiy++GFLUTL3IG8BpG4kAUX/55ZdauMOGDTM9WZADTKxSKm+SA4omOFcNGzbU8y4hC0pEKTV159WMhPgE/G5C3BTwDUycOFF/p5999pnZo/T04vnnnzdb0REPUQOFONEcS4CoX3rpJf2hyG3G3LYN04O5dDQrWfCFvPLKKxGbna8L2adbt276fNkkESGjLp7stz59+gREMahQq1SpktkKhOtxzpw5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"
                    width="245px"
                    heigh="57px"
                  />
                  <ul>
                    <li>
                      <i>N</i>為個案總數
                    </li>
                    <li>
                      <i>
                        n<sub>i</sub>
                      </i>
                      為各組的個案數
                    </li>
                    <li>
                      &Sigma;(
                      <i>
                        R<sub>i</sub>
                      </i>
                      )<sup>2</sup>是各組排序的總和
                    </li>
                  </ul>
                </li>
                <li>若H值大於1.96，則意味著虛無假設遭到拒絕，反之則保留虛無假設</li>
              </ol>
            </li>
          </ol>
          <div className="my-2">
            <div className="text-bold text-large">範例：</div>
            <CodeChunk code={`clear\ninput g reward\n1 20\n1 15\n1 17\n1 13\n1 18\n1 16\n2 14\n2 8\n2 11\n2 10\n2 6\n2 9\n3 12\n3 11\n3 9\n3 5\n3 6\n3 7\nend`} lang="stata" />
            <CodeChunk code={`. clear\n\n. input g reward\n\n             g     reward\n  1. 1 20\n  2. 1 15\n  3. 1 17\n  4. 1 13\n  5. 1 18\n  6. 1 16\n  7. 2 14\n  8. 2 8\n  9. 2 11\n 10. 2 10\n 11. 2 6\n 12. 2 9\n 13. 3 12\n 14. 3 11\n 15. 3 9\n 16. 3 5\n 17. 3 6\n 18. 3 7\n 19. end`} lang="output" />
            <p>Stata算出H=11.038</p>
            <CodeChunk code={`kwallis reward, by(g)`} lang="stata" />
            <CodeChunk code={`. kwallis reward, by(g)\n\nKruskal-Wallis equality-of-populations rank test\n\n  +--------------------+\n  | g | Obs | Rank Sum |\n  |---+-----+----------|\n  | 1 |   6 |    92.00 |\n  | 2 |   6 |    44.50 |\n  | 3 |   6 |    34.50 |\n  +--------------------+\n\nchi-squared =    11.038 with 2 d.f.\nprobability =     0.0040\n\nchi-squared with ties =    11.072 with 2 d.f.\nprobability =     0.0039`} lang="output" />
            <p>df=2 以組數來計算df</p>
            <CodeChunk code={`di invchi2tail(2, .05)`} lang="stata" />
            <CodeChunk code={`. di invchi2tail(2, .05)\n5.9914645`} lang="output" />
          </div>
        </>
      ),
    },
  ];
  return sections.map((section) => <Block title={section.title} content={section.content} />);
};

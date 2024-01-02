const Content = () => {
  const sections = [
    {
      title: "",
      content: (
        <>
          <p>更改工作資料夾</p>
          <CodeChunk code={`setwd("D:/Documents/R/sna/week02")`} lang="r" />
          <p>確認工作資料夾</p>
          <CodeChunk code={`getwd()`} lang="r" />
          <CodeChunk code={`## [1] "D:/Documents/R/site"`} lang="output" />
          <p>列出工作資料夾內的檔案</p>
          <CodeChunk code={`list.files()`} lang="r" />
          <CodeChunk code={`## [1] "01.Rmd"`} lang="output" />
          <p>清空記憶體</p>
          <CodeChunk code={`rm(list = ls())`} lang="r" />
        </>
      ),
    },
    {
      title: "R的符號",
      content: (
        <>
          <ul>
            <li>
              <p>
                <code>&lt;-</code>：賦值符號
              </p>
            </li>
            <li>
              <p>
                <code>==</code>：等於
              </p>
            </li>
            <li>
              <p>
                <code>#</code>：加上註解
              </p>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "資料輸入",
      content: (
        <>
          <p>建立變項a=30</p>
          <CodeChunk code={`a <- 30\na`} lang="r" />
          <CodeChunk code={`## [1] 30`} lang="output" />
          <p>變項計算</p>
          <CodeChunk code={`a+10`} lang="r" />
          <CodeChunk code={`## [1] 40`} lang="output" />
          <CodeChunk code={`a/10`} lang="r" />
          <CodeChunk code={`## [1] 3`} lang="output" />
          <CodeChunk code={`sqrt(a)`} lang="r" />
          <CodeChunk code={`## [1] 5.477226`} lang="output" />
          <CodeChunk code={`d <- sqrt(a)\nd`} lang="r" />
          <CodeChunk code={`## [1] 5.477226`} lang="output" />
          <CodeChunk code={`d <- sqrt(a);d  #也可以寫在同一行`} lang="r" />
          <CodeChunk code={`## [1] 5.477226`} lang="output" />
          <p>讓R進行判斷</p>
          <CodeChunk code={`d==a`} lang="r" />
          <CodeChunk code={`## [1] FALSE`} lang="output" />
          <CodeChunk code={`d!=a`} lang="r" />
          <CodeChunk code={`## [1] TRUE`} lang="output" />
          <CodeChunk code={`d<a`} lang="r" />
          <CodeChunk code={`## [1] TRUE`} lang="output" />
          <CodeChunk code={`d>a`} lang="r" />
          <CodeChunk code={`## [1] FALSE`} lang="output" />
          <p>列出變項與移除物件</p>
          <CodeChunk code={`ls()   #列出當前的變項`} lang="r" />
          <CodeChunk code={`## [1] "a" "d"`} lang="output" />
          <CodeChunk code={`rm(d);ls()   #移除變項d, 並列出剩餘變項`} lang="r" />
          <CodeChunk code={`## [1] "a"`} lang="output" />
          <CodeChunk code={`rm(list = ls()); ls()  #移除所有變項`} lang="r" />
          <CodeChunk code={`## character(0)`} lang="output" />
        </>
      ),
    },
    {
      title: "矩陣",
      content: (
        <>
          <p>建立名為mat的矩陣，內容物為1~36，row=6，column=6</p>
          <CodeChunk code={`mat <- matrix(1:36, nr=6, ncol=6); mat`} lang="r" />
          <CodeChunk code={`##      [,1] [,2] [,3] [,4] [,5] [,6]\n## [1,]    1    7   13   19   25   31\n## [2,]    2    8   14   20   26   32\n## [3,]    3    9   15   21   27   33\n## [4,]    4   10   16   22   28   34\n## [5,]    5   11   17   23   29   35\n## [6,]    6   12   18   24   30   36`} lang="output" />
          <p>分別列出矩陣中的數字</p>
          <CodeChunk code={`mat[1,]  #row=1`} lang="r" />
          <CodeChunk code={`## [1]  1  7 13 19 25 31`} lang="output" />
          <CodeChunk code={`mat[,1]  #column=1`} lang="r" />
          <CodeChunk code={`## [1] 1 2 3 4 5 6`} lang="output" />
          <CodeChunk code={`mat[2,3]  #row=2, column=3`} lang="r" />
          <CodeChunk code={`## [1] 14`} lang="output" />
          <CodeChunk code={`mat[1:3,]  #row=1~3`} lang="r" />
          <CodeChunk code={`##      [,1] [,2] [,3] [,4] [,5] [,6]\n## [1,]    1    7   13   19   25   31\n## [2,]    2    8   14   20   26   32\n## [3,]    3    9   15   21   27   33`} lang="output" />
          <CodeChunk code={`mat[1:3,1:3]  #row=1~3, column=1~3`} lang="r" />
          <CodeChunk code={`##      [,1] [,2] [,3]\n## [1,]    1    7   13\n## [2,]    2    8   14\n## [3,]    3    9   15`} lang="output" />
          <p>矩陣轉置</p>
          <CodeChunk code={`t(mat)`} lang="r" />
          <CodeChunk code={`##      [,1] [,2] [,3] [,4] [,5] [,6]\n## [1,]    1    2    3    4    5    6\n## [2,]    7    8    9   10   11   12\n## [3,]   13   14   15   16   17   18\n## [4,]   19   20   21   22   23   24\n## [5,]   25   26   27   28   29   30\n## [6,]   31   32   33   34   35   36`} lang="output" />
          <p>其他矩陣功能</p>
          <CodeChunk code={`mat2 <- cbind(1:10,21:30); mat2  #以column排序(預設)`} lang="r" />
          <CodeChunk code={`##       [,1] [,2]\n##  [1,]    1   21\n##  [2,]    2   22\n##  [3,]    3   23\n##  [4,]    4   24\n##  [5,]    5   25\n##  [6,]    6   26\n##  [7,]    7   27\n##  [8,]    8   28\n##  [9,]    9   29\n## [10,]   10   30`} lang="output" />
          <CodeChunk code={`mat3 <- rbind(1:10,21:30); mat3  #以row排序`} lang="r" />
          <CodeChunk code={`##      [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10]\n## [1,]    1    2    3    4    5    6    7    8    9    10\n## [2,]   21   22   23   24   25   26   27   28   29    30`} lang="output" />
          <CodeChunk code={`dim(mat2)   #計算矩陣的大小：row=10 col=2`} lang="r" />
          <CodeChunk code={`## [1] 10  2`} lang="output" />
          <CodeChunk code={`nrow(mat2); ncol(mat2)  #分別列出矩陣的row、column`} lang="r" />
          <CodeChunk code={`## [1] 10`} lang="output" />
          <CodeChunk code={`## [1] 2`} lang="output" />
          <CodeChunk code={`mat4 <- mat2*2; mat4`} lang="r" />
          <CodeChunk code={`##       [,1] [,2]\n##  [1,]    2   42\n##  [2,]    4   44\n##  [3,]    6   46\n##  [4,]    8   48\n##  [5,]   10   50\n##  [6,]   12   52\n##  [7,]   14   54\n##  [8,]   16   56\n##  [9,]   18   58\n## [10,]   20   60`} lang="output" />
          <CodeChunk code={`mat2+mat4`} lang="r" />
          <CodeChunk code={`##       [,1] [,2]\n##  [1,]    3   63\n##  [2,]    6   66\n##  [3,]    9   69\n##  [4,]   12   72\n##  [5,]   15   75\n##  [6,]   18   78\n##  [7,]   21   81\n##  [8,]   24   84\n##  [9,]   27   87\n## [10,]   30   90`} lang="output" />
          <CodeChunk code={`mat2 %*% mat3  # %*% 矩陣相乘符號`} lang="r" />
          <CodeChunk code={`##       [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10]\n##  [1,]  442  464  486  508  530  552  574  596  618   640\n##  [2,]  464  488  512  536  560  584  608  632  656   680\n##  [3,]  486  512  538  564  590  616  642  668  694   720\n##  [4,]  508  536  564  592  620  648  676  704  732   760\n##  [5,]  530  560  590  620  650  680  710  740  770   800\n##  [6,]  552  584  616  648  680  712  744  776  808   840\n##  [7,]  574  608  642  676  710  744  778  812  846   880\n##  [8,]  596  632  668  704  740  776  812  848  884   920\n##  [9,]  618  656  694  732  770  808  846  884  922   960\n## [10,]  640  680  720  760  800  840  880  920  960  1000`} lang="output" />
          <CodeChunk code={`mat2>4  #確認mat2中有多少大於4`} lang="r" />
          <CodeChunk code={`##        [,1] [,2]\n##  [1,] FALSE TRUE\n##  [2,] FALSE TRUE\n##  [3,] FALSE TRUE\n##  [4,] FALSE TRUE\n##  [5,]  TRUE TRUE\n##  [6,]  TRUE TRUE\n##  [7,]  TRUE TRUE\n##  [8,]  TRUE TRUE\n##  [9,]  TRUE TRUE\n## [10,]  TRUE TRUE`} lang="output" />
        </>
      ),
    },
    {
      title: "建立資料",
      content: (
        <>
          <CodeChunk code={`alist <- list(1:6, mat2, "ABCDE"); alist  #將3個變項分別儲存在3個儲存位`} lang="r" />
          <CodeChunk code={`## [[1]]\n## [1] 1 2 3 4 5 6\n## \n## [[2]]\n##       [,1] [,2]\n##  [1,]    1   21\n##  [2,]    2   22\n##  [3,]    3   23\n##  [4,]    4   24\n##  [5,]    5   25\n##  [6,]    6   26\n##  [7,]    7   27\n##  [8,]    8   28\n##  [9,]    9   29\n## [10,]   10   30\n## \n## [[3]]\n## [1] "ABCDE"`} lang="output" />
          <CodeChunk code={`alist[[1]]     #查看第一格儲存位`} lang="r" />
          <CodeChunk code={`## [1] 1 2 3 4 5 6`} lang="output" />
          <CodeChunk code={`alist[[2]]     #查看第二格`} lang="r" />
          <CodeChunk code={`##       [,1] [,2]\n##  [1,]    1   21\n##  [2,]    2   22\n##  [3,]    3   23\n##  [4,]    4   24\n##  [5,]    5   25\n##  [6,]    6   26\n##  [7,]    7   27\n##  [8,]    8   28\n##  [9,]    9   29\n## [10,]   10   30`} lang="output" />
          <CodeChunk code={`alist[[1]][5]  #查看第一格第五個`} lang="r" />
          <CodeChunk code={`## [1] 5`} lang="output" />
          <CodeChunk code={`alist <- list(element1=1:6, element2=mat2)    #將儲存位分別命名為element1、element2\nnames(alist)  #查看資料中的變項`} lang="r" />
          <CodeChunk code={`## [1] "element1" "element2"`} lang="output" />
          <CodeChunk code={`alist$element1  #直接以變項名稱叫出`} lang="r" />
          <CodeChunk code={`## [1] 1 2 3 4 5 6`} lang="output" />
        </>
      ),
    },
  ];
  return sections.map((section, i) => <Block key={i} title={section.title} content={section.content} />);
};

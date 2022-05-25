clear
cd "D:/Documents/Git/stata/other/02"  /*檔案所在的工作目錄*/
webdoc init example2, replace logall /// /*example2: 檔案名*/
       head(w(800px) t("example2") st(ocean cbf))  

/***
將Html語法的文字輸入在這裡，ex:

<h1>標題</h1>
<h2>標題2</h2>
<ul>
	<li>A</li>
	<li>B</li>
	<li>C</li>
</ul>
***/

/*將Stata code輸入在這裡, ex:*/
cd "D:/Documents/Stata/Stata/data"
use us_birth_rate, clear
list in 1/8
cd "D:/Documents/Git/stata/other/02"

/***
另一段Html....
***/

/*另一段Stata code....*/




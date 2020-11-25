const express = require('express');
const app = express();
const fs = require('fs');
const sd = require('silly-datetime');
const readline = require('readline');

app.use(express.static('./public'));

let oldHtmlContent = fs.readFileSync('./index.html').toString(); //讀取index.html文檔

app.get('/', function(req, res) {
    res.send(oldHtmlContent);
    fs.writeFileSync('records.txt', ''); //初始化txt為空白
});

app.get('/comment', function(req, res) {

    writeRecord(req.query.comment, sd.format(new Date(), 'YYYY-MM-DD HH:mm')); //記錄評論與時間

    //加載評論
    let newHtmlContent = '';
    let r = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/ //匹配日期
    let floorNumber = 2;
    let comment = '';
    //使用readline逐行讀取文件
    const r1 = readline.createInterface({
        input: fs.createReadStream('./records.txt')
    })
    r1.on('line', (line) => {
        if (r.test(line)) {
             //新評論的HTML代碼
            newHtmlContent =
                `<div class="comment">
                <span class="comment-avatar">
                <img src="avatar1.jpg" alt="avatar">
                </span>
                <div class="comment-content">
                    <p class="comment-content-name">EdmundDZhang</p>
                    <p class="comment-content-article">${comment}</p>
                    <p class="comment-content-footer">
                        <span class="comment-content-footer-id">#${++floorNumber}</span>
                        <span class="comment-content-footer-timestamp">${line}</span>
                    </p>
                </div>
                <div class="cls"></div>
                </div>` + newHtmlContent;
            comment = '';
        } else {
            comment += line;
        }
    }).on('close', () => {
        res.send(oldHtmlContent.replace('<div class="comment-list" id="commentList">', '<div class="comment-list" id="commentList">\n' + newHtmlContent));
    })
})

function writeRecord(comment, datetime) {
    fs.writeFileSync('./records.txt', `${comment}\n${datetime}\n`, { flag: 'a' });
}

app.listen(8888, 'https://astalsi401.github.io/comment');
let writeContents = () => {
    fetch(requestURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        /*寫入文字*/
        data.htmlCode.forEach((a) => {
          $(a.id).html(a.text);
        });
        /*寫入目錄*/
        data.sidebarHtml.forEach((a) => {
          let index = `<div><a href="${a.link}">${a.title}</a></div><ul>`;
          a.page.forEach((b) => {
            index += `<li><a class="page" href="${b.plink}">${b.ptitle}`;
            if (b.section.length != 0) {
              index += `<span></span>`;
            }
            index += `</a><ul>`;
            b.section.forEach((c) => {
              index += `<li><a href="${c.slink}">${c.stitle}</a></li>`;
            });
            index += `</ul></li>`;
          });
          $(a.id).html(index);
        });
        /*sidebar目錄展開*/
        $("#sidebarBtn").click(() => {
          $(".sidebar").toggleClass("show");
          $("#sidebarBtn").toggleClass("active");
        });
        $(".page").click(function () {
          $(this).parent().find("ul").slideToggle("200ms");
          $(this).find("span").toggleClass("active");
        });
      });
  },
  writePics = () => {
    try {
      fetch(picsUrl)
        .then((res) => {
          return res.json();
        })
        .then((pics) => {
          /*載入圖片*/
          pics.pics.forEach((a) => {
            $(a.id).attr("src", a.pic);
          });
        });
    } catch {
      null;
    }
  },
  copyCode = () => {
    /*copy code*/
    $("pre").append('<div class="copy" title="copy"></div>');
    $("code div.copy").click(function (e) {
      var text = $(this).parent().text().trim() + " \n",
        copyHex = document.createElement("input");
      copyHex.value = text;
      document.body.appendChild(copyHex);
      copyHex.select();
      document.execCommand("copy");
      document.body.removeChild(copyHex);
    });
    $("pre div.copy").click(function (e) {
      var text = $(this).parent().text().trim(),
        copyHex = document.createElement("textarea");
      copyHex.value = text;
      document.body.appendChild(copyHex);
      copyHex.select();
      document.execCommand("copy");
      document.body.removeChild(copyHex);
    });
  },
  sortTable = () => {
    /*sort table*/
    var inverse = false;
    $("th").click(function () {
      var header = $(this),
        index = header.index();
      header
        .closest("table")
        .find("td")
        .filter(function () {
          return $(this).index() === index;
        })
        .sortElements(
          (a, b) => {
            a = $(a).text();
            b = $(b).text();
            return (isNaN(a) || isNaN(b) ? a > b : +a > +b) ? (inverse ? -1 : 1) : inverse ? 1 : -1;
          },
          function () {
            return this.parentNode;
          }
        );
      $(".order-table thead th span").removeClass();
      if (inverse) {
        $(this).find("span").addClass("descend");
      } else {
        $(this).find("span").addClass("ascend");
      }
      inverse = !inverse;
    });
  },
  tables = $("#tuneList"),
  tableFilter = () => {
    let input = $(".table-filter").val().toLowerCase(),
      rows = tables.find("tr");
    rows.each(function (i) {
      $(this).text().toLowerCase().includes(input) ? $(this).css({ display: "table-row" }) : $(this).css({ display: "none" });
    });
  },
  style = () => {
    let switchWidth = $(".tags li").length;
    $(".tags")
      .children()
      .css({ width: `calc(100% / ${switchWidth})` });
    $(".switch").css({ width: `calc(100% * ${switchWidth})` });
  },
  scroll = function () {
    $("html,body").animate({ scrollTop: $(this).attr("href").offset().top }, 800);
  };
$(document).ready(() => {
  writePics();
  writeContents();
  copyCode();
  style();
  sortTable();
  /*點擊sidebar之外可隱藏sidebar*/
  $(document).click((e) => {
    if (!$(e.target).parents().hasClass("sidebar") && !$(e.target).hasClass("sidebarBtn")) {
      $(".sidebar").removeClass("show");
      $("#sidebarBtn").removeClass("active");
    }
  });
  /*show stata code*/
  $("#showCode").click(() => {
    $("#code").toggleClass("active");
  });
  /*點擊圖片放大&縮小*/
  $(".img-block").click(function () {
    $(".largePic").addClass("active");
    $("#pic").html(`<img src="${$(this).find("img").attr("src")}">`);
  });
  $(".largePic").click(() => {
    $(".largePic").removeClass("active");
  });
  /*FH4 基礎調教*/
  $(".tags li").click(function () {
    let index = $(this).index();
    $(".tags div.active").css({ left: `calc(${index} * 100% / (${$(this).parent().find("li").size()}))` });
    $(".switch").css({ left: `calc(${index} * -100%)` });
  });
  $(".table-filter").on("input", tableFilter);
  $("a").on("click", scroll);
});

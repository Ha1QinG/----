(function () {
  // 默认参数
  var DEFAULT = {
    autoplay: true, // 自动播放
    delay: 1000, // 播放时间间隔
    group: 3, // 单页个数
    control: true, // 按钮控件(左右按钮，页码)
    mouse: false, // 划过暂停,划出播放
  };

  // 暴露构造函数
  window.Slide = Slide;

  function Slide(element, options) {
    // 合并参数
    options = Object.assign({}, DEFAULT, options);

    var targets = document.querySelectorAll(element);

    targets.forEach(function (slide) {
      var index = 0;

      var ul = slide.firstElementChild;

      var firstLi = ul.firstElementChild;

      var firstLiWidth = firstLi.offsetWidth; // 第一个li 的宽度

      var moveDist = firstLiWidth * options.group; // 一次移动的宽度

      var space = moveDist * index;

      var total = ul.childElementCount; // li的总个数

      var totalGroup = Math.ceil(total / options.group); //总组数

      var btns = document.querySelectorAll('[name="page"]');

      // 判断是否支持按钮控件
      if (options.control) {
        var prevBtnEl = document.createElement("button");
        prevBtnEl.innerHTML = "&lt;";
        prevBtnEl.className = "prevbtn";

        var nextBtnEl = document.createElement("button");
        nextBtnEl.innerHTML = "&gt;";
        nextBtnEl.className = "nextbtn";

        prevBtnEl.onclick = function () {
          index--;
          space += moveDist;

          if (index === -1) {
            index = totalGroup - 1;
            space = -(moveDist * (totalGroup - 1));
          }

          ul.style.transform = "translateX(" + space + "px)";
        };

        nextBtnEl.onclick = function () {
          index++;
          space -= moveDist;
          if (index === totalGroup) {
            index = 0;
            space = 0;
          }
          ul.style.transform = "translateX(" + space + "px)";
        };

        slide.append(prevBtnEl, nextBtnEl);

        for (let i = 0; i < totalGroup; i++) {
          var page = document.createElement("button");
          page.value = i;
          page.innerText = i + 1;
          if (page.value === index) page.className = "checked";
          page.onclick = function skip() {
            index = i;
            space = (i - 1) * -moveDist;
            play();
            console.log(index);
            console.log(space);
          }; // 跳转函数
          slide.append(page);
        }
      }

      // 判断是否支持自动播放
      if (options.autoplay) {
        var int = null;

        play();

        function play() {
          if (int) {
            clearInterval(int);
          }
          int = setInterval(() => {
            index++;
            space -= moveDist;
            if (index === totalGroup) {
              index = 0;
              space = 0;
            }
            ul.style.transform = "translateX(" + space + "px)";
          }, options.delay);
        }
        slide.onmouseenter = function () {
          clearInterval(int);
        };
        slide.onmouseleave = function () {
          play();
        };
      }

      //
    });
  }
})();

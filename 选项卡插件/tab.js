(function () {
  var DEFAULTS = {
    index: 1,
    event: "click",
    change: function () {},
  };

  function TAB(element, options) {
    options = Object.assign({}, DEFAULTS, options);

    var targets = document.querySelectorAll(element);

    var THIS = this; // 指向选项卡

    targets.forEach(function (tab) {
      var content = document.querySelectorAll(element + " .content");
      var labels = document.querySelectorAll(element + "  label");

      if (options.index === 1) {
        content[0].classList.add("visiable");
        labels[0].classList.add("checked");
      } else {
        content[options.index - 1].classList.add("visiable");
        labels[options.index - 1].classList.add("checked");
      }

      if (options.event == "mouseenter") {
        for (var i = 0; i < labels.length; i++) {
          labels[i].index = i;
          labels[i].onmouseover = function () {
            for (var i = 0; i < labels.length; i++) {
              labels[i].className = "";
            }
            this.className = "checked";
            for (var i = 0; i < content.length; i++) {
              content[i].classList.add("hidden");
              content[i].classList.remove("visiable");
            }
            content[this.index].classList.add("visiable");
          };
        }
      }

      if (options.event === "click") {
        for (var i = 0; i < labels.length; i++) {
          labels[i].index = i;
          labels[i].onclick = function () {
            for (var i = 0; i < labels.length; i++) {
              labels[i].className = "";
            }
            this.className = "checked";
            for (var i = 0; i < content.length; i++) {
              content[i].classList.add("hidden");
              content[i].classList.remove("visiable");
            }
            content[this.index].classList.add("visiable");
          };
        }
      }
      // function 回调函数

    }); // forEach 循环结束
  }

  window.TAB = TAB;
})();

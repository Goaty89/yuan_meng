var button_overlay = [
    [
      {id: 'path4604', d: 'm 52.987578,37.012422 0,-14.012422 14.012422,14.012422 z', fill: '#eec16e'},
      {id: 'path5200', d: 'm 67,23 0,14.1 -14.1,-14.1 z', fill: '#eec16e'},
    ],
    [
      {id: '#path4604', d: 'm 82.987578,22.987654 0,14.024692 14.012422,-14.024692 z', fill: '#c63f2b'},
      {id: '#path5200', d: 'm 82.9,37.012346 14.1,0.08765 0,-14.2 z', fill: '#c63f2b'},
    ],
    [
      {id: '#path4604', d: 'm 52.987578,37.012422 0,-14.012422 14.012422,14.012422 z', fill: '#eec16e'},
      {id: '#path5200', d: 'm 67,23 0,14.1 -14.1,-14.1 z', fill: '#eec16e'},
    ]
    ];
    
    var ts = [];
    var curIndex = 0;
    var timeId = null;
    var slideTimeout = 7000;
       
    function changeSlider(index) {
      // get current slide
      var current = $('.flex--active').data('slide'),
        // get button data-slide
        next = index+1
    
      $('.slide-nav').removeClass('active');
      $(`.flex__container[data-slide="${next}"]`).addClass('active');
    
      if (current === next) {
        return false;
      } else {
        $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
        $('.flex--active').addClass('animate--end');
        setTimeout(function() {
          $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
          $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
        }, 800);
      }
    }

    function show(index, withDelay) {
      ts[index].length = 0;
      button_overlay[(index + 3)% 2 + 1].forEach(function(path, i) {
        var delay = withDelay ? 10 * i : 0;
        ts[index].push(
          new anime({
            targets: path.id,
            d: {
              value: path.d,
              duration: 1000,
              easing: "easeInOutQuad"
            },
            fill: {
              value: path.fill,
              duration: 1000,
              easing: "easeInOutQuad"
            },
            delay: delay
          })
        );
        changeSlider(index);
      });
    }
    
    function play(index) {
      ts[index].forEach(function(a) {
        a.play();
      });
    }
    
    var svg = document.querySelector(".slider__toggle");
    var count = button_overlay[0].length;
    
    button_overlay[0].forEach(function(path, index) {
      var newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.append(newPath);
      newPath.setAttribute("id", path.id);
      newPath.setAttribute("d", path.d);
      newPath.setAttribute("style", "fill:" + path.fill);
    });
    
    ts.push([]);
    ts.push([]);
    
    function prev() {
      curIndex--;
      if (curIndex < 0) curIndex = 1;
    }
    
    function next() {
      curIndex++;
      curIndex %= 2;
    }
    
    function resetAnimations(index) {
      ts.forEach(function(t) {
        if (t)
          t.forEach(function(a) {
            a.pause();
          });
      });
      show(index, false);
      play(index);
      curIndex = index;
      clearTimeout(timeId);
      timeId = setTimeout(slideshow, slideTimeout);
    }
    
    function restartAnimation(index) {
      resetAnimations(index);
    }
    
    function restartAnimationPrev() {
      prev();
      resetAnimations(curIndex);
    }
    
    function restartAnimationNext() {
      next();
      resetAnimations(curIndex);
    }
    
    document.addEventListener(
      "keydown",
      function(event) {
        if (event.keyCode >= 49 && event.keyCode <= 53) {
          restartAnimation(event.keyCode - 49);
        } else if (event.keyCode === 37) {
          // left
          restartAnimationPrev();
        } else if (event.keyCode === 39) {
          // right
          restartAnimationNext();
        }
      },
      false
    );
    
    function advance() {
      next();
      show(curIndex, true);
      play(curIndex);
    }
    
    function goTo(index) {
      restartAnimation(index);
    }
    
    function slideshow() {
      advance();
      timeId = setTimeout(slideshow, slideTimeout);
    }
    timeId = setTimeout(slideshow, slideTimeout);
    
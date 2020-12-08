
$(function() {
  // var placeholderImage = 'https://dummyimage.com/1920x1920/000/fff&text=Loading',
  var placeholderImage = 'images/loading.gif',
    backTopEl = document.querySelector('#backTop'),
    backTopTimer = null,
    n = 0,
    imgLen = 0,
    imgageList = []

  function render(data) {
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < data.length; i++) {
      var imgElement = document.createElement('img')
      imgElement.dataset.src = 'images/graphic_design/' + data[i]
      imgElement.src = placeholderImage
      imgElement.alt = data[i]
      fragment.appendChild(imgElement)
    }
    $('#container').append(fragment)
    imgageList = document.getElementsByTagName('img')
    lazyLoad()
    window.addEventListener('scroll', throttle(lazyLoad))
  }

  function lazyLoad() {
    // 可视区域高度
    var viewHeight = document.documentElement.clientHeight
    // 滚动条距离顶部高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    backTopEl.style.display = scrollTop > 900 ? 'block' : 'none'
    for (var i = n; i < imgLen; i++) {
      if (imgageList[i].offsetTop < viewHeight + scrollTop) {
        if (imgageList[i].src.indexOf('loading') > -1) {
          imgageList[i].src = imgageList[i].dataset.src
        }
        n = i + 1
      }
      
    }
  }

  backTopEl.addEventListener('click', function() {
    cancelAnimationFrame(backTopTimer)
    var viewHeight = document.documentElement.clientHeight
    
    backTopTimer = requestAnimationFrame(function fn() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 0) {
        // document.body.scrollTop = document.documentElement.scrollTop = scrollTop - viewHeight * 2
        scrollBy(0, -(viewHeight * 6))
        backTopTimer = requestAnimationFrame(fn)
      } else {
        cancelAnimationFrame(fn)
      }
    })
  })

  function throttle(fn, threshold) {
    var threshold = threshold || 300
    var timeout, start = new Date
    return function() {
      var context = this,
        curr = new Date() - 0
      
      clearTimeout(timeout)
      if (curr - start > threshold) {
        fn.apply(context, arguments)
        start = curr
      } else {
        timeout = setTimeout(function() {
          fn.apply(context, arguments)
        }, threshold)
      }
    }
  }

  $.ajax({
    url: 'graphic_design.json',
    dataType: 'json',
    success: function(data) {
      imgLen = data.list.length
      render(data.list)
    }
  })
})

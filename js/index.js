$(function() {
  var placeholderImage = 'https://dummyimage.com/1920x1920/000/fff&text=Loading',
    n = 0,
    imgLen = 0,
    imgageList = []

  function render(data) {
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < data.length; i++) {
      var imgElement = document.createElement('img')
      imgElement.dataset.src = 'images/' + data[i]
      imgElement.src = placeholderImage
      imgElement.alt = data[i]
      fragment.appendChild(imgElement)
    }
    $('#container').append(fragment)
    imgageList = document.getElementsByTagName('img')
    lazyLoad()
    window.onscroll = lazyLoad
  }

  function lazyLoad() {
    // 可视区域高度
    let viewHeight = document.documentElement.clientHeight
    // 滚动条距离顶部高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    for (var i = n; i < imgLen; i++) {
      if (imgageList[i].offsetTop < viewHeight + scrollTop) {
        if (imgageList[i].src.indexOf('Loading') > -1) {
          imgageList[i].src = imgageList[i].dataset.src
        }
        n = i + 1
      }
      
    }
  }

  $.ajax({
    url: 'images.json',
    dataType: 'json',
    success: function(data) {
      imgLen = data.list.length
      render(data.list)
    }
  })
})
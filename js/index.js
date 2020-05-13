$(function() {
  function render(data) {
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < data.length; i++) {
      var imgElement = document.createElement('img')
      imgElement.src = 'images/' + data[i]
      imgElement.alt = data[i]
      fragment.appendChild(imgElement)
    }
    $('#container').append(fragment)
  }

  $.ajax({
    url: 'images.json',
    dataType: 'json',
    success: function(data) {
      render(data.list)
    }
  })
})
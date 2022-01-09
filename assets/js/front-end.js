$(".buy-package").on("click", function(e) {
  e.preventDefault()
  e.stopPropagation()

  console.log('buy-package')
})
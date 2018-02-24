/* global $, localStorage */
var genieRouterEndpoint = null
var userId = null
var templateUserMessage = $('.js-user-msg-template').html()
var templateRouterMessage = $('.js-router-msg-template').html()

function startChat (endpoint) {
  userId = generateUserId()
  genieRouterEndpoint = endpoint

  $('.chat-input').keypress(function (ev) {
    if (ev.which === 13) {
      ev.preventDefault()
      sendMessage($(this).val())
      $(this).val('')
    }
  })
}

function sendMessage (input) {
  var inputObj = {input: input, metadata: {userId: userId}}
  addMessage(templateUserMessage, input)

  $.ajax({
    url: genieRouterEndpoint,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(inputObj)
  })
    .done(function (response) {
      addMessage(templateRouterMessage, response.message.message)
    })
    .fail(function (error) {
      console.log(error)
      addMessage(templateRouterMessage, 'Error, unfortunately. Try again.')
    })
}

// Uses http://jsfiddle.net/dotnetCarpenter/KpM5j/
function addMessage (template, message) {
  var out = $('.messages')
  var outElem = out.get(0)
  var isScrolledToBottom = outElem.scrollHeight - outElem.clientHeight <= outElem.scrollTop + 1
  out.append(template.replace('{{text}}', message))
  // scroll to bottom if isScrolledToBotto
  if (isScrolledToBottom) {
    outElem.scrollTop = outElem.scrollHeight - outElem.clientHeight
  }
}

function generateUserId () {
  if (localStorage.getItem('genie-router-webclient')) {
    return localStorage.getItem('genie-router-webclient')
  }

  var id = (new Date()).getTime()
  localStorage.setItem('genie-router-webclient', id)
  return id
}

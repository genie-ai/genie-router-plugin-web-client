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
  $('.chat').append(templateUserMessage.replace('{{text}}', input))
  $.ajax({
    url: genieRouterEndpoint,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(inputObj)
  })
    .done(function (response) {
      $('.chat').append(templateRouterMessage.replace('{{text}}', response.message.message))
    })
    .fail(function (error) {
      console.log(error)
      $('.chat').append(templateRouterMessage.replace('{{text}}', 'Error, unfortunately. Try again.'))
    })
}

function generateUserId () {
  if (localStorage.getItem('genie-router-webclient')) {
    return localStorage.getItem('genie-router-webclient')
  }

  var id = (new Date()).getTime()
  localStorage.setItem('genie-router-webclient', id)
  return id
}

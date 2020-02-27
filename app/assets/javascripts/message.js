$(function(){ 
  console.log(last_message_id);
      function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="main-chat__message-list__comment-box">
              <div class="main-chat__message-list__comment-box__name">
                ${message.user_name}
              </div>
                <div class="main-chat__message-list__comment-box__name__date">
                  ${message.created_at}
                </div>
            </div>
            <div class="main-chat__message-list__comment-box__message">
              <p class="main-chat__message-list__comment-box__message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="main-chat__message-list__comment-box">
              <div class="main-chat__message-list__comment-box__name">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__comment-box__name__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__message-list__comment-box__message">
              <p class="main-chat__message-list__comment-box__message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }


  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-chat__message-list').append(html);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
        $('form')[0].reset();
        $('.btn--send').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    })







      var reloadMessages = function() {
        var last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
        })
        .fail(function() {
          alert('error');
        });
      };
    

    var buildHTML = function(message) {
      if (message.content && message.image) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="main-chat__message-list__comment-box">` +
            `<div class="main-chat__message-list__comment-box__name">` +
              message.user_name +
            `</div>` +
            `<div class="main-chat__message-list__comment-box__name__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main-chat__message-list__comment-box__message">` +
            `<p class="main-chat__message-list__comment-box__message__content">` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `" class="main-chat__message-list__comment-box__message__image" >` +
          `</div>` +
        `</div>`
      } else if (message.content) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="main-chat__message-list__comment-box">` +
            `<div class="main-chat__message-list__comment-box__name">` +
              message.user_name +
            `</div>` +
            `<div class="main-chat__message-list__comment-box__name__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main-chat__message-list__comment-box__message">` +
            `<p class="main-chat__message-list__comment-box__message__content">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="main-chat__message-list__comment-box">` +
            `<div class="main-chat__message-list__comment-box__name">` +
              message.user_name +
            `</div>` +
            `<div class="main-chat__message-list__comment-box__name__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main-chat__message-list__comment-box__message">` +
            `<img src="` + message.image + `" class="main-chat__message-list__comment-box__message__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
    };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


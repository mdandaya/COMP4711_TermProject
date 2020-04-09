document.addEventListener("DOMContentLoaded", () => {    
    var convCards = document.querySelectorAll('.convCard');
    for (let index = 0; index < convCards.length; index++) {
        convCards[index].addEventListener('click', fetchMsgs);
    }
    
    var sendBtn = document.getElementById('send');
    sendBtn.addEventListener('click', msgReply);

    document.querySelector(".convCard").click();
});

function fetchMsgs(event) {

    document.getElementById('conversationid').value = event.srcElement.id;

    fetch("msgList", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                convid: event.srcElement.id
            }
        )
    }).then(response => response.text())
    .then( function (textResponse) {    
        document.getElementById('msgList-container').innerHTML = textResponse;    
    })
}

function msgReply() {

    var convid = document.getElementById('conversationid').value;
    var content = document.getElementById('content').value;

    fetch("msgReply", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                convid: convid,
                content: content
            }
        )
    }).then(response => response.text())
    .then( function (textResponse) {    
        document.getElementById('msgList-container').innerHTML = textResponse; 
    })
}

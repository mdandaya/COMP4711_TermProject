document.addEventListener("DOMContentLoaded", () => {    
    var convCards = document.querySelectorAll('.convCard');
    for (let index = 0; index < convCards.length; index++) {
        convCards[index].addEventListener('click', fetchMsgs);
    }
    document.querySelector(".convCard").click();
});

function fetchMsgs(event) {

    console.log(event.srcElement.id);
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


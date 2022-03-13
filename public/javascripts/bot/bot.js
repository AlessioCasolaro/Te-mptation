var boolean = false;
function postYourAdd() {
    chat = document.getElementById("chat")
    if (chat.getAttribute("style", "display:none"))
        chat.removeAttribute("style", "display:none");
    else
        chat.setAttribute("style", "display:none");
    if (!boolean) {
        boolean = true;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://webchat.botframework.com/api/tokens", true);
        xhr.setRequestHeader('Authorization', 'BotConnector ' + 'dWkFdFPHsOs.YPbRb4hyRaQm7t1PYQG66xN-DZxwAj6g5jQ1-JPeLeo');
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("chat").src = "https://webchat.botframework.com/embed/ConnorB?t=" + response
            }
        }
    }
}
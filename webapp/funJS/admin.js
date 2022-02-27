function deleteElem(event){
    var inviare = event.target.getAttribute("value");
    var xmlHttpReq = new XMLHttpRequest();

    xmlHttpReq.onreadystatechange = function () {
        if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200) {
            if(xmlHttpReq.response===inviare){
                document.getElementById(xmlHttpReq.response).remove();
            }
        }
    }
    xmlHttpReq.open("GET", "ServletDeleteAj?codPrenotazione="+encodeURIComponent(inviare), true);
    xmlHttpReq.send();
}
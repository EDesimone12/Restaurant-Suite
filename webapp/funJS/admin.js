function deleteElem(event){
    var inviare = event.target.getAttribute("value");

    var xmlHttpReq = new XMLHttpRequest();
    if (this.readyState == 4 && this.status == 200) {
        //inviare.parentElement.removeChild(inviare);

    }

    xmlHttpReq.open("POST", "ServletDeleteAj?codPrenotazione="+encodeURIComponent(inviare) , true);
    xmlHttpReq.send();
}
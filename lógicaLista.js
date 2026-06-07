const xhttp = new XMLHttpRequest
xhttp.onload = () => {
    const xmlDoc = xhttp.responseXML;
    console.log(xmlDoc)
    
    const x = xmlDoc.getElementsByTagName("baya");
    let table="<tr><th>Imagen</th><th>Nombre</th><th>Picante</th><th>Seco</th><th>Dulce</th><th>Amargo</th><th>Ácido</th><th>Tersura</th><th>Color</th><th>Efecto en Batalla</th><th>Generación en la que fue añadida</th></tr>";
    for (let i = 0; i < x.length; i++) {
        table += "<tr><td>" +
        "<img src='" + x[i].getElementsByTagName("imagen")[0].textContent + "' alt='" + x[i].getElementsByTagName("nombre")[0].textContent + "'/></td><td>" +
        x[i].getElementsByTagName("nombre")[0].textContent + "</td><td>";
        if(x[i].getElementsByTagName("picante").length > 0){
            table += x[i].getElementsByTagName("picante")[0].textContent + "</td><td>";
        } else {
            table += "<span title = 'En tercera Generación'>" + x[i].getElementsByTagName("picante3ra")[0].textContent + "</span> / <span title = 'En cuarta Generación'>" + x[i].getElementsByTagName("picante4ta")[0].textContent + "</span></td><td>";
        }
        if(x[i].getElementsByTagName("seco").length > 0){
            table += x[i].getElementsByTagName("seco")[0].textContent + "</td><td>";
        } else {
            table += "<span title = 'En tercera Generación'>" + x[i].getElementsByTagName("seco3ra")[0].textContent + "</span> / <span title = 'En cuarta Generación'>" + x[i].getElementsByTagName("seco4ta")[0].textContent + "</td><td>";
        }
        if(x[i].getElementsByTagName("dulce").length > 0){
            table += x[i].getElementsByTagName("dulce")[0].textContent + "</td><td>";
        } else {
            table += "<span title = 'En tercera Generación'>" + x[i].getElementsByTagName("dulce3ra")[0].textContent + "</span> / <span title = 'En cuarta Generación'>" + x[i].getElementsByTagName("dulce4ta")[0].textContent + "</td><td>";
        }
        if(x[i].getElementsByTagName("amargo").length > 0){
            table += x[i].getElementsByTagName("amargo")[0].textContent + "</td><td>";
        } else {
            table += "<span title = 'En tercera Generación'>" + x[i].getElementsByTagName("amargo3ra")[0].textContent + "</span> / <span title = 'En cuarta Generación'>" + x[i].getElementsByTagName("amargo4ta")[0].textContent + "</td><td>";
        }
        if(x[i].getElementsByTagName("ácido").length > 0){
            table += x[i].getElementsByTagName("ácido")[0].textContent + "</td><td>";
        } else {
            table += "<span title = 'En tercera Generación'>" + x[i].getElementsByTagName("ácido3ra")[0].textContent + "</span> / <span title = 'En cuarta Generación'>" + x[i].getElementsByTagName("ácido4ta")[0].textContent + "</td><td>";
        }
        if(x[i].getElementsByTagName("tersura").length > 0){
            table += x[i].getElementsByTagName("tersura")[0].textContent + "</td><td>";
        } else {
            table += "<span title = 'En tercera Generación'>" + x[i].getElementsByTagName("tersura3ra")[0].textContent + "</span> / <span title = 'En cuarta Generación'>" + x[i].getElementsByTagName("tersura4ta")[0].textContent + "</td><td>";
        }
        table += x[i].getElementsByTagName("color6ta")[0].textContent + "</td><td>" +
        x[i].getElementsByTagName("efectoBatalla")[0].textContent + "</td><td>" +
        x[i].getElementsByTagName("genAñadida")[0].textContent + "</td></tr>";
    }
    document.getElementById("bayaDex").innerHTML = table;
}
xhttp.open("GET", "./bayaDatos.xml")
xhttp.send()
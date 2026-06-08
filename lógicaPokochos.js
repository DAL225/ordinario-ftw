const checkboxes = document.querySelectorAll("input[type='checkbox']");
let seleccionados = [];

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (evento)=>{
        if (evento.target.checked){
            seleccionados.push(evento.target.id)
            console.log(evento.target.id)
            if (seleccionados.length > 4){
                evento.target.checked = false;
                alert("Solo puedes seleccionar 4 bayas");
            }
            if (seleccionados.length > 4){
                seleccionados.pop();
            }
        } else {
            let ultima = seleccionados.indexOf(evento.target.id)
            seleccionados.splice(ultima,1)
        }
        cargarCheckboxes(seleccionados)
    });
});

const xhttp = new XMLHttpRequest
function cargarCheckboxes(ids) {
    console.log(ids)
    const xmlDoc = xhttp.responseXML;

    const x = xmlDoc.getElementsByTagName("baya");
    
    let table="<tr><th>Imagen</th><th>Nombre</th><th>Picante</th><th>Seco</th><th>Dulce</th><th>Amargo</th><th>Ácido</th><th>Tersura</th></tr>";
    for (let i = 0; i < x.length; i++) {
        for (let y = 0; y < ids.length; y++){
            if (x[i].getElementsByTagName("id")[0].textContent == ids[y]){
                table += "<tr><td>" +
                "<img src='" + x[i].getElementsByTagName("imagen")[0].textContent + "' alt='" + x[i].getElementsByTagName("nombre")[0].textContent + "'/></td><td>" +
                x[i].getElementsByTagName("nombre")[0].textContent + "</td><td>";
                if(x[i].getElementsByTagName("picante").length > 0){
                    table += x[i].getElementsByTagName("picante")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("picante4ta")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("seco").length > 0){
                    table += x[i].getElementsByTagName("seco")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("seco4ta")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("dulce").length > 0){
                    table += x[i].getElementsByTagName("dulce")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("dulcet4ta")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("amargo").length > 0){
                    table += x[i].getElementsByTagName("amargo")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("amargo4ta")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("ácido").length > 0){
                    table += x[i].getElementsByTagName("ácido")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("ácido4ta")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("tersura").length > 0){
                    table += x[i].getElementsByTagName("tersura")[0].textContent + "</td></tr>";
                } else {
                    table += x[i].getElementsByTagName("tersura4t|a")[0].textContent + "</td></tr>";
                }
            }
        }
    }
    document.getElementById("pokochoEntrada").innerHTML = table;
}
xhttp.open("GET", "./bayaDatos.xml")
xhttp.send()

function calcularPokocho(){

}
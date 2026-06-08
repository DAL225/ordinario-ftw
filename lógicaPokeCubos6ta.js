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
    
    let table="<tr><th>Imagen</th><th>Nombre</th><th>Picante</th><th>Seco</th><th>Dulce</th><th>Amargo</th><th>Ácido</th><th>Color</th></tr>";
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
                    table += x[i].getElementsByTagName("dulce4ta")[0].textContent + "</td><td>";
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
                table += x[i].getElementsByTagName("color6ta")[0].textContent + "</td></tr>"
            }
        }
    }
    document.getElementById("pokecubosEntrada").innerHTML = table;
}
xhttp.open("GET", "./bayaDatos.xml")
xhttp.send()

const entrada = document.getElementById("pokecubosEntrada");
const salida = document.getElementById("pokecuboSalida");

function calcularCubo(){
    let rojo = 0;
    let azul = 0;
    let rosa = 0;
    let verde = 0;
    let amarillo = 0;
    let tipo = "";
    let plusGarantizado = false;
    let cantidad = 0;
    let table = "<tr><th>Tipo</th><th>Cantidad</th></tr>";
    if (entrada.rows.length >= 3){
        for (let i = 1; i < entrada.rows.length; i++){
            const fila = entrada.rows[i];
            if (fila.cells[7].textContent == "Rojo"){
                rojo++;
            }
            if (fila.cells[7].textContent == "Azul"){
                azul++;
            }
            if (fila.cells[7].textContent == "Rosa"){
                rosa++;
            }
            if (fila.cells[7].textContent == "Verde"){
                verde++;
            }
            if (fila.cells[7].textContent == "Amarillo"){
                amarillo++;
            }
            if (fila.cells[7].textContent == "Verde+"){
                plusGarantizado = true;
                verde++;
            }
            if (fila.cells[7].textContent == "Rosa+"){
                plusGarantizado = true;
                rosa++;
            }
            console.log(plusGarantizado)
        }
        if (Number(rojo) > Number(azul) && Number(rojo) > Number(rosa) && Number(rojo) > Number(verde) && Number(rojo) > Number(amarillo)){
            if (plusGarantizado){
                tipo = "Rojo+";
            } else {
                tipo = "Rojo ó Rojo+";
            }
        }
        if (Number(azul) > Number(rojo) && Number(azul) > Number(rosa) && Number(azul) > Number(verde) && Number(azul) > Number(amarillo)){
            if (plusGarantizado){
                tipo = "Azul+";
            } else {
                tipo = "Azul ó Azul+";
            }
        }
        if (Number(rosa) > Number(rojo) && Number(rosa) > Number(azul) && Number(rosa) > Number(verde) && Number(rosa) > Number(amarillo)){
            if (plusGarantizado){
                tipo = "Rosa+";
            } else {
                tipo = "Rosa ó Rosa+";
            }
        }
        if (Number(verde) > Number(rojo) && Number(verde) > Number(azul) && Number(verde) > Number(rosa) && Number(verde) > Number(amarillo)){
            if (plusGarantizado){
                tipo = "Verde+";
            } else {
                tipo = "Verde ó Verde+";
            }
        }
        if (Number(amarillo) > Number(rojo) && Number(amarillo) > Number(azul) && Number(amarillo) > Number(rosa) && Number(amarillo) > Number(verde)){
            if (plusGarantizado){
                tipo = "Amarillo+";
            } else {
                tipo = "Amarillo ó Amarillo+";
            }
        }
        if (Number(rojo) + Number(azul) + Number(rosa) + Number(verde) + Number(amarillo) == 4){
            if (plusGarantizado){
                tipo = "Arcoíris+";
            } else {
                tipo = "Arcoíris ó Arcoíris+"
            }
        }
        cantidad = entrada.rows.length - 1;

        table = "<tr><th>Tipo</th><th>Cantidad</th></tr>" + "<tr><td>" + tipo + "</td><td>" + cantidad + "</td></tr>";
        salida.innerHTML = table;
    } else {
        alert("Selecciona un mínimo de 2 bayas");
    }
    rojo = 0;
    azul = 0;
    rosa = 0;
    verde = 0;
    amarillo = 0;
    tipo = "";
    plusGarantizado = false;
    cantidad = 0;
}
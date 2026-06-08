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
                if(x[i].getElementsByTagName("tersura").length > 0){
                    table += x[i].getElementsByTagName("tersura")[0].textContent + "</td></tr>";
                } else {
                    table += x[i].getElementsByTagName("tersura4ta")[0].textContent + "</td></tr>";
                }
            }
        }
    }
    document.getElementById("pokochoEntrada").innerHTML = table;
}
xhttp.open("GET", "./bayaDatos.xml")
xhttp.send()

const entrada = document.getElementById("pokochoEntrada");
const salida = document.getElementById("pokochoSalida");

function calcularPokocho() {
    let picante = 0;
    let seco = 0;
    let dulce = 0;
    let amargo = 0;
    let ácido = 0;
    let tersura = 0;
    let tipo = "";
    let masa = 0;
    let tiempo = document.getElementById("tiempo").value;
    let fails = document.getElementById("fails").value;
    let table = "<tr><th>Tipo</th><th>Masa</th><th>Picante</th><th>Seco</th><th>Dulce</th><th>Amargo</th><th>Ácido</th></tr>";

    for (let i = 1; i < entrada.rows.length; i++){
        const fila = entrada.rows[i];
        picante = Number(picante) + Number(fila.cells[2].textContent);
        seco = Number(seco) + Number(fila.cells[3].textContent);
        dulce = Number(dulce) + Number(fila.cells[4].textContent);
        amargo = Number(amargo) + Number(fila.cells[5].textContent);
        ácido = Number(ácido) + Number(fila.cells[6].textContent);

        let aux = seco;
        seco = Number(seco) - Number(dulce);
        dulce = Number(dulce) - Number(amargo);
        amargo = Number(amargo) - Number(ácido);
        ácido = Number(ácido) - Number(picante);
        picante = Number(picante) - Number(aux);

        let auxNegativos = 0;
        if (picante < 0){
            auxNegativos++;
        }
        if (seco < 0){
            auxNegativos++;
        }
        if (dulce < 0){
            auxNegativos++;
        }
        if (amargo < 0){
            auxNegativos++;
        }
        if (ácido < 0){
            auxNegativos++;
        }
        picante = Number(picante) - Number(auxNegativos);
        seco = Number(seco) - Number(auxNegativos);
        dulce = Number(dulce) - Number(auxNegativos);
        amargo = Number(amargo) - Number(auxNegativos);
        ácido = Number(ácido) - Number(auxNegativos);

        picante = Number(picante) * (60 / Number(tiempo));
        seco = Number(seco) * (60 / Number(tiempo));
        dulce = Number(dulce) * (60 / Number(tiempo));
        amargo = Number(amargo) * (60 / Number(tiempo));
        ácido = Number(ácido) * (60 / Number(tiempo));

        picante = Number(picante) - Number(fails);
        seco = Number(seco) - Number(fails);
        dulce = Number(dulce) - Number(fails);
        amargo = Number(amargo) - Number(fails);
        ácido = Number(ácido) - Number(fails);

        picante = Math.round(Number(picante));
        seco = Math.round(Number(seco));
        dulce = Math.round(Number(dulce));
        amargo = Math.round(Number(amargo));
        ácido = Math.round(Number(ácido));

        if (picante < 0){
            picante = 0;
        }
        if (seco < 0){
            seco = 0;
        }
        if (dulce < 0){
            dulce = 0;
        }
        if (amargo < 0){
            amargo = 0;
        }
        if (ácido < 0){
            ácido = 0;
        }

        tersura = Number(tersura) + Number(fila.cells[7].textContent);
        masa = Math.floor(tersura / (entrada.rows.length - 1)) - (entrada.rows.length - 1);

        tipo = setTipo(picante, seco, dulce, amargo, ácido);

        table = "<tr><th>Tipo</th><th>Masa</th><th>Picante</th><th>Seco</th><th>Dulce</th><th>Amargo</th><th>Ácido</th></tr>" + "<tr><td>" + tipo + "</td><td>" + masa + "</td><td>" + picante + "</td><td>" + seco + "</td><td>" + dulce + "</td><td>" + amargo + "</td><td>" + ácido + "</td></tr>";

    }
    salida.innerHTML = table;
    picante = 0;
    seco = 0;
    dulce = 0;
    amargo = 0;
    ácido = 0;
    tersura = 0;
    tipo = "";
    masa = 0;
}

function setTipo(picante, seco, dulce, amargo, ácido){
    if (Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0){
        tipo = "Picante";
        return tipo;
    }
        if (Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0){
        tipo = "Seco";
        return tipo;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0){
        tipo = "Dulce";
        return tipo;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0){
        tipo = "Amargo";
        return tipo;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0){
        tipo = "Ácido";
        return tipo;
    }
    if (Number(picante) > 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 0){
        if (Number(picante) > Number(seco) && Number(seco) > Number(dulce) && Number(seco) > Number(amargo) && Number(seco) > Number(ácido)){
            tipo = "Picanseco";
            return tipo;
        }
        if (Number(picante) > Number(dulce) && Number(dulce) > Number(seco) && Number(dulce) > Number(amargo) && Number(dulce) > Number(ácido)){
            tipo = "Picandulce";
            return tipo;
        }
        if (Number(picante) > Number(amargo) && Number(amargo) > Number(seco) && Number(amargo) > Number(dulce) && Number(amargo) > Number(ácido)){
            tipo = "Picanamargo";
            return tipo;
        }
        if (Number(picante) > Number(ácido) && Number(ácido) > Number(seco) && Number(ácido) > Number(dulce) && Number(ácido) > Number(amargo)){
            tipo = "Picanácido";
            return tipo;
        }
        if (Number(seco) > Number(picante) && Number(picante) > Number(dulce) && Number(picante) > Number(amargo) && Number(picante) > Number(ácido)){
            tipo = "Secopicante";
            return tipo;
        }
        if (Number(seco) > Number(dulce) && Number(dulce) > Number(picante) && Number(dulce) > Number(amargo) && Number(dulce) > Number(ácido)){
            tipo = "Secodulce";
            return tipo;
        }
        if (Number(seco) > Number(amargo) && Number(amargo) > Number(picante) && Number(amargo) > Number(dulce) && Number(amargo) > Number(ácido)){
            tipo = "Secoamargo";
            return tipo;
        }
        if (Number(seco) > Number(ácido) && Number(ácido) > Number(picante) && Number(ácido) > Number(dulce) && Number(ácido) > Number(amargo)){
            tipo = "Secoácido";
            return tipo;
        }
        if (Number(dulce) > Number(picante) && Number(picante) > Number(seco) && Number(picante) > Number(amargo) && Number(picante) > Number(ácido)){
            tipo = "Dulcepicante";
            return tipo;
        }
        if (Number(dulce) > Number(seco) && Number(seco) > Number(picante) && Number(seco) > Number(amargo) && Number(seco) > Number(ácido)){
            tipo = "Dulceseco";
            return tipo;
        }
        if (Number(dulce) > Number(amargo) && Number(amargo) > Number(picante) && Number(amargo) > Number(seco) && Number(amargo) > Number(ácido)){
            tipo = "Dulceamargo";
            return tipo;
        }
        if (Number(dulce) > Number(ácido) && Number(ácido) > Number(picante) && Number(ácido) > Number(seco) && Number(ácido) > Number(amargo)){
            tipo = "Dulceácido";
            return tipo;
        }
        if (Number(amargo) > Number(picante) && Number(picante) > Number(seco) && Number(picante) > Number(dulce) && Number(picante) > Number(ácido)){
            tipo = "Amarpicante";
            return tipo;
        }
        if (Number(amargo) > Number(seco) && Number(seco) > Number(picante) && Number(seco) > Number(dulce) && Number(seco) > Number(ácido)){
            tipo = "Amarseco";
            return tipo;
        }
        if (Number(amargo) > Number(dulce) && Number(dulce) > Number(picante) && Number(dulce) > Number(seco) && Number(dulce) > Number(ácido)){
            tipo = "Amardulce";
            return tipo;
        }
        if (Number(amargo) > Number(ácido) && Number(ácido) > Number(picante) && Number(ácido) > Number(seco) && Number(ácido) > Number(dulce)){
            tipo = "Amarácido";
            return tipo;
        }
        if (Number(ácido) > Number(picante) && Number(picante) > Number(seco) && Number(picante) > Number(dulce) && Number(picante) > Number(amargo)){
            tipo = "Acidopicante";
            return tipo;
        }
        if (Number(ácido) > Number(seco) && Number(seco) > Number(picante) && Number(seco) > Number(dulce) && Number(seco) > Number(amargo)){
            tipo = "Acidoseco";
            return tipo;
        }
        if (Number(ácido) > Number(dulce) && Number(dulce) > Number(picante) && Number(dulce) > Number(seco) && Number(dulce) > Number(amargo)){
            tipo = "Acidodulce";
            return tipo;
        }
        if (Number(ácido) > Number(amargo) && Number(amargo) > Number(picante) && Number(amargo) > Number(seco) && Number(amargo) > Number(dulce)){
            tipo = "Acidoamargo";
            return tipo;
        }
    }
    if (Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0){
        tipo = "Pastoso";
        return tipo;
    }
    if (Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0 ){
        tipo = "Sustancioso";
        return tipo;
    }
    if (Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0){
        tipo = "Suave";
        return tipo;
    }
}
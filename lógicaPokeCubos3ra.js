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
function cargarCheckboxes (ids) {
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
                    table += x[i].getElementsByTagName("picante3ra")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("seco").length > 0){
                    table += x[i].getElementsByTagName("seco")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("seco3ra")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("dulce").length > 0){
                    table += x[i].getElementsByTagName("dulce")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("dulce3ra")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("amargo").length > 0){
                    table += x[i].getElementsByTagName("amargo")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("amargo3ra")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("ácido").length > 0){
                    table += x[i].getElementsByTagName("ácido")[0].textContent + "</td><td>";
                } else {
                    table += x[i].getElementsByTagName("ácido3ra")[0].textContent + "</td><td>";
                }
                if(x[i].getElementsByTagName("tersura").length > 0){
                    table += x[i].getElementsByTagName("tersura")[0].textContent + "</td></tr>";
                } else {
                    table += x[i].getElementsByTagName("tersura3ra")[0].textContent + "</td></tr>";
                }
            }
        }
    }
    document.getElementById("pokecubosEntrada").innerHTML = table;
}
xhttp.open("GET", "./bayaDatos.xml")
xhttp.send()

const entrada = document.getElementById("pokecubosEntrada");
const salida = document.getElementById("pokecuboSalida");

function calcularCubo() {
    let picante = 0;
    let seco = 0;
    let dulce = 0;
    let amargo = 0;
    let ácido = 0;
    let tersura = 0;
    let color = "";
    let masa = 0;
    let rpm = document.getElementById("rpm").value;
    let multiplo = Math.pow(10, 2);
    let table = "<tr><th>Color</th><th>Masa</th><th>Picante</th><th>Seco</th><th>Dulce</th><th>Amargo</th><th>Ácido</th></tr>";

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
        picante = Number(picante) * ((Math.trunc(((Number(rpm) / 333)+1) * Number(multiplo)))/ Number(multiplo));
        seco = Number(seco) * ((Math.trunc(((Number(rpm) / 333)+1) * Number(multiplo)))/ Number(multiplo));
        dulce = Number(dulce) * ((Math.trunc(((Number(rpm) / 333)+1) * Number(multiplo)))/ Number(multiplo));
        amargo = Number(amargo) * ((Math.trunc(((Number(rpm) / 333)+1) * Number(multiplo)))/ Number(multiplo));
        ácido = Number(ácido) * ((Math.trunc(((Number(rpm) / 333)+1) * Number(multiplo)))/ Number(multiplo));

        tersura = Number(tersura) + Number(fila.cells[7].textContent);
        masa = Math.floor(tersura / (entrada.rows.length - 1)) - (entrada.rows.length - 1);
        picante = Math.round(Number(picante));
        seco = Math.round(Number(seco));
        dulce = Math.round(Number(dulce));
        amargo = Math.round(Number(amargo));
        ácido = Math.round(Number(ácido));
        color = setColor(picante, seco, dulce, amargo, ácido);

        table = "<tr><th>Color</th><th>Masa</th><th>Picante</th><th>Seco</th><th>Dulce</th><th>Amargo</th><th>Ácido</th></tr>" + "<tr><td>" + color + "</td><td>" + masa + "</td><td>" + picante + "</td><td>" + seco + "</td><td>" + dulce + "</td><td>" + amargo + "</td><td>" + ácido + "</td></tr>";

    }
    salida.innerHTML = table;
    picante = 0;
    seco = 0;
    dulce = 0;
    amargo = 0;
    ácido = 0;
    tersura = 0;
    color = "";
    masa = 0;
}

function setColor(picante, seco, dulce, amargo, ácido){
    if (Number(picante) <= 50 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0){
        color = "Rojo";
        return color;
    }
    if (Number(picante) > 50 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) == 0 && Number(seco) <= 50 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0){
        color = "Azul";
        return color;
    }
    if (Number(picante) == 0 && Number(seco) > 50 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) <= 50 && Number(amargo) == 0 && Number(ácido) == 0){
        color = "Rosa";
        return color;
    }
    if (Number(picante) == 50 && Number(seco) == 0 && Number(dulce) > 50 && Number(amargo) == 0 && Number(ácido) == 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) <= 50 && Number(ácido) == 0){
        color = "Verde";
        return color;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 50 && Number(ácido) == 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) <= 50){
        color = "Amarillo";
        return color;
    }
    if (Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 50){
        color = "Dorado";
        return color;
    }
    if (Number(picante) <= 50 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) <= 50 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) <= 50 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) <= 50 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0){
        color = "Púrpura";
        return color;
    }
    if (Number(picante) > 50 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) > 50 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) > 50 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 50 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) <= 50 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) <= 50 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) <= 50 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) <= 50 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0){
        color = "Índigo";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) > 50 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 50 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 50 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 50 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) == 0 && Number(dulce) <= 50 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) <= 50 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) <= 50 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) <= 50 && Number(amargo) == 0 && Number(ácido) > 0){
        color = "Café";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 50 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 50 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 50 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 50 && Number(amargo) == 0 && Number(ácido) > 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) <= 50 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) <= 50 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) <= 50 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) <= 50 && Number(ácido) > 0){
        color = "Azul Claro";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 50 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 50 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 50 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 50 && Number(ácido) > 0){
        color = "Dorado";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) <= 50 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) <= 50 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) <= 50 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) <= 50){
        color = "Oliva";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 50 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 50 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 50 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 50){
        color = "Dorado";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0){
        color = "Gris";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) == 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) == 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) > 0 && Number(dulce) == 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) > 0 && Number(seco) == 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0 || Number(picante) == 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0){
        color = "Blanco";
        return color;
    }
    if (Number(picante) > 0 && Number(seco) > 0 && Number(dulce) > 0 && Number(amargo) > 0 && Number(ácido) > 0){
        color = "Blanco";
        return color;
    }
}
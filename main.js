let nombre = prompt("Bienvenido a la web de Replat Escapes, por favor ingresar su nombre debajo.");
if (nombre === ""){
    alert ("No ingresaste tu nombre");
}else {
    alert (`Hola ${nombre}, a continuacion vas a poder elegir el accesorio para tu auto`);
}

function recomprar() {
    pregunta = prompt ("Desea realizar otra compra? SI/NO");
}

let total = 0

let pregunta = "si";
while (pregunta === "si") {
let producto = prompt("Qué accesorio desea comprar?\n-Amortiguador\n-Enganche\n-Multiple").toLowerCase();
if(producto === ""){
    alert ("No ingresaste ningún producto");
}else if(producto === "amortiguador"){
    alert ("Precio de cada Amortiguador: $100");
    recomprar();
    total = total + 100;

}else if(producto === "enganche"){
    alert ("Precio de cada Enganche: $80");
    recomprar();
    total = total + 80;
    

}else if(producto === "multiple"){
    alert("Precio de cada Multiple = $120");
    recomprar();
    total = total + 120;
    

}else {
    alert ("El accesorio no esta disponible o escribiste el nombre incorrectamente")
}
}

alert (`El precio total de su compra es de ${total}`)

alert ("Muchas gracias por su compra, lo esperamos de vuelta")








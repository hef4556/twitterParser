$(document).ready(cortar);

function cortar(){
	/*
	var unaletra="ñÑ";
	for(i = 0 ; i<unaletra.length;i++){
		console.log(unaletra.charCodeAt(i));
	}
	*/
var texto=document.getElementById("textoACortar").innerHTML;//en esta linea se le alimenta la cadena de caracteres... puede cambiar a gusto
var texto=texto+" ";//se le agrega un espacio al final para indicar fin de la cadena
var letras=[''];
letras=texto.split('');
////////////////////////////////////////////////////////////////////////
//crear las palabras y los simbolos, las devuelve en una estructura JSON
var Datos=palabras(letras);
//console.log(JSON.stringify(Datos));
///////////////////////////////////////////////////////////////////////
//codigo que crea los bottones al tener las palabras separadas
	var contando=0
	$.each(Datos.palabras, function(d, hits) {
 		if (hits.tipo=="palabra") {
 			//d3.select(".txt")
 			var labels=d3
				.select(".row")
				.append("div").attr("id","ck-button")
				.append("label");
				labels.append("input").attr("type","checkbox").attr("value",hits.texto).attr("name","ckboxes")
				labels.append("span").text(hits.texto);
			  contando++;
		}else
		if(hits.tipo=="puntuacion"){
			d3.select("body").select(".row")
			.append("div").attr("id","ck-button")
			.append("label")
			.append("span")
			.text(hits.texto);
		}else
		if(hits.tipo=="link"){
			d3.select("body").select(".row")
			.append("div").attr("id","ck-button")
			.append("label")
			.append("a").attr("href",hits.texto).attr("target","_blank")
			.append("span")
			.text(hits.texto);
		}
	});
}

///////////////////////////////////////////////////////////////////////
//funcion que regresa palabras end un arreglo
function palabras(letras){
	//var palabras='{"palabras":[{"texto":"hola","tipo":"palabra"},{"texto":",","tipo":"signo"}]}';
	var arrpalabras=genPalabras(letras);
	//console.log((arrpalabras));
	return JSON.parse(arrpalabras);
}

///////////////////////////////////////////////////////////////////////
//funcion que hace las palabras y las clasifica, regresa la cadena intermedia del JSON
function genPalabras(letras){
	var palabraFlag=0;
	var linkFlag=0;
	var cadena='{"palabras":[';
	var palabra="";
	for (i = 0; i < letras.length; i++) {//un ciclo que va por todas las letras del texto
		//console.log(letras[i]+ " es " + whatIs(letras[i]));
		if (palabra=="https" || linkFlag==1 || palabra=="http" || palabra=="www") {//si la cadena asimila ser un link
			linkFlag=1;
			if(letras[i]!=" "){
				palabra=palabra+letras[i];
			}else{
				if(i==letras.length-1){
					cadena=cadena+'{"texto":"'+palabra+'","tipo":"link"}]}';
				}else{
					cadena=cadena+'{"texto":"'+palabra+'","tipo":"link"},';
					cadena=cadena+'{"texto":"'+letras[i]+'","tipo":"puntuacion"},';
				}
				linkFlag=0;
				palabra="";
			}
		}else
		//indica el fin del arreglo
		if(i==letras.length-1){//nos indica el final del texto
			if(palabraFlag==1 && whatIs(letras[i])!=1){//si estaba en proceso de crear una palabra y el ultimo caracter no es una letra
				cadena=cadena+'{"texto":"'+palabra+'","tipo":"palabra"},';//agrega la palabra en tipo json
				palabra="";//vacia la cadena para iniciar contener nuevas palabras
				palabraFlag=0;
				cadena=cadena+'{"texto":"'+letras[i]+'","tipo":"puntuacion"}]}';//agrega el caracter como signo de puntuacion en el json
			}
			else
				if(whatIs(letras[i])==1){//si el ultimo caracter es una letra y no se hacia una palabra
				palabra=palabra+letras[i];//se agrega la letra a la palabra
				cadena=cadena+'{"texto":"'+palabra+'","tipo":"palabra"}]}';//agrega el espacio como signo de puntuacion en el json
			}else {// si no se estaba haciendo ninguna palabra  y no es letra
				cadena=cadena+'{"texto":"'+letras[i]+'","tipo":"puntuacion"}]}';//agrega el espacio como signo de puntuacion en el json
			}
		}else
		if(whatIs(letras[i])==1){//si es un caracter valido para una palabra
			palabraFlag=1;//flag indicando si se empieza a formar una palabra
			palabra=palabra+letras[i];//se forma la palabra formando los caracteres de esta
		}else
		if(whatIs(letras[i])==0){//si es un espacio o salto de linea
			if(palabraFlag==1){//si estaba en proceso de crear una palabra
				cadena=cadena+'{"texto":"'+palabra+'","tipo":"palabra"},';//agrega la palabra en tipo json
				palabra="";//vacia la cadena para iniciar contener nuevas palabras
				palabraFlag=0;
			}
			cadena=cadena+'{"texto":"'+letras[i]+'","tipo":"puntuacion"},';//agrega el espacio como signo de puntuacion en el json
			///////////////////////////////////////////////////////
		}else{//si es cualquier signo de puntuacion desconocido
			if(palabraFlag==1){//si estaba en proceso de crear una palabra
				cadena=cadena+'{"texto":"'+palabra+'","tipo":"palabra"},';//agrega la palabra en tipo json
				palabra="";//vacia la cadena para iniciar contener nuevas palabras
				palabraFlag=0;
			}
			cadena=cadena+'{"texto":"'+letras[i]+'","tipo":"puntuacion"},';//agrega el espacio como signo de puntuacion en el json

		}
	};
	return cadena;
}

/////////////////////////////////////////////////////////////////////////////
//funcion para identificar el tipo de simbolos
function whatIs(simbolo){
	var numero=0;
	numero=simbolo.charCodeAt(0)
	if(numero == 32		//espacio
	 || numero==03		//salto de linea
	 ){
		return 0;
	}else
	if( (numero>=65 && numero<=90)			//letras minusculas
		|| (numero>=65  && numero<=122)		//letras mayusculas
		|| (numero==241 || numero==209)		//ñ y Ñ
		|| (numero==35)						//gato
		|| (numero==64)						//arroba
		|| (numero==110)					//n
		|| (numero==225)					//a acentuada
		|| (numero==233)					//e acentuada
		|| (numero==237)					//i acentuada
		|| (numero==243)					//o acentuada
		|| (numero==255)					//u acentuada
		|| (numero==193)					//A acentuada
		|| (numero==201)					//E acentuada
		|| (numero==205)					//I acentuada
		|| (numero==211)					//O acentuada
		|| (numero==218)					//U acentuada
		//simbolos especiales como caracter correcto
		|| (numero==45)						//-
		|| (numero==95)						//_
		//numeros
		|| (numero>=48  && numero<=57)		//1234567890
		){
		return 1;
	}
}

function enviado(){
	//alert("enviado");
}

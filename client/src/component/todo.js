// import React from 'react'
// // Add and remove elements

// function todo() {

//   function sendAway() {
//     let skickaSyssla = document.getElementById('skickaSyssla');
//       let registreradSyssla = document.getElementById("enSyssla").value; // värdet av HTML input ligger i registreradSyssla

//       let syssla = document.createElement('li');
//       syssla.className = 'syssla';
//       document.getElementById('toDos').appendChild(syssla);

//       let sysslan = document.createElement('text');
//       sysslan.setAttribute('id', 'sysslan1');
//       sysslan.innerHTML =
//           '<input id="sparadSyssla" value="' + registreradSyssla + '"type="text" name="syssla" disabled>';

//       let redigeraSyssla = document.createElement('text');
//       redigeraSyssla.setAttribute('class', 'redigera-syssla');
//       redigeraSyssla.innerHTML =
//           '<button id="edit" type="send">Redigera</button>';

//       redigeraSyssla.addEventListener('click', function () {
//           var nySyssla = this.previousSibling.firstChild;
//           nySyssla.removeAttribute("disabled", "");

//           redigeraSyssla.addEventListener('click', function () {
//               var nySyssla2 = this.previousSibling.firstChild;
//               nySyssla2.setAttribute("disabled", "");
//           })
//       })
//       let klarMedSyssla = document.createElement('text');
//       klarMedSyssla.setAttribute('class', 'avklarad-syssla');
//       klarMedSyssla.innerHTML =
//           '<button id="done" type="send">Klar</button>';
//       klarMedSyssla.addEventListener('click', function () {
//           färdigSyssla.appendChild(sysslan);
//           färdigSyssla.appendChild(redigeraSyssla);
//           färdigSyssla.appendChild(raderaSyssla);
//           this.remove();
//       })

//       // radera syssla klar 
//       let raderaSyssla = document.createElement('text');
//       raderaSyssla.setAttribute('class', 'radera-syssla');
//       raderaSyssla.innerHTML =
//           '<button id="delete" type="send">Radera</button>';
//       raderaSyssla.addEventListener('click', function () {
//           this.parentNode.remove();
//       })


//       let färdigSyssla = document.createElement('li');
//       färdigSyssla.className = 'färdig-syssla';
//       document.getElementById('hasDone').appendChild(färdigSyssla);

//       syssla.appendChild(sysslan);
//       syssla.appendChild(redigeraSyssla);
//       syssla.appendChild(klarMedSyssla);
//       syssla.appendChild(raderaSyssla);
//   }

//   return (
//     <div>
//       <form>
//         <h1>Registrera ditt uppdrag:</h1>
//         <input id="enSyssla" type="text" placeholder="..." name="syssla" onClick="sendAway()" onfocus="this.value=''" />
//         <button id="skickaSyssla" type="send">Skicka</button>
//         <h2>Att göra: </h2>
//         <ul className="list" id="toDos">
//         </ul>
//         <h2>Avklarade sysslor: </h2>
//         <ul className="list" id="hasDone">
//         </ul>
//       </form>
//     </div>
//   )
// }

// export default todo

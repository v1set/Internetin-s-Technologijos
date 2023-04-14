"use strict";
// Arrays
const tourism = [
    "1",
    "Traku_pilis",
    "malborko_pilis",
    "Laju_taks",
    "Krekenavos_turizmo_centras",
    "Rundales_pilis",
    "Smetonos_dvaras"
];
const visitedPlaces = [3, 5, 7];
function toObject(tourism) {
    return tourism.reduce((acc, item) => {
        const obj = Object.create(null);
        obj.title = item;
        acc.push(obj);
        return acc;
    }, []);
}
// const withFilter = result.filter(obj => obj.title.match("turizmo"))
// document.getElementById("app")?.append(htmlResult.toString())
let htmlResult;
function updateData() {
    const result = toObject(tourism);
    htmlResult = "<table border='solid'>" +
        "<tr><th>Nr.</th>" +
        "<th>Vieta</th>" +
        "<th>Ar aplankyta?</th>" +
        "<th>Istrinti</th></tr>";
    let loops = 0;
    result.forEach(element => {
        loops++;
        let place = element.title.replace("_", " ");
        htmlResult += "<tr>" + `<td> ${loops} </td>` + `<td> ${place} </td>`;
        if (visitedPlaces.find(nr => nr == loops)) {
            htmlResult += `<td> Taip </td>`;
        }
        else {
            htmlResult += `<td> Ne </td>`;
        }
        htmlResult += `<td> <button type="button" onclick="remove(${loops - 1})">Panaikinti</button> </td> </tr>`;
    });
    htmlResult += "</table>";
}
function getData() {
    updateData();
    const el = document.getElementById("app");
    if (el)
        el.innerHTML = htmlResult;
}
function insertData() {
    const val = document.getElementById("place").value;
    tourism.push(val);
}
function remove(id) {
    tourism.splice(id, 1);
    getData();
}
// const template = [
//     "Traku_pilis",
//     "Krekenavos_turizmo_centras",
//     "Smetonos_dvaras"
// ];
// 
// function getLithuaniaPlaces(tourism: Tourism, temlate: Tourism): Tourism {
//      return tourism.filter(place => temlate.includes(place))
// }

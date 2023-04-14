// ----------- {{ Interfaces }} -----------

interface IAirPort {
    id: Number,
    name: String,
}

interface ICompany {
    id: Number,
    code: String,
}

interface ITrip {
    id: Number,
    airPort: Number,
    company: Number,
    tripNumber: String,
    finalAirPort: Number,
    startDate: String,
    finalDate: String,
}


// ----------- {{ Arrays / "DataBase" }} -----------

const airPorts: Array<IAirPort> = [
    {id: 1, name:"Japan Airport"},
    {id: 2, name:"UK Airport"},
    {id: 3, name:"America Airport"},
    {id: 4, name:"Lithuania Airport"},
    {id: 5, name:"Latvia Airport"},
    {id: 6, name:"Poland Airport"},
]

const companies: Array<ICompany> = [
    {id: 1, code:"Jap123"},
    {id: 2, code:"UK123"},
    {id: 3, code:"Ame123"},
    {id: 4, code:"Lit123"},
    {id: 5, code:"Lat123"},
    {id: 6, code:"Pol123"},
]

const trips: Array<ITrip> = [
    {
        id: 1,
        airPort: airPorts[0].id,
        company: companies[0].id,
        tripNumber: 'J001',
        finalAirPort: airPorts[1].id,
        startDate: "2023-01-01T10:15",
        finalDate: "2023-01-01T13:15",
    },
    {
        id: 2,
        airPort: airPorts[1].id,
        company: companies[1].id,
        tripNumber: 'U002',
        finalAirPort: airPorts[2].id,
        startDate: "2023-01-01T11:15",
        finalDate: "2023-01-01T14:15",
    },
    {
        id: 3,
        airPort: airPorts[2].id,
        company: companies[2].id,
        tripNumber: 'A003',
        finalAirPort: airPorts[3].id,
        startDate: "2023-01-01T12:15",
        finalDate: "2023-01-01T15:15",
    },
]


// ----------- {{ Shared functions }} -----------

function doPopup(text:String) {
    const textEl = document.getElementById("popupText")
    if (textEl) {textEl.innerHTML = String(text)}

    const popupBackground = document.querySelector(".popupBackground")
    if (popupBackground) {(popupBackground as HTMLElement).style.display = "block"}

    // const popup = document.querySelector(".popup")
    // if (popup) {(popup as HTMLElement).style.display = "block"}
}

function generateId(arr: Array< ITrip | IAirPort | ICompany >):Number {
    let newId:Number = 0
    arr.forEach(x => {
        if (Number(x.id) >= Number(newId)) {
            newId = Number(x.id) + 1
        }
    })
    return newId
}


// ----------- {{ Trips page functions }} -----------

function makeTripForm() {

    // Airport name input
    let tableInnerData = `<div style="text-align: right;" id="stringAirport"> Oro uosto pavadinimas: </div> <div>
        <select name="Airport" id="airport"> <option value=""> - Pasirinkite - </option>`
    airPorts.forEach(airPort => {
        tableInnerData += `<option value="${airPort.id}">${airPort.name}</option>`
    }) 
    tableInnerData += `</select> </div>`


    // company code input
    tableInnerData += `<div style="text-align: right;" id="stringCompany"> Kompanijos kodas: </div> <div> <select name="Company" id="companyCode">
    <option value=""> - Pasirinkite - </option>`
    companies.forEach(company => {
        tableInnerData += `<option value="${company.id}">${company.code}</option>`
    })
    tableInnerData += `</select> </div>`


    // trip number input
    tableInnerData += `<div style="text-align: right;" id="stringTripNumber"> Reiso numeris: </div> <div> 
    <input type="text value="" id="tripNumber" name="tripNumber" onkeyup="this.value = this.value.toUpperCase();"></input> </div>`

    // start date input
    tableInnerData +=  `<div style="text-align: right;" id="stringStartDate"> Išvykimo laikas: </div> <div> 
    <input type="datetime-local" value="" id="startDate" name="tripStart"></input>  </div>`

    // final airport input
    tableInnerData += `<div style="text-align: right;" id="stringFinalAirport"> Uostas į kurį vykstama: </div> <div>
        <select name="Airport" id="finalAirPort"> <option value=""> - Pasirinkite - </option>`
    airPorts.forEach(airPort => {
        tableInnerData += `<option value="${airPort.id}">${airPort.name}</option>`
    }) 
    tableInnerData += `</select> </div>`

    // final date input
    tableInnerData += ` <div style="text-align: right;" id="stringFinalDate"> Atvykimo laikas: </div> <div> 
    <input type="datetime-local" value="" id="finalDate" name="tripFinish"></input> </div>`

    // save adn clean button
    tableInnerData += `<div style="text-align: right;"> 
    <button type="button" value="" id="clean" onclick="makeTripForm()" 
    style="width: 75%;">Išvalyti laukelius</button> </div><div>
    <button type="button" value="" id="saveButton" onclick="addData()" 
    style="width: 50%;">Pridėti</button> </div>`


    const HTMLdataTable = document.getElementById("inputData")
    if (HTMLdataTable) {
        HTMLdataTable.innerHTML = tableInnerData
    }
}


function updateTripsTable() {
    let tableInnerData = ` <tr> <th> Oro uosto pavadinimas </th> <th> Kompanijos kodas </th> <th> Reiso numeris </th> 
        <th> Išvikimo laikas </th> <th> Uostas į kurį vykstama </th> <th> Atvykimo laikas </th> <th> Veiksmai </th> 
    </tr>`

   
    trips.forEach(trip => {
        const id = trips.findIndex(x => x === trip)
        tableInnerData += `
        <tr> <td> ${airPorts.find(x => x.id === trip.airPort)?.name} 
        </td> <td> ${companies.find(x => x.id === trip.company)?.code} 
        </td> <td> ${trip.tripNumber} 
        </td> <td> ${trip.startDate.split("T").join(' | ')} 
        </td> <td> ${airPorts.find(x => x.id === trip.finalAirPort)?.name}
        </td> <td> ${trip.finalDate.split("T").join(' | ')} 
        </td> <td> 
        <button onclick="changeData(${trip.id})">Keisti</button> 
        <button onclick="deleteData(${trip.id})">Šalinti</button> </td> 
    </tr>`
    })
    const HTMLdataTable = document.getElementById("dataTable")
    if (HTMLdataTable) {
        HTMLdataTable.innerHTML = tableInnerData
    }
}

function getFormData(id:String | undefined = undefined):ITrip | undefined {

    const errColor = `red`;
    const defaultColor = `black`;

    // Reset colors
    (document.getElementById("stringAirport") as HTMLInputElement).style.color = defaultColor;
    (document.getElementById("stringFinalAirport") as HTMLInputElement).style.color = defaultColor;
    (document.getElementById("stringCompany") as HTMLInputElement).style.color = defaultColor;
    (document.getElementById("stringTripNumber") as HTMLInputElement).style.color = defaultColor;
    (document.getElementById("stringStartDate") as HTMLInputElement).style.color = defaultColor;
    (document.getElementById("stringFinalDate") as HTMLInputElement).style.color = defaultColor;

    // Required values
    const airPort = Number((document.getElementById("airport") as HTMLInputElement)?.value)
    const company = Number((document.getElementById("companyCode") as HTMLInputElement)?.value)
    const tripNumber = (document.getElementById("tripNumber") as HTMLInputElement)?.value
    const finalAirPort = Number((document.getElementById("finalAirPort") as HTMLInputElement)?.value)
    const startDate = (document.getElementById("startDate") as HTMLInputElement)?.value
    const finalDate = (document.getElementById("finalDate") as HTMLInputElement)?.value

    let mistakes = false
    let errMessage = ""

    // Checks

    if (airPort === finalAirPort && airPort){
        (document.getElementById("stringAirport") as HTMLInputElement).style.color = errColor;
        (document.getElementById("stringFinalAirport") as HTMLInputElement).style.color = errColor;
        errMessage += "Oro uostai negali sutapti.\n"
        mistakes = true
    }

    const d1 = Date.parse(startDate)
    const d2 = Date.parse(finalDate)
    if (d1 >= d2) {
        errMessage += "Išvykimo data negali būti vėlesnė nei nuvykimo (arba tokia pat).\n";
        (document.getElementById("stringStartDate") as HTMLInputElement).style.color = errColor;
        (document.getElementById("stringFinalDate") as HTMLInputElement).style.color = errColor;
        mistakes = true
    }

    if (!id) {
        if (trips.find(trip => trip.tripNumber === tripNumber)) {
            (document.getElementById("stringTripNumber") as HTMLInputElement).style.color = errColor;
            errMessage += "Toks reiso numeris jau panaudotas.\n"
        }
    }
        
    if (!airPort || !company  || tripNumber === '' || 
    !finalAirPort || startDate === '' || finalDate === '' ) {
        errMessage += "Užpildykite visus laukelius.\n"
        mistakes = true
        
        if (!airPort) {
            (document.getElementById("stringAirport") as HTMLInputElement).style.color = errColor;}
        if (!company) {
            (document.getElementById("stringCompany") as HTMLInputElement).style.color = errColor;}
        if (tripNumber === '') {
            (document.getElementById("stringTripNumber") as HTMLInputElement).style.color = errColor}
        if (!finalAirPort) {
            (document.getElementById("stringFinalAirport") as HTMLInputElement).style.color = errColor;}
        if (startDate === '') {
            (document.getElementById("stringStartDate") as HTMLInputElement).style.color = errColor;}
        if (finalDate === '') {
            (document.getElementById("stringFinalDate") as HTMLInputElement).style.color = errColor;}
    }

    // Return data if all good
    if (!mistakes) {
        let objId = Number(id)
        if (!id) {objId = Number(generateId(trips))}

        const newTrip: ITrip = { 
            id: objId,
            airPort, 
            company, 
            tripNumber, 
            finalAirPort, 
            startDate, finalDate 
        }
        return newTrip
    }

    doPopup(errMessage)
}


function addData() {
    const newTrip = getFormData()
    
    if (newTrip) {
        trips.push(newTrip)
        updateTripsTable()
        makeTripForm()
    }
    
}


function changeData(id: String) {
    makeTripForm()
    // Get Form
    const airPort = (document.getElementById("airport") as HTMLInputElement)
    const company = (document.getElementById("companyCode") as HTMLInputElement)
    const tripNumber = (document.getElementById("tripNumber") as HTMLInputElement)
    const finalAirPort = (document.getElementById("finalAirPort") as HTMLInputElement)
    const startDate = (document.getElementById("startDate") as HTMLInputElement)
    const finalDate = (document.getElementById("finalDate") as HTMLInputElement)
    // Fill up with old data
    airPort.value = String( trips[trips.findIndex(x => x.id === Number(id))].airPort )
    company.value = String( trips[trips.findIndex(x => x.id === Number(id))].company )
    tripNumber.value = String( trips[trips.findIndex(x => x.id === Number(id))].tripNumber )
    finalAirPort.value = String( trips[trips.findIndex(x => x.id === Number(id))].finalAirPort )
    startDate.value = String( trips[trips.findIndex(x => x.id === Number(id))].startDate )
    finalDate.value = String( trips[trips.findIndex(x => x.id === Number(id))].finalDate )

    const saveButton = document.getElementById("saveButton")
    if (saveButton) {
        saveButton.outerHTML = `<button type="button" value="" id="saveButton" onclick="saveChangedData(${String(id)})" 
        style="width: 50%;">Pakeisti</button>`
    }
}


function saveChangedData(id:string) {
    const data = getFormData(id)
    if (data) {
        if (confirm(`Ar tikrai norite pakeisti ${trips[trips.findIndex(x => x.id === Number(id))].tripNumber} reisą?`)) {
            trips[trips.findIndex(x => x.id === Number(id))] = data

            updateTripsTable()
            makeTripForm()
        } 
    } 
}


function deleteData(id: String) {
    if (confirm(`Ar tikrai norite pašalinti ${trips[trips.findIndex(x => x.id === Number(id))].tripNumber} reisą?`)) {
        trips.splice(trips.findIndex(x => x.id === Number(id)), 1)
        updateTripsTable()
    }
}






// ----------- {{ Companies page functions }} -----------

function saveChangedCompany(id:String) {
    const data = getCompaniesFormData(id)
    if (data) {
        if (confirm(`Ar tikrai norite pakeisti ${companies[companies.findIndex(x => x.id === Number(id))].code} Kompaniją?`)) {
            companies[companies.findIndex(x => x.id === Number(id))] = data

            updateCompaniesTable()
            makeCompanyForm()
        } 
    } 
}

function changeCompany(id:String) {
    makeCompanyForm()
    // Get Form
    const companyCode = (document.getElementById("companyCode") as HTMLInputElement)
    // Fill up with old data
    companyCode.value = String( companies[companies.findIndex(x => x.id === Number(id))].code )


    const saveButton = document.getElementById("saveButton")
    if (saveButton) {
        saveButton.outerHTML = `<button type="button" value="" id="saveButton" onclick="saveChangedCompany(${String(id)})" 
        style="width: 50%;">Pakeisti</button>`
    }
}


function deleteCompany(id:String) {
    if (confirm(`Ar tikrai norite pašalinti ${companies[companies.findIndex(x => x.id === Number(id))].code} Kompaniją?`)) {
        companies.splice(companies.findIndex(x => x.id === Number(id)), 1)
        updateCompaniesTable()
    }
}


function updateCompaniesTable() {
    let tableInnerData = ` <tr> <th> Kompanijos pavadinimas </th>  <th> Veiksmai </th> </tr>`
    companies.forEach(company => {
        tableInnerData += `<tr><td> ${company.code} </td> 
        <td> <button onclick="changeCompany(${company.id})">Keisti</button> 
        <button onclick="deleteCompany(${company.id})">Šalinti</button> </td> </tr>`
    })

    const HTMLdataTable = document.getElementById("dataTable")
    if (HTMLdataTable) {
        HTMLdataTable.innerHTML = tableInnerData
    }
}

function getCompaniesFormData(id:String | undefined = undefined):ICompany | undefined {
    const companyCode = (document.getElementById("companyCode") as HTMLInputElement)?.value
    
    let mistakes = false
    if (companyCode === "") {
        doPopup("Įveskite kompanijos kodą")
        mistakes = true
    }

    companies.forEach(company => {
        if (company.code === companyCode) {
            doPopup("Toks kompanijos kodas jau egzistuoja")
            mistakes = true
        }
    })

    if (!mistakes) {
        let objId = Number(id)
        if (!id) {objId = Number(generateId(companies))}

        const newCompany:ICompany = {
            id: objId,
            code: companyCode,
        }
        
        return newCompany
    }
}

function addCompany() {
    const newCompany = getCompaniesFormData()
    if (newCompany) {
        companies.push(newCompany)
        makeCompanyForm()
        console.log(companies)
    }
}

function makeCompanyForm() {
     // Airport name input
    let tableInnerData = `<div style="text-align: right;"> Kompanijos kodas: </div> <div> 
    <input type="text value="" id="companyCode" name="tripNumber"></input> </div>`

    // Buttons
    tableInnerData += `<div colspan="2" style="text-align: right;"> 
    <button type="button" value="" id="clean" onclick="makeCompanyForm()" 
    style="width: 50%;">Išvalyti</button> </div><div>
    <button type="button" value="" id="saveButton" onclick="addCompany()" 
    style="width: 50%;">Pridėti</button> </div>`

    // Display form
    const HTMLdataTable = document.getElementById("inputData")
    if (HTMLdataTable) {
        HTMLdataTable.innerHTML = tableInnerData
    }
}






// ----------- {{ Airports page functions }} -----------

function saveChangedAirport(id:String) {
    const data = getAirportsFormData(id)
    if (data) {
        if (confirm(`Ar tikrai norite pakeisti ${airPorts[airPorts.findIndex(x => x.id === Number(id))].name} oro uostą?`)) {
            airPorts[airPorts.findIndex(x => x.id === Number(id))] = data

            updateAirportsTable()
            makeAirportForm()
        } 
    } 
}

function changeAirport(id:String) {
    makeAirportForm()
    // Get Form
    const airportName = (document.getElementById("airportName") as HTMLInputElement)
    // Fill up with old data
    airportName.value = String( airPorts[airPorts.findIndex(x => x.id === Number(id))].name )


    const saveButton = document.getElementById("saveButton")
    if (saveButton) {
        saveButton.outerHTML = `<button type="button" value="" id="saveButton" onclick="saveChangedAirport(${String(id)})" 
        style="width: 50%;">Pakeisti</button>`
    }
}


function deleteAirport(id:String) {
    if (confirm(`Ar tikrai norite pašalinti ${airPorts[airPorts.findIndex(x => x.id === Number(id))].name} Kompaniją?`)) {
        airPorts.splice(airPorts.findIndex(x => x.id === Number(id)), 1)
        updateAirportsTable()
    }
}


function updateAirportsTable() {
    let tableInnerData = ` <tr> <th> Oro uosto pavadinimas </th>  <th> Veiksmai </th> </tr>`
    airPorts.forEach(airport => {
        tableInnerData += `<tr><td> ${airport.name} </td> 
        <td> <button onclick="changeAirport(${airport.id})">Keisti</button> 
        <button onclick="deleteAirport(${airport.id})">Šalinti</button> </td> </tr>`
    })

    const HTMLdataTable = document.getElementById("dataTable")
    if (HTMLdataTable) {
        HTMLdataTable.innerHTML = tableInnerData
    }
}

function getAirportsFormData(id:String | undefined = undefined):IAirPort | undefined {
    const airportName = (document.getElementById("airportName") as HTMLInputElement)?.value
    
    let mistakes = false
    if (airportName === "") {
        doPopup("Įveskite kompanijos kodą")
        mistakes = true
    }

    airPorts.forEach(airport => {
        if (airport.name === airportName) {
            doPopup("Toks kompanijos kodas jau egzistuoja")
            mistakes = true
        }
    })

    if (!mistakes) {
        let objId = Number(id)
        if (!id) {objId = Number(generateId(airPorts))}

        const newAirport:IAirPort = {
            id: objId,
            name: airportName,
        }
        
        return newAirport
    }
}

function addAirport() {
    const newAirport = getAirportsFormData()
    if (newAirport) {
        airPorts.push(newAirport)
        makeAirportForm()
        console.log(airPorts)
    }
}

function makeAirportForm() {
     // Airport name input
    let tableInnerData = `<div style="text-align: right;"> Oro uostas: </div> <div> 
    <input type="text value="" id="airportName" name="tripNumber"></input> </div>`

    // Buttons
    tableInnerData += `<div colspan="2" style="text-align: right;"> 
    <button type="button" value="" id="clean" onclick="makeAirportForm()" 
    style="width: 50%;">Išvalyti</button> </div><div>
    <button type="button" value="" id="saveButton" onclick="addAirport()" 
    style="width: 50%;">Pridėti</button> </div>`

    // Display form
    const HTMLdataTable = document.getElementById("inputData")
    if (HTMLdataTable) {
        HTMLdataTable.innerHTML = tableInnerData
    }
}






// ----------- {{ Load pages }} -----------

const companiesButton = document.getElementById("companiesButton")
const airportsButton = document.getElementById("airportsButton")
const tripsButton = document.getElementById("tripsButton")
const title = document.getElementById("title")

function makeNavDefault() {
    if (companiesButton) { 
        companiesButton.style.removeProperty('background-color');
        companiesButton.style.removeProperty('color')
    }
    if (airportsButton) { 
        airportsButton.style.removeProperty('background-color');
        airportsButton.style.removeProperty('color')
    }
    if (tripsButton) { 
        tripsButton.style.removeProperty('background-color');
        tripsButton.style.removeProperty('color')
    }
}


function tripsPage() {
    makeTripForm()
    updateTripsTable()
    const formName = document.getElementById("formName")
    if (formName) {
        formName.innerHTML = "Reisas"
    }
    const dataName = document.getElementById("dataName")
    if (dataName) {
        dataName.innerHTML = "Esami reisai"
    }
    makeNavDefault()
    if (tripsButton) { 
        tripsButton.style.backgroundColor = "rgb(97, 97, 97)" 
        tripsButton.style.color = "white" 
    }
    if (title) {title.innerHTML = "Reisai"}
}


function companiesPage() {
    makeCompanyForm()
    updateCompaniesTable()
    const formName = document.getElementById("formName")
    if (formName) {
        formName.innerHTML = "Kompanija"
    }
    const dataName = document.getElementById("dataName")
    if (dataName) {
        dataName.innerHTML = "Esamos kompanijos"
    }
    makeNavDefault()
    if (companiesButton) { 
        companiesButton.style.backgroundColor = "rgb(97, 97, 97)" 
        companiesButton.style.color = "white" 
    }
    if (title) {title.innerHTML = "Kompanijos"}
}


function airportsPage() {
    makeAirportForm()
    updateAirportsTable()
    const formName = document.getElementById("formName")
    if (formName) {
        formName.innerHTML = "Oro uostas"
    }
    const dataName = document.getElementById("dataName")
    if (dataName) {
        dataName.innerHTML = "Esami oro uostai"
    }
    makeNavDefault()
    if (airportsButton) { 
        airportsButton.style.backgroundColor = "rgb(97, 97, 97)" 
        airportsButton.style.color = "white" 
    }
    if (title) {title.innerHTML = "Oro uostai"}
}





// ----------- {{ Calls }} -----------
tripsPage()





// ----------- {{ Debuging }} -----------
// const today = new Date();
// const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// console.log(`Last time script loaded: ${time}`)  

// health.js

const editIcon = `<i class="fas fa-edit"></i>`

const deleteIcon = `<i class="fas fa-trash"></i>`

function clearInputs() {
    wInput.value = ""
    eInput.value = ""
    bInput.value = ""
}

function addToLocalStorage(){
    localStorage.setItem("date", JSON.stringify(date))
    localStorage.setItem("water", JSON.stringify(water))
    localStorage.setItem("exercise", JSON.stringify(exercise))
    localStorage.setItem("wellbeing", JSON.stringify(wellbeing))
}

function activateEdit(i){
    wInput.value = water[i]
    eInput.value = exercise[i]
    bInput.value = wellbeing[i]
    editIndex = i
    submitButton.classList.add("hidden")
    editSection.classList.remove("hidden")
}

function cancelEdit() {
    clearInputs()
    editIndex = -1
    submitButton.classList.remove("hidden")
    editSection.classList.add("hidden")
}

function editRow(){
    if(editIndex==-1) return
    water[editIndex] = wInput.value
    exercise[editIndex] = eInput.value
    wellbeing[editIndex] = bInput.value
    fillTable()
    addToLocalStorage()
    cancelEdit()
}

function deleteRow(i){
    if(!confirm(
    `Confirm that you want to delete the entry: 
    \n ${date[i]}: ${water[i]}ml, ${exercise[i]}min, 
${wellbeing[i]}mg/dL`)) 
return
    date.splice(i, 1)
    water.splice(i, 1)
    exercise.splice(i, 1)
    wellbeing.splice(i, 1)
document.querySelector(`#output > tr:nth-child(${i+1})`)
    .classList.add("delete-animation")
    addToLocalStorage()
    setTimeout(fillTable, 500)
}

function fillTable(){
    const tbody = document.getElementById("output")
    const rows = 
        Math.max(water.length, exercise.length, wellbeing.length)
    let html = ""
    for(let i=0; i<rows; i++){
        let w = water[i] || "N/A"
        let e = exercise[i] || "N/A"
        let b = wellbeingr[i] || "N/A"
        let d = date[i] || "N/A"
        html+=`<tr>
            <td>${d}</td>
            <td>${w}</td>
            <td>${e}</td>
            <td>${b}</td>
            <td>
                <button onclick="activateEdit(${i})" 
                        class="edit">${editIcon}
                </button>
            </td>
            <td>
                <button 
                    onclick="deleteRow(${i})" 
                    class="delete">${deleteIcon}
                </button>
            </td>
        </tr>`        
    }
    tbody.innerHTML = html;
}

let editIndex = -1;

let date = 
    JSON.parse(localStorage.getItem("date")) || []
let water = 
    JSON.parse(localStorage.getItem("water")) || []
let exercise = 
    JSON.parse(localStorage.getItem("exercise")) || []
let bloodsugar = 
    JSON.parse(localStorage.getItem("wellbeing")) || []

const wInput = document.getElementById("water")
const eInput = document.getElementById("exercise")
const bInput = document.getElementById("wellbeing")

const submitButton = document.getElementById("submit")
const editSection = document.getElementById("editSection")

fillTable()

submitButton.addEventListener("click", ()=>{
    const w = wInput.value || null;
    const e = eInput.value || null;
    const b = bInput.value || null;
    if(w===null || e===null || b===null) {
        alert("Please enter all the fields.")
        return
    }
    const d = new Date().toLocaleDateString()
    date = [d, ...date]
    water = [w, ...water]
    exercise = [e, ...exercise]
    wellbeing = [b, ...wellbeing]
    // date.push(d)
    // water.push(w)
    // exercise.push(e)
    // wellbeing.push(b)
    clearInputs()
    fillTable()
    addToLocalStorage()
})

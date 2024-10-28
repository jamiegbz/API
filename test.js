
// access to div lego-container
const legoContainer = document.getElementById("lego-container")

//Use fetch and async/await to interact with the API
//function used when button is clicked
async function onFetchLegoClick() {
    //
    const response = await fetch("http://localhost:3005/Set")
    const legoList = await response.json()

    legoContainer.innerHTML = legoList.map(
        lego => `<div> 
            <h3>${lego.title}</h3>
            <p>${lego.themeId}</p>
        </div`
    ).join("")
}



let lastCreatedItem = null

//use a form to create/post entities
async function onCreateLegoClick(){
    const testLego = { title: "Test", themeId: 1}
    const response = await fetch("http://localhost:3005/Set",{
        method: "POST", //create request
        headers: {"Content-Type": "application/json"}, //copied
        body: JSON.stringify(testLego) // turns data into JSON data
    })
    //newly created item will have the id given to it by backend
    const newlyCreatedItem = await response.json()
    lastCreatedItem = newlyCreatedItem
}

//update entities
async function onUpdateLegoClick() {
    //if not item created this will appear
    if(lastCreatedItem === null) {
        console.log("No item created yet to update")
        return
    }

    fetch("http://localhost:3005/Set/" + lastCreatedItem.id, {
        method: "PUT", //update request
        headers: {"Content-Type": "application/json"}, //copied
        body: JSON.stringify({title: "Test Updated", themeId: 2 }) 
    })
}


//Build a way for users to delete entities
async function onDeleteLegoClick() {
    //if not item created this will appear
    if(lastCreatedItem === null) {
        console.log("No item created yet to delete")
        return
    }

    fetch("http://localhost:3005/Set/" + lastCreatedItem.id, {
        method: "DELETE", //Delete request
    })
}

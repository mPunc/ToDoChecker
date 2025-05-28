export async function generateXml() {
    return await fetch("http://localhost:5001/todo/generate-xml", {method: "GET"})
    .then(response => response.text())
    .then(str => {
        console.log(str);
    })
    .catch(error => console.error("Error:", error))
}

export async function getAllConsole() {
    return await fetch("http://localhost:5001/todo/get-all", {method: "GET"})
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");

        const root = xml.getElementsByTagName("ToDoListItems").item(0)
        console.log(root);
    })
    .catch(error => console.error("Error:", error))
}

export async function createNewTask() {
    const xmlDoc = document.implementation.createDocument("", "", null);

    const xml = xmlDoc.createElement("ToDoListItem");
    xml.setAttribute("completed", "false");
    xml.setAttribute("category", "music");
    
    xml.appendChild(Object.assign(xmlDoc.createElement("Title"), { textContent: "Naslov 2" }));

    let textAndNotes = xmlDoc.createElement("TextContent");
    textAndNotes.appendChild(Object.assign(xmlDoc.createElement("MainText"), { textContent: "Glavni tekst" }));
    textAndNotes.appendChild(Object.assign(xmlDoc.createElement("Notes"), { textContent: "Bilješke" }));
    xml.appendChild(textAndNotes);

    const today = new Date();
    const dueDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

    xml.appendChild(Object.assign(xmlDoc.createElement("CreatedAt"), { textContent: today.toISOString() }));
    xml.appendChild(Object.assign(xmlDoc.createElement("DueDate"), { textContent: dueDate.toISOString() }));

    xml.appendChild(Object.assign(xmlDoc.createElement("Priority"), { textContent: "High" }));

    const xmlString = new XMLSerializer().serializeToString(xml);
    console.log(xmlString);
    return await fetch("http://localhost:5001/todo", {
        method: "POST",
        headers: {
            "Content-type": "application/xml"
        },
        body: xmlString
    })
    .then(async response => console.log(await response.text()))
    .catch(error => console.error("Error:", error))
}

export async function readTask(id) {
    return await fetch(`http://localhost:5001/todo/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/xml"
        }
    })
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");

        const item = xml.getElementsByTagName("ToDoListItem").item(0)
        console.log(item);
    })
    .catch(err => console.error(err));
}

export async function updateTask(id) {
    const xmlDoc = document.implementation.createDocument("", "", null);

    const xml = xmlDoc.createElement("ToDoListItem");
    xml.setAttribute("completed", "false");
    xml.setAttribute("category", "music");

    xml.appendChild(Object.assign(xmlDoc.createElement("Id"), { textContent: id }));
    
    xml.appendChild(Object.assign(xmlDoc.createElement("Title"), { textContent: "Updated Naslov" }));

    let textAndNotes = xmlDoc.createElement("TextContent");
    textAndNotes.appendChild(Object.assign(xmlDoc.createElement("MainText"), { textContent: "Ovdje nema ništa" }));
    textAndNotes.appendChild(Object.assign(xmlDoc.createElement("Notes"), { textContent: null }));
    xml.appendChild(textAndNotes);

    const today = new Date();
    const dueDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

    xml.appendChild(Object.assign(xmlDoc.createElement("CreatedAt"), { textContent: today.toISOString() }));
    xml.appendChild(Object.assign(xmlDoc.createElement("DueDate"), { textContent: dueDate.toISOString() }));

    xml.appendChild(Object.assign(xmlDoc.createElement("Priority"), { textContent: "High" }));

    const updatedXmlString = new XMLSerializer().serializeToString(xml);
    console.log(updatedXmlString);

    return await fetch(`http://localhost:5001/todo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/xml"
        },
        body: updatedXmlString
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export async function deleteTask(id) {
    return await fetch(`http://localhost:5001/todo/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/xml"
        }
    })
    .then(response => {
        if (!response.ok) throw new Error("Delete failed");
        return response.text();
    })
    .then(data => console.log("Deleted:", data))
    .catch(err => console.error(err));
}

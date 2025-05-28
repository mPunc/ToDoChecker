export async function createBaseEntry() {
    const xmlDoc = document.implementation.createDocument("", "", null);

    const xml = xmlDoc.createElement("ToDoListItem");
    xml.setAttribute("completed", "false");
    xml.setAttribute("category", "music");

    xml.appendChild(Object.assign(xmlDoc.createElement("Id"), { textContent: 5 }));
    
    xml.appendChild(Object.assign(xmlDoc.createElement("Title"), { textContent: "Naslov updated" }));

    let textAndNotes = xmlDoc.createElement("TextContent");
    textAndNotes.appendChild(Object.assign(xmlDoc.createElement("MainText"), { textContent: "Glavni tekst" }));
    textAndNotes.appendChild(Object.assign(xmlDoc.createElement("Notes"), { textContent: "Bilješke" }));
    xml.appendChild(textAndNotes);

    const today = new Date();
    const dueDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

    xml.appendChild(Object.assign(xmlDoc.createElement("CreatedAt"), { textContent: today.toISOString() }));
    xml.appendChild(Object.assign(xmlDoc.createElement("DueDate"), { textContent: dueDate.toISOString() }));

    xml.appendChild(Object.assign(xmlDoc.createElement("Priority"), { textContent: "High" }));
    
    return xml;
}
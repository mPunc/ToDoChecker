import * as xmlHelper from "../utils/xmlHelper";

export async function fetchGenerateXml() {
    return await fetch("http://localhost:5001/todo/generate-xml", {method: "GET"})
    .then(response => response.text())
    .then(str => {
        console.log(str);
    })
    .catch(error => console.error("Error:", error));
}

export async function fetchCreateOne() {
    const xml = await xmlHelper.createBaseEntry();
    const xmlString = new XMLSerializer().serializeToString(xml);
    return await fetch("http://localhost:5001/todo", {
        method: "POST",
        headers: {
            "Content-type": "application/xml"
        },
        body: xmlString
    })
    .then(async response => console.log(await response.text()))
    .catch(error => console.error("Error:", error));
}

export async function fetchReadOne(id) {
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

export async function fetchUpdateOne(id) {
    const xml = await xmlHelper.createBaseEntry();
    const updatedXmlString = new XMLSerializer().serializeToString(xml);

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

export async function fetchDeleteOne(id) {
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

export async function fetchGetAll() {
    return await fetch("http://localhost:5001/todo/get-all", {method: "GET"})
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");

        const root = xml.getElementsByTagName("ToDoListItems").item(0)
        console.log(root);
    })
    .catch(error => console.error("Error:", error));
}

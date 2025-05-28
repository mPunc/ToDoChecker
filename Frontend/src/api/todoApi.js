export async function fetchGetAll() {
    const root = await fetch("http://localhost:5001/todo/get-all", {method: "GET"})
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");

        return xml.documentElement;
    })
    .catch(error => console.error("Error:", error));

    return root;
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
        return item;
    })
    .catch(err => console.error(err));
}


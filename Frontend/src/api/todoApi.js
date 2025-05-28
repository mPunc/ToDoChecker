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


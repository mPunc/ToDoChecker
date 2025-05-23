/* here is the key, but you need to modify the fetch address manually, we gotta change that*/
export function fetchTasks() {
    return(
        fetch("http://localhost:5001/todo/get-all")
            .then(response => response.text())
            .then(str => {
                console.log(str);
                const parser = new DOMParser();
                const xml = parser.parseFromString(str, "application/xml");
        
                console.log(DoTheXml(xml));
            })
            .catch(error => console.error("Error:", error))
    );
}

function DoTheXml(x) {

    return x;
}

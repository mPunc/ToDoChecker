/* here is the key, but you need to modify the fetch address manually, we gotta change that*/
export function fetchTasks() {
    return(
        fetch("https://localhost:44338/todo/get-all")
            .then(response => response.text())
            .then(str => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(str, "application/xml");
        
                console.log(xml);
            })
            .catch(error => console.error("Error:", error))
    );
}

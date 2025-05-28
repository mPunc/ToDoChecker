import { useEffect, useState } from "react";
import { fetchReadOne } from "../../api/todoApi";

function OneTask({ id }) {
    const [taskXml, setTaskXml] = useState(null);

    useEffect(() => {
        async function getTask() {
            setTaskXml(await fetchReadOne(id));
        }

        getTask();
    }, [id]);

    if (!taskXml) return <p>Loading...</p>;

    return (
        <div>
            <div>{taskXml.querySelector("Id")?.textContent}</div>
            <div>{taskXml.querySelector("Title")?.textContent}</div>
            <div>{taskXml.querySelector("MainText")?.textContent}</div>
            <div>{taskXml.querySelector("Notes")?.textContent}</div>
        </div>
    );
}

export default OneTask;

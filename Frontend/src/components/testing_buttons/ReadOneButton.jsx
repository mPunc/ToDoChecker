import { useState } from "react";
import { fetchReadOne } from "../../api/todoApiTest";

function ReadOneButton() {
    const [idToRead, setIdToRead] = useState("");

    const handleRead = () => {
        if (!idToRead) {
            alert("Enter ID pls");
            return;
        }
        fetchReadOne(idToRead);
    };

    return <div>
        <input
            value={idToRead}
            onChange={e => setIdToRead(e.target.value)}
            placeholder="Enter ID of task"
        />
        <button onClick={() => handleRead()}>Read one</button>
    </div>
}

export default ReadOneButton;

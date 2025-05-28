import { useState } from "react";
import { fetchUpdateOne } from "../../api/todoApi";

function UpdateOneButton() {
    const [idToUpdate, setIdToUpdate] = useState("");

    const handleUpdate = () => {
        if (!idToUpdate) {
            alert("Enter ID pls");
            return;
        }
        fetchUpdateOne(idToUpdate);
    };

    return <div>
        <input
            value={idToUpdate}
            onChange={e => setIdToUpdate(e.target.value)}
            placeholder="Enter ID of task"
        />
        <button onClick={() => handleUpdate()}>Update one</button>
    </div>
}

export default UpdateOneButton;

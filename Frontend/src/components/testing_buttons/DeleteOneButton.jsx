import { useState } from "react";
import { fetchDeleteOne } from "../../api/todoApi";

function DeleteOneButton() {
    const [idToDelete, setIdToDelete] = useState("");

    const handleDelete = () => {
        if (!idToDelete) {
            alert("Enter ID pls");
            return;
        }
        fetchDeleteOne(idToDelete);
    };

    return <div>
        <input
            value={idToDelete}
            onChange={e => setIdToDelete(e.target.value)}
            placeholder="Enter ID of task"
        />
        <button onClick={() => handleDelete()}>Delete one</button>
    </div>
}

export default DeleteOneButton;

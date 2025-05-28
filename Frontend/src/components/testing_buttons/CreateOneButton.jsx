import { fetchCreateOne } from "../../api/todoApi";

function CreateOneButton() {
    return <div>
        <button onClick={() => fetchCreateOne()}>Create one</button>
    </div>
}

export default CreateOneButton;

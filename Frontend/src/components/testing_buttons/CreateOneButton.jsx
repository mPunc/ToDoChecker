import { fetchCreateOne } from "../../api/todoApiTest";

function CreateOneButton() {
    return <div>
        <button onClick={() => fetchCreateOne()}>Create one</button>
    </div>
}

export default CreateOneButton;

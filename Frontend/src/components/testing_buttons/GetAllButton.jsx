import { fetchGetAll } from "../../api/todoApiTest";

function GetAllButton() {
    return <div>
        <button onClick={() => fetchGetAll()}>Get ALL</button>
    </div>
}

export default GetAllButton;

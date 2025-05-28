import { fetchGetAll } from "../../api/todoApi";

function GetAllButton() {
    return <div>
        <button onClick={() => fetchGetAll()}>Get ALL</button>
    </div>
}

export default GetAllButton;

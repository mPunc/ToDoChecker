import { fetchTasks } from "../services/getXmlTest";

function OneTask() {
    const handleClick = () => {
        fetchTasks();
    };
    return (
        <div className="card col-12 col-md-5 me-auto mb-4 p-0">
            <h5 className="card-header">Task title</h5>
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text text-break">With supporting text below as a natural lead-in to additional aaaaaaaahhhhhhhhhhhhhhhhhhhzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzcontent. afsajnosjnfbopsnbsjdnpboisunfbps</p>
                <div onClick={handleClick}>Go somewhere</div>
            </div>
        </div>
    );
}

export default OneTask;

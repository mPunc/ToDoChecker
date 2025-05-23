import * as XmlFunctions from "../../services/allXmlFunctions";
import { useState } from "react";

function XmlGenerator() {
    return (
        <div className="col">
            <button className="btn btn-dark" onClick={() => {XmlFunctions.generateXml()}}>Generate XML!</button>
        </div>
    );
}

function XmlGetAllConsole() {
    return (
        <div className="col">
            <button className="btn btn-dark" onClick={() => {XmlFunctions.getAllConsole()}}>Get all to console!</button>
        </div>
    );
}

function XmlCreateOneStatic() {
    return (
        <div className="col">
            <button className="btn btn-dark" onClick={() => {XmlFunctions.createNewTask()}}>Create one.</button>
        </div>
    );
}

function XmlReadOneStatic() {
    const [idToRead, setIdToRead] = useState("");

    const handleRead = () => {
        if (!idToRead) {
            alert("Enter the foocking ID! cunt!");
            return;
        }
        XmlFunctions.readTask(idToRead);
    };

    return (
        <div className="col input-group">
            <input
                className="form-control border-dark"
                name="read-input"
                value={idToRead}
                onChange={e => setIdToRead(e.target.value)}
                placeholder="Enter ID to READ!!!"
            />
            <button className="btn btn-dark" onClick={handleRead}>Read.</button>
        </div>
    );
}

function XmlUpdateOneStatic() {
    const [idToUpdate, setIdToUpdate] = useState("");

    const handleUpdate = () => {
        if (!idToUpdate) {
            alert("Enter the foocking ID! cunt!");
            return;
        }
        XmlFunctions.updateTask(idToUpdate);
    };

    return (
        <div className="col input-group">
            <input
                className="form-control border-dark"
                name="update-input"
                value={idToUpdate}
                onChange={e => setIdToUpdate(e.target.value)}
                placeholder="Enter ID to update"
            />
            <button className="btn btn-dark" onClick={handleUpdate}>Update</button>
        </div>
    );
}

function XmlDeleteOneStatic() {
    const [idToDelete, setIdToDelete] = useState("");

    const handleDelete = () => {
        if (!idToDelete) {
            alert("Enter the foocking ID! cunt!");
            return;
        }
        XmlFunctions.deleteTask(idToDelete);
    };

    return (
        <div className="col input-group">
            <input
                className="form-control border-dark"
                name="delete-input"
                value={idToDelete}
                onChange={e => setIdToDelete(e.target.value)}
                placeholder="Enter ID to delete"
            />
            <button className="btn btn-dark" onClick={handleDelete}>Delete</button>
        </div>
    );
}

function XmlDisplayAllFunctions() {
    return (
        <div>
            <div className="row mb-3">
                {XmlGenerator()}
                {XmlGetAllConsole()}
                {XmlCreateOneStatic()}
            </div>

            <div className="row mb-3">
                {XmlReadOneStatic()}
                {XmlUpdateOneStatic()}
                {XmlDeleteOneStatic()}
            </div>
        </div>
    );
}

export default XmlDisplayAllFunctions;

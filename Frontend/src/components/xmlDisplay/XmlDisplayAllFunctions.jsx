import * as XmlFunctions from '../../services/allXmlFunctions';
import { useState } from 'react';

function XmlGenerator() {
    return(
        <div>
            <button onClick={() => {XmlFunctions.generateXml()}}>Generate XML!</button>
        </div>
    );
}

function XmlGetAllConsole() {
    return (
        <div>
            <button onClick={() => {XmlFunctions.getAllConsole()}}>Get all to console!</button>
        </div>
    );
}

function XmlCreateOneStatic() {
    return (
        <div>
            <button onClick={() => {XmlFunctions.createNewTask()}}>Create one.</button>
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
        <div>
            <input
                name="delete-input"
                value={idToDelete}
                onChange={e => setIdToDelete(e.target.value)}
                placeholder="Enter ID to delete"
            />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

function XmlDisplayAllFunctions() {
    return(
        <div>
            {XmlGenerator()}
            {XmlGetAllConsole()}
            {XmlCreateOneStatic()}
            {XmlDeleteOneStatic()}
        </div>
    );
}

export default XmlDisplayAllFunctions;

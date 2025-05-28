import { fetchGenerateXml } from "../../api/todoApi";

function GenerateXmlButton() {
    return <div>
        <button onClick={() => fetchGenerateXml()}>Generate XML</button>
    </div>
}

export default GenerateXmlButton;

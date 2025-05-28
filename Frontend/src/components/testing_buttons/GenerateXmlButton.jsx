import { fetchGenerateXml } from "../../api/todoApiTest";

function GenerateXmlButton() {
    return <div>
        <button onClick={() => fetchGenerateXml()}>Generate XML</button>
    </div>
}

export default GenerateXmlButton;

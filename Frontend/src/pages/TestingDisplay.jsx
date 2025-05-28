import GenerateXmlButton from "../components/testing_buttons/GenerateXmlButton";
import CreateOneButton from "../components/testing_buttons/CreateOneButton";
import ReadOneButton from "../components/testing_buttons/ReadOneButton";
import UpdateOneButton from "../components/testing_buttons/UpdateOneButton";
import DeleteOneButton from "../components/testing_buttons/DeleteOneButton";
import GetAllButton from "../components/testing_buttons/GetAllButton";


function TestingDisplay() {
    return <div className="testing-container">
        <GenerateXmlButton/>
        <CreateOneButton/>
        <ReadOneButton/>
        <UpdateOneButton/>
        <DeleteOneButton/>
        <GetAllButton/>
    </div>
}

export default TestingDisplay;

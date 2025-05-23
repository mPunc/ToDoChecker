import OneTask from "./OneTask";
import XmlDisplayAllFunctions from "./xmlDisplay/XmlDisplayAllFunctions"

function StartPageContent() {
    return (
        <div className="container-sm">
            <XmlDisplayAllFunctions/>
            <div className="d-flex justify-content-between flex-wrap">
                <OneTask/>
                <OneTask/>
                <OneTask/>
                <OneTask/>
                <OneTask/>
                <OneTask/>
            </div>
        </div>
    );
}

export default StartPageContent;

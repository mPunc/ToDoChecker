import OneTask from "./OneTask";
import XmlDisplayAllFunctions from "./xmlDisplay/XmlDisplayAllFunctions"

function StartPageContent() {
    return (
        <div className="container">
            <div className="row">
                <XmlDisplayAllFunctions/>
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
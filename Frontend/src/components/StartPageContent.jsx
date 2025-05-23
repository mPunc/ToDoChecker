import OneTask from "./OneTask";
import XmlDisplayAllFunctions from "./xmlDisplay/XmlDisplayAllFunctions"

function StartPageContent() {
    return (
        <div className="container">
            <XmlDisplayAllFunctions/>
            <div className="row">
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

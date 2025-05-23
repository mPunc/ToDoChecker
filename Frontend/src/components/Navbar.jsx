//import '../styles/Navbar.css';
function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark mb-2">
            <div className="container-fluid d-flex justify-content-between">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-brand fs-2 text">To Do Checker</div>
                <div className="navbar-brand fs-4 text">Username</div>
                <div className="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas - navigation and options</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <div className="nav-link active" aria-current="page">Home</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">Link</div>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                                </div>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><div className="dropdown-item">Action</div></li>
                                    <li><div className="dropdown-item">Another action</div></li>
                                    <li><div className="dropdown-item">Something else here</div></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

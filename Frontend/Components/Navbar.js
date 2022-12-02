import './Navbar.css';
// import NavbarPicture from "./ASG_SER_MC_RGB.png";
function Navbar() {
    return (
        <div>
            <header>
                <div className="navbar">
                    {/*<img src={NavbarPicture}/>*/}
                    <ul className="nav">
                        <li className="item">
                            <a href="#" className="contact">My Actions</a>
                        </li>
                    </ul>
                    <div className="logo">
                    </div>
                </div>
            </header>
        </div>
    )
}
export default Navbar;
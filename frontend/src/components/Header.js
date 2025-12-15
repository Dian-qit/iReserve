import { Link } from "react-router-dom" 

const Header = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>iReserve</h1>
                </Link>
                <p>Reserve your desired room daw</p>
                
            </div>
        </header>
    )
}

export default Header
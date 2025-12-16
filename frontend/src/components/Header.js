import { Link } from "react-router-dom" 

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <Link to="/">
                        <h1>iRESERVE</h1>
                    </Link>
                    <p>Reserve your desired room daw</p>
                </div>
                
            </div>
        </header>
    )
}

export default Header
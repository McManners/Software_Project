// public facing page... no auth
import { Link } from 'react-router-dom';

const Public = () => {
    return (
        <div>
            <h1>Public</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}
export default Public;
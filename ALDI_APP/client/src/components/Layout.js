import { Outlet } from 'react-router-dom';

const Layout = () => {
    console.log("hey how yall doing layout");
    // render children of outlet component
    // could add header/footer on EVERY page, this is the parent to add extra stuff
    return <Outlet />
}
export default Layout;
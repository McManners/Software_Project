import { SIgnIn } from "./Pages/SIgnIn";
import {MemoryRouter} from "react-router-dom";
import SIgnIn from "./Pages/SIgnIn";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <MemoryRouter>
            <SIgnIn/>
        </MemoryRouter>
    </React.StrictMode>
)
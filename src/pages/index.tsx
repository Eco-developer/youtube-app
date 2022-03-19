import { Home } from "./home";
import { Results } from "./reults";
import { VideoPage } from "./video-page";
import { Header } from "../components/header";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

export const Navigation = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/results" element={<Results />}/>
                <Route path="/video" element={<VideoPage />}/>
            </Routes>
        </Router>
    )
}

import { Home } from "./home";
import { ResultsPage } from "./reults";
import { VideoPage } from "./video-page";
import { CategoryPage } from "./category";
import { ChannelPage } from "./channel";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import * as ROUTES from "../const/routes";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

export const Navigation = () => {
    return (
        <Router>
            <Header/>
            <Sidebar/>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />}/>
                <Route path={ROUTES.RESULT} element={<ResultsPage />}/>
                <Route path={ROUTES.VIDEO} element={<VideoPage />}/>
                <Route path={ROUTES.CATEGORY} element={<CategoryPage />}/>
                <Route path={ROUTES.CHANNEL} element={<ChannelPage />}/>
                <Route path="*" element={<Home />}/>
            </Routes>
        </Router>
    )
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import SinglePage from "./pages/singlePage/SinglePage";
import New from "./pages/new/New";
import { facilityInputs, tripInputs, truckInputs } from "./formSource";
import { truckDetails, tripDetails, facilityDetails } from "./detailSource";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="trucks">
                            <Route
                                index
                                element={
                                    <List
                                        resource={"trucks"}
                                        title="Add New Truck"
                                    />
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <SinglePage
                                        resource={"trucks"}
                                        details={truckDetails}
                                    />
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <New
                                        resource={"trucks"}
                                        title="Add New Truck"
                                        inputs={truckInputs}
                                    />
                                }
                            />
                        </Route>
                        <Route path="trips">
                            <Route
                                index
                                element={
                                    <List
                                        resource={"trips"}
                                        title="Add New Trip"
                                    />
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <SinglePage
                                        resource={"trips"}
                                        details={tripDetails}
                                    />
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <New
                                        resource="trips"
                                        title="Add New Trip"
                                        inputs={tripInputs}
                                    />
                                }
                            />
                        </Route>
                        <Route path="facilities">
                            <Route
                                index
                                element={
                                    <List
                                        resource="facilities"
                                        title="Add New Facility"
                                    />
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <SinglePage
                                        resource={"facilities"}
                                        details={facilityDetails}
                                    />
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <New
                                        resource={"facilities"}
                                        title="Add New Facility"
                                        inputs={facilityInputs}
                                    />
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

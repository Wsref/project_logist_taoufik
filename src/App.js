import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import SinglePage from "./pages/singlePage/SinglePage";
import New from "./pages/new/New";
import { facilityInputs, tripInputs, truckInputs } from "./formSource";
import { truckDetails, tripDetails, facilityDetails } from "./detailSource";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NewTrip from "./pages/newTrip/NewTrip";
import TruckDetails from "./pages/truckDetails/TruckDetails";
import FacilityDetails from "./pages/facilityDetails/FacilityDetails";

function App() {
    const { currentUser } = useContext(AuthContext);

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />;
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <Home />
                                </RequireAuth>
                            }
                        />
                        <Route path="login" element={<Login />} />
                        <Route path="trucks">
                            <Route
                                index
                                element={
                                    <RequireAuth>
                                        <List
                                            resource={"trucks"}
                                            title="Add New Truck"
                                        />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <RequireAuth>
                                        <TruckDetails
                                            resource={"trucks"}
                                            details={truckDetails}
                                        />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <RequireAuth>
                                        <New
                                            resource={"trucks"}
                                            title="Add New Truck"
                                            inputs={truckInputs}
                                        />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                        <Route path="trips">
                            <Route
                                index
                                element={
                                    <RequireAuth>
                                        <List
                                            resource={"trips"}
                                            title="Add New Trip"
                                        />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <RequireAuth>
                                        <SinglePage
                                            resource={"trips"}
                                            details={tripDetails}
                                        />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <RequireAuth>
                                        <NewTrip
                                            resource="trips"
                                            title="Add New Trip"
                                            inputs={tripInputs}
                                        />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                        <Route path="facilities">
                            <Route
                                index
                                element={
                                    <RequireAuth>
                                        <List
                                            resource="facilities"
                                            title="Add New Facility"
                                        />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <RequireAuth>
                                        <FacilityDetails
                                            resource={"facilities"}
                                            details={facilityDetails}
                                        />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <RequireAuth>
                                        <New
                                            resource={"facilities"}
                                            title="Add New Facility"
                                            inputs={facilityInputs}
                                        />
                                    </RequireAuth>
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

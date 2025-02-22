// ----------------------------------------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import { AuthContext } from "./context/AuthContext";
import { db } from "./firebase";
import { facilityInputs, tripInputs, truckInputs } from "./formSource";
import { truckDetails, tripDetails, facilityDetails } from "./detailSource";


import Home from "./pages/home/Home";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Login from "./pages/login/Login";
import NewTrip from "./pages/newTrip/NewTrip";
import TruckDetails from "./pages/truckDetails/TruckDetails";
import FacilityDetails from "./pages/facilityDetails/FacilityDetails";
import TripDetails from "./pages/tripDetails/TripDetails";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Edit from "./pages/edit/Edit";
import EditTrip from "./pages/editTrip/EditTrip";

// ----------------------------------------------------------------------------------------------------------

export const AppContext = createContext();

function App() {
    const { currentUser } = useContext(AuthContext);
    const [truckData, setTruckData] = useState([]);
    const [facilityData, setFacilityData] = useState([]);
    const [tripData, setTripData] = useState([]);

    useEffect(() => {
        // const fetchData = async (resource, setter) => {
        //     let list = [];

        //     try {
        //         const querySnapshot = await getDocs(collection(db, resource));
        //         querySnapshot.forEach((doc) => {
        //             let docData = doc.data();

        //             if (resource === "trips") {
        //                 docData.startDate = docData.startDate.toDate();
        //                 docData.endDate = docData.endDate.toDate();
        //             }

        //             list.push({ id: doc.id, ...docData });
        //         });

        //         setter(list);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };
        const fetchData =  (resource, setter) => {
            
        
            onSnapshot(collection(db, resource), (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    let docData = doc.data();
                    if (resource === "trips") {
                        docData.startDate = docData.startDate.toDate();
                        docData.endDate = docData.endDate.toDate();
                    }
                    list.push({ id:doc.id, ...docData });
                })
                setter(list);
            });
        
            
        
        };

        fetchData("trucks", setTruckData);
        fetchData("facilities", setFacilityData);
        fetchData("trips", setTripData);
    }, []);

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />;
    };

    return (
        <div>
            <AppContext.Provider
                value={{
                    truckData,
                    facilityData,
                    tripData,
                    // setTruckData,
                    // setFacilityData,
                    // setTripData,
                }}
            >
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
                            {!currentUser && <Route path="login" element={<Login />} />}
                            <Route path="trucks">
                                <Route
                                    index
                                    element={
                                        <RequireAuth>
                                            <List
                                                resource={"trucks"}
                                                title="Trucks"
                                                history={null}
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
                                <Route
                                    path="edit/:id"
                                    element={
                                        <RequireAuth>
                                            <Edit
                                                resource={"trucks"}
                                                title="Edit Truck"
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
                                                title="Trips"
                                                history={null}
                                            />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="history"
                                    element={
                                        <RequireAuth>
                                            <List
                                                history={1}
                                            />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path=":id"
                                    element={
                                        <RequireAuth>
                                            <TripDetails
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
                                                title="New Trip"
                                                inputs={tripInputs}
                                            />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="edit/:id"
                                    element={
                                        <RequireAuth>
                                            <EditTrip
                                                resource="trips"
                                                title="Confirm Trip"
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
                                                title="Facilities"
                                                history={null}
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
                                <Route
                                    path="edit/:id"
                                    element={
                                        <RequireAuth>
                                            <Edit
                                                resource={"facilities"}
                                                title="Edit Facility"
                                                inputs={facilityInputs}
                                            />
                                        </RequireAuth>
                                    }
                                />
                            </Route>
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;

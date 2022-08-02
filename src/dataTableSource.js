export const truckColumns = [
    {
        field: "license",
        headerName: "License",
        flex: 1,
    },
    {
        field: "driver_name",
        headerName: "Driver Name",
        flex: 1,
    },
    {
        field: "capacity",
        headerName: "Capacity",
        flex: 0.75,
    },
    {
        field: "registration",
        headerName: "Registration",
        flex: 0.75,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.registration}`}>
                    {params.row.registration}
                </div>
            );
        },
    },
];

export const facilityColumns = [
    {
        field: "facilityName",
        headerName: "Facility Name",
        flex: 1,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
    },
    {
        field: "city",
        headerName: "City",
        flex: 1,
    },
    {
        field: "facilityState",
        headerName: "State",
        flex: 0.5,
    },
    {
        field: "zipCode",
        headerName: "ZIP Code",
        flex: 1,
    },
];

export const tripColumns = [
    {
        field: "truck",
        headerName: "Truck",
        flex: 1,
    },
    {
        field: "originFacility",
        headerName: "Origin Facility",
        flex: 1,
    },
    {
        field: "destinationFacility",
        headerName: "Destination Facility",
        flex: 1,
    },
    {
        field: "startDate",
        headerName: "Start Date",
        flex: 1,
    },
    {
        field: "endDate",
        headerName: "End Date",
        flex: 1,
    },
    {
        field: "earnings",
        headerName: "Earnings",
        flex: 0.5,
    },
];

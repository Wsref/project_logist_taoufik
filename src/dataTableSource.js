export const userColumns = [
    {
        field: "id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "license",
        headerName: "License",
        flex: 1,
    },
    {
        field: "driver",
        headerName: "Driver Name",
        flex: 1,
    },
    {
        field: "capacity",
        headerName: "Capacity",
        flex: 1,
    },
    {
        field: "tripCount",
        headerName: "Trips",
        flex: 1,
    },
    {
        field: "registration",
        headerName: "Registration",
        flex: 1,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.registration}`}>
                    {params.row.registration}
                </div>
            );
        },
    },
];

//temporary data
export const userRows = [
    {
        id: 1,
        license: "AE19FI2",
        driver: "Alan Tremblay",
        capacity: 35000,
        tripCount: 26,
        registration: "valid",
    },
    {
        id: 2,
        license: "1J4GZ58S",
        driver: "Jose Guerra",
        capacity: 38000,
        tripCount: 58,
        registration: "valid",
    },
    {
        id: 3,
        license: "MXXKF31",
        driver: "Thomas Lewis",
        capacity: 42000,
        tripCount: 6,
        registration: "invalid",
    },
    {
        id: 4,
        license: "LZE23VH",
        driver: "Barbara Foster",
        capacity: 40000,
        tripCount: 78,
        registration: "valid",
    },
    {
        id: 5,
        license: "HDWHW3G",
        driver: "Francis Poles",
        capacity: 18000,
        tripCount: 64,
        registration: "valid",
    },
    {
        id: 6,
        license: "TQSY7FY",
        driver: "Dustin Wallace",
        capacity: 43500,
        tripCount: 32,
        registration: "valid",
    },
    {
        id: 7,
        license: "F3OMVJ8",
        driver: "Benjamin Miller",
        capacity: 42500,
        tripCount: 13,
        registration: "valid",
    },
    {
        id: 8,
        license: "C9KY7VF",
        driver: "Otto Wagner",
        capacity: 37500,
        tripCount: 43,
        registration: "invalid",
    },
    {
        id: 9,
        license: "G2N75IL",
        driver: "Jack Moore",
        capacity: 28000,
        tripCount: 118,
        registration: "valid",
    },
    {
        id: 10,
        license: "ZJNIISF",
        driver: "Paul Hammond",
        capacity: 29000,
        tripCount: 50,
        registration: "valid",
    },
    {
        id: 11,
        license: "BZP4OBK",
        driver: "Victor Newman",
        capacity: 17000,
        tripCount: 33,
        registration: "valid",
    },
    {
        id: 12,
        license: "V7TB9OG",
        driver: "Clifford Hughes",
        capacity: 36000,
        tripCount: 51,
        registration: "valid",
    },
];

import './listTable.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react'

const ListTable = () => {
  const rows = [
        {
            id: 1143155,
            truck: "AE19FI2",
            originFacility: "Central Logistics",
            destinationFacility: "A1 Fulfillment",
            endDate: "7-28-2022 12:30:00",
            method: "7-31-2022 06:45:00",
            earnings: "$6000.00",
        },
        {
            id: 3756485,
            truck: "1J4GZ58S",
            originFacility: "Lakeview Shipping",
            destinationFacility: "Redwood Distribution",
            endDate: "8-14-2022 0:15:00",
            method: "8-14-2022 21:00:00",
            earnings: "$1000.00",
        },
        {
            id: 5635289,
            truck: "WBAAM334",
            originFacility: "Keystone Packaging",
            destinationFacility: "Ladybug Retail",
            endDate: "7-21-2022 08:00:00",
            method: "7-23-2022 12:45:00",
            earnings: "$5000.00",
        }
    ];

    return (
        <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
            <TableHead>
                <TableRow  sx={{
                    "& th": {
                    fontSize: "1.5vmin",
                    color: "rgba(96, 96, 96)"
                    }
                }}>
                <TableCell className='tableCell'>Trip ID</TableCell>
                <TableCell className='tableCell'>Truck</TableCell>
                <TableCell className='tableCell'>Origin Facility</TableCell>
                <TableCell className='tableCell'>Destination Facility</TableCell>
                <TableCell className='tableCell'>Start Date</TableCell>
                <TableCell className='tableCell'>End Date</TableCell>
                <TableCell className='tableCell'>Earnings</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id} >
                <TableCell className='tableCell' sx={{fontSize: "1.4vmin"}}>
                    {row.id}
                </TableCell>
                <TableCell className='tableCell' sx={{fontSize: "1.4vmin"}}>
                    <div className="cellWrapper">
                        <img src={row.img} alt="" className='image'/>
                        {row.truck}
                    </div>
                </TableCell>
                <TableCell className='tableCell' sx={{fontSize: "1.4vmin"}}>{row.originFacility}</TableCell>
                <TableCell className='tableCell' sx={{fontSize: "1.4vmin"}}>{row.destinationFacility}</TableCell>
                <TableCell className='tableCell' sx={{fontSize: "1.4vmin"}}>{row.endDate}</TableCell>
                <TableCell className='tableCell' sx={{fontSize: "1.4vmin"}}>{row.method}</TableCell>
                <TableCell className='tableCell' sx={{fontSize: "1.4vmin"}}>{row.earnings}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default ListTable
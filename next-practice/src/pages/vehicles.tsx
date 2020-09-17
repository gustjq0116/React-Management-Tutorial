import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { VehicleInfo } from '../../api/VehiclePerson'
import { GetServerSideProps } from 'next'

export interface VehicleInfo2
{
    list?: VehicleInfo[]
}
export default function vehicle({ list }: VehicleInfo2)
{
    return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">OwnerID</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {list?.map((row: VehicleInfo, index) => (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                {row.id}
                </TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.model}</TableCell>
                <TableCell align="right">{row.owerId}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
{
    const resp = await fetch('http://localhost:3000/api/vehicle')
    const json = await resp.json()
    return { props: 
            { 
                list: json
            }}
}
import { NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import { VehicleInfo } from '../../../../api/VehiclePerson'

export default async function getVehiclesById(req: NextApiRequest, res: NextApiResponse)
{

    const db: sqlite.Database = await sqlite.open('./mymydatabase')
    const vehicles: VehicleInfo = await db.get(`SELECT * from Vehicle WHERE id= ?`, [req.query.id])

    res.json(vehicles)
}
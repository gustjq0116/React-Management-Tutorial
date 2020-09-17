import { NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import { VehicleInfo } from '../../../../../api/VehiclePerson'

export default async function getAllVehicleByPersonId(req: NextApiRequest, res: NextApiResponse)
{
    const db = await sqlite.open('./mymydatabase')
    const vehicle: VehicleInfo[] = await db.all('SELECT * from vehicle where owerId = ?', [req.query.id])

    res.json(vehicle)
}
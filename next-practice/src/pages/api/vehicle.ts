import { NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import { VehicleInfo } from '../../../api/VehiclePerson'
import { auth } from './people'

export default auth(async function getAllVehicles(req: NextApiRequest, res: NextApiResponse)
{
    const db = await sqlite.open('./mymydatabase')
    const vehicles: VehicleInfo[] = await db.all('SELECT * from Vehicle')

    res.json(vehicles)
})
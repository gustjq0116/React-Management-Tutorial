import { NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import { PersonInfo } from '../../../../../api/VehiclePerson'

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse)
{
    const db = await sqlite.open('./mymydatabase')

    if(req.method === 'PUT')
    {
        const statement = await db.prepare('UPDATE person SET name = ?, email = ? where id = ?')
        const result = await statement.run(req.body.name, req.body.email, req.query.id)
        result.finalize();
    }



    const people: PersonInfo = await db.get('SELECT * from Person where id = ?', [req.query.id])

    res.json(people)
}
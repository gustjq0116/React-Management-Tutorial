import { verify } from 'crypto';
import { NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import jwt from 'jsonwebtoken'
import { secret } from '../../../api/secret';
import { PersonInfo } from '../../../api/VehiclePerson'

export const auth = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    

    
    if(!req.headers.authorization) return res.status(401).json({ message: "Not Allowed"})

    const result = await jwt.verify(req.headers.authorization, secret)
    //console.log(result)
    return await fn(req, res)

  // return await fn(req, res)    
}


export default auth(async function getPeople(req: NextApiRequest, res: NextApiResponse)
{
    const db = await sqlite.open('./mymydatabase')
    const people: PersonInfo[] = await db.all('SELECT id, email, name from Person')
   // console.log(people)
    if(people) return res.json(people)
    else return res.json({ message: 'no people'})
    
})
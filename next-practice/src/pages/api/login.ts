import { NextApiRequest, NextApiResponse} from 'next'
import sqlite from 'sqlite'
import { PersonInfo } from '../../../api/VehiclePerson'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { secret } from '../../../api/secret'


export default async function getPersonById(req: NextApiRequest, res: NextApiResponse)
{
    const db = await sqlite.open('./mymydatabase')

    if(req.method === 'POST')
    {
        const userInput: PersonInfo = req.body;

        const person: PersonInfo = await db.get(
            'SELECT * from person where email = ?', [userInput.email]
            )
        if(!person) return res.json({ message: 'Email is wrong'})
        
        const match = await compare(userInput.password, person.password)

        const claims = { sub: person.id, PersonEmail: person.email }
        const jwt = sign(claims, secret, { expiresIn: '1h' })
        
        if(match) { return res.json({ authToken: jwt }) }
        else { return res.json({ message: 'Password is wrong'}) }
    
    }
    else
    {
        return res.status(405).json({ message: 'We only support POST'})
    }



   
}
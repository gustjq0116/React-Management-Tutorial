import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import dbConnect from '../../utils/dbConnect'
import User from '../../mongooseModels/User'
import { UserInfo } from '../../types/types'

export default async function signup(
    req: NextApiRequest,
    res: NextApiResponse
  ) 
  {
    const method = req.method
   // const db = await sqlite.open('./mydb.sqlite');
    await dbConnect();

    switch(method)
    {
      case 'POST':
        try
        {
          const find: UserInfo[] = await User.find({ email: req.body.email }).exec()

          console.log(find)
          if(find.length > 0)
          {
            res.status(200).json({ already: true })
          }
          else
          {
            const result = await bcrypt.hash(req.body.password, 10)

            const body =
            {
              email: req.body.email,
              password: result
            }
          
            const user = await User.create(body)
          
            res.status(201).json({ success: true, data: user })
          }
        }
        catch(err)
        {
          console.log(err)
          res.status(400).json({ success: false })
        }
        break;
      default:
        res.status(400).json({ success: false })
        break

    }
  }
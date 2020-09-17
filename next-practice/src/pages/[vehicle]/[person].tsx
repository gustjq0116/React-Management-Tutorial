import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { VehiclePerson }  from '../../../api/VehiclePerson'

export interface ListProps
{
    data?: VehiclePerson[]
    error?: string
}


export default function Person()
{
    const router = useRouter();
    const fetcher = (url:string) => fetch(url).then(r => { return r.json() })
    
    const { data, error }:ListProps  = useSWR('https://my-json-server.typicode.com/gustjq0116/demo/data?ownerName='+ router.query.person, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
   // if( data.length > 0)
    {
        return (
        <div>
            <div>
                {data[0]?.ownerName}'s {data[0]?.vehicle}
            </div>
            <div>
                {data[0]?.details}
            </div>
        </div>
        )
    }
    // else
    // {
    //     return <div>
    //         Empty
    //     </div>
    // }
    
}

// export async function getServerSideProps(context) {
//     if(!context.req)
//     {
//         console.log("no req")
//         return { props: { data: []}}
//     }
//     console.log("req")
//     // Fetch data from external API
//     const res = await fetch('https://my-json-server.typicode.com/gustjq0116/demo/data?ownerName='+context.query.person)
//     const data = await res.json()
//     //console.log(context)
//     // Pass data to the page via props
//     return { props: { data } }
//   }

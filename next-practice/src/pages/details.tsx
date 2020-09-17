import Link from 'next/link'
import { VehiclePerson, ListProps}  from '../../api/VehiclePerson'


export default function Details({ testJson }: ListProps)
{
    //console.log(process.cwd())

    return (
        <div>
            {/* {console.log(props)} */}
            {/* {testJson && console.log(testJson)} */}
            {testJson?.map((data: VehiclePerson, i) =>
                { //console.log("map")
             return (
             <div key={i}>
                <Link as={`/${data.vehicle}/${data.ownerName}`} href="/[vehicle]/[person]">
                    <a>To {data.ownerName}</a>
                </Link>
            </div>

               )})}

            
        </div>

    )
}



export async function getStaticProps() {
   // const allPostsData = getSortedPostsData()
    //console.log(getText())
    // const allPostsData = await getText()
    const response = await fetch('https://my-json-server.typicode.com/gustjq0116/demo/data')
    const testJson: VehiclePerson[] | undefined = await response.json()
    //console.log(testJson)
    // console.log("static")
    //const allPostsData = await JSON.parse('{ a: bb, b: cc }')
     //console.log(testExamples)
    return {
      props: {
        testJson
    }
  }


}

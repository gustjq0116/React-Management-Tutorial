import Link from 'next/link'

const people =[
    {v: 'car', name: 'bruno'},
    {v: 'bike', name: 'John'},
    {v: 'airplane', name: 'Mick'},
]

function Details() {
    return (
        <div>
            {people.map((e, i) =>
                {
                    return (
            <div key={i} >
                <Link as={`/${e.v}/${e.name}`} href="/[vehicle]/[person]">
                    <a>To {e.name}'s {e.v}</a>
                </Link>
            </div>
                    )
                })}
            
        </div>
    )
}

export default Details

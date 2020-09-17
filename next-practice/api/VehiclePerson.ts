export interface VehiclePerson 
{
    details: String;
    ownerName: String;
    vehicle: String;
}

export interface ListProps
{
    testJson?: VehiclePerson[]
}

export interface VehicleInfo
{
    id?: BigInteger
    brand?: string,
    model?: string,
    owerId?: BigInteger
}

export interface PersonInfo
{
    id?: BigInteger
    name?: string,
    email: string,
    password: string
}
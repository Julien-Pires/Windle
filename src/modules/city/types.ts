export interface Coordinate {
    lat: number,
    lon: number
}

export interface Country {
    code: string,
    name: string
}

export interface City {
    name: string,
    country: Country,
    coordinate: Coordinate
}

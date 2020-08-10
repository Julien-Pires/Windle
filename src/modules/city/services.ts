import Parse from '../../utils/db/parse';
import { City } from './types';

const cityClassName = 'Continentscountriescities_City';

export const getCity = async (name: string): Promise<City[]> => {
    if(!name) {
        return [];
    }

    const query = 
        Parse.query(cityClassName)
            .startsWith('name', name)
            .include('country');
    const result = await query.find();

    return result.map(c => {
        return {
            name: c.get('name'),
            country: {
                code: c.get('country').get('code'),
                name: c.get('country').get('name')
            },
            coordinate: {
                lat: c.get('location').latitude,
                lon: c.get('location').longitude
            }
        };
    });
};

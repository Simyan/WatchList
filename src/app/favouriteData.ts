import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Favourite } from './favourite';
import { Medium } from './medium';

export class FavouriteData implements InMemoryDbService {

    createDb(){
        const favourites : Favourite[]  = [
            {
                id: 1,
                Name: "Jojo Rabbit",
                Genre: "Satire",
                Rating: 8.8,
                MediumId: 1
            },
            {
                id: 2,
                Name: "Dirk Gently",
                Genre: "Sci-fi",
                Rating: 8.2,
                MediumId: 2
            },
            {
                id: 3,
                Name: "My Hero Academia",
                Genre: "Super Hero",
                Rating: 8.5,
                MediumId: 3
            }
        ];

        const mediums : Medium[] = [
            {id: 1, Name: "TV Show"},
            {id: 2, Name: "Movie"},
            {id: 3, Name: "Anime"},
        ]
        return {favourites, mediums};
    }

    // genId(favourites: Favourite[]): number {
    //     return favourites.length > 0 ? Math.max(...favourites.map(fav => fav.Id)) + 1 : 1
    //   }
}
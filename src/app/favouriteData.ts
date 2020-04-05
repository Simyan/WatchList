import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Favourite } from './favourite';

export class FavouriteData implements InMemoryDbService {

    createDb(){
        const favourites : Favourite[] = [
            {
                Id: 1,
                Name: "Jojo Rabbit",
                Genre: "Satire",
                Rating: 8.8,
                IsMovie: true
            },
            {
                Id: 2,
                Name: "Dirk Gently",
                Genre: "Sci-fi",
                Rating: 8.2,
                IsMovie: false
            }
        ];
        return {favourites};
    }
}
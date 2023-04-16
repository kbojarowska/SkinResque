import { Cosmetic } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';

export const createCosmetic = async (name: string, description: string, recipe: string,
	ingredients: Array<string>, skinTypeRecommendation: Array<string>, photo: string) => {
    const cosmeticToInsert = new Cosmetic({
		name,
		description,
		recipe,
		ingredients,
		skinTypeRecommendation,
		photo
	});
	return DB.insert(Cosmetic, [cosmeticToInsert]);
};

import mongoose, { ObjectId } from 'mongoose';
import * as dotenv from 'dotenv';
import { uniqueNamesGenerator, colors, adjectives, starWars, names } from 'unique-names-generator';
import { LoremIpsum } from 'lorem-ipsum';
import { Cosmetic, Palette, User } from '../domain/models/index.js';
import { PalleteFromDB } from './types';
import { ICosmetics } from '../domain/shared/types.js';
dotenv.config();

const DB_DATA = {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
};

function next8BitHex(): String {
    return (Math.floor(Math.random() * 100) % 256).toString(16).padStart(2, '0').toUpperCase();
}

(async () => {
    await mongoose
        .connect(`mongodb://${DB_DATA.HOST}:${DB_DATA.PORT}`, { dbName: 'skin-resque' })
        .catch(err => {
            console.log(err);
        });

    const loremGen = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4,
        },
        wordsPerSentence: {
            max: 16,
            min: 4,
        },
    });

    // Creating cosmetics
    for (let i = 0; i < 20; i++) {
        const includeRecipe = Math.random() > 0.5;
        const cosmetic = new Cosmetic({
            name: uniqueNamesGenerator({
                dictionaries: [adjectives, colors, starWars],
                separator: ' ',
            }),
            description: loremGen.generateParagraphs(1),
            recipe: includeRecipe ? undefined : loremGen.generateSentences(5),
            ingredients: new Array(6).fill('').map(v =>
                uniqueNamesGenerator({
                    dictionaries: [colors, adjectives, ['serum', 'milk', 'goo', 'oil', 'liquid']],
                    separator: ' ',
                })
            ),
        });
        await cosmetic.save();
    }

    // Creating palettes
    for (let i = 0; i < 30; i++) {
        const palette = new Palette({
            name: uniqueNamesGenerator({
                dictionaries: [colors, colors, adjectives],
                separator: ' ',
            }),
            colors: new Array(6)
                .fill('')
                .map(v => `#${next8BitHex()}${next8BitHex()}${next8BitHex()}`),
        });
        await palette.save();
    }

    // Creating user
    for (let i = 0; i < 10; i++) {
        const saved_cosmetics: ObjectId[] = (
            await Cosmetic.aggregate([{ $sample: { size: 5 } }])
        ).map((cosmetic: ICosmetics & { _id: ObjectId }): ObjectId => cosmetic._id);
        const saved_palettes: PalleteFromDB[] = await Palette.aggregate([
            {
                $sample: { size: 2 },
            },
        ]);

        console.log(saved_palettes);

        const user = new User({
            name: uniqueNamesGenerator({
                dictionaries: [colors, adjectives, names],
                separator: '-',
                style: 'capital',
            }),
            email: `${uniqueNamesGenerator({
                dictionaries: [adjectives, colors],
                length: 2,
                separator: '',
            })}@example.org`,
            saved_cosmetics: saved_cosmetics,
            saved_palettes: saved_palettes,
        });
        await user
            .save()
            // .then(v => console.log(v))
            .catch(err => console.log(err));
    }
    await mongoose.connection.close();
})();

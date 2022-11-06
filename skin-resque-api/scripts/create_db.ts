import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { uniqueNamesGenerator, colors, adjectives, starWars, names } from 'unique-names-generator';
import { LoremIpsum } from 'lorem-ipsum';
import { Cosmetic, Pallete, User } from '../domain/models/index.js';
import { CosmeticFromDB, PalleteFromDB } from './types';
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

    for (let i = 0; i < 30; i++) {
        const palette = new Pallete({
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

    for (let i = 0; i < 10; i++) {
        const saved_cosmetics: CosmeticFromDB[] = await Cosmetic.aggregate([
            { $sample: { size: 5 } },
        ]);
        const saved_palletes: PalleteFromDB[] = await Pallete.aggregate([
            {
                $sample: { size: 2 },
            },
        ]);

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
            saved_palletes: saved_palletes,
        });
        await user
            .save()
            .then(v => console.log(v))
            .catch(err => console.log(err));
    }
    await mongoose.connection.close();
})();

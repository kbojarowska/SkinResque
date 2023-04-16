import types from './types';

export const cosmeticsReducer = (state = [
    {
//     "_id": 1,
//     "name": "rosemary cream",
//     "description": "Dry",
//     "recipe": "Combine all ingredients. Apply to face and let dry before rinsing. The powerful ingredients make this a multi-tasking wonder-cream: Sour cream is a form of lactic acid that hydrates as it gently exfoliates; honey is a humectant that also boosts hydration while the protein in the egg white tightens and firms skin.",
//     "ingredients": ["1 tablespoon cocoa powder", "1 tablespoon sour cream", "1 egg white"],
//     'photo': '/images/cream.png',
// },
// {
//     "_id": 2,
//     "name": "coconut balm",
//     "description": "Dry",
//     "recipe": "Heat 2 to 3 cups whole milk (enough to completely submerge both hands) in the microwave until it's warm. Pour into a bowl and let hands soak for five to 10 minutes, allowing the fat from the milk to hydrate, and vitamins A and E to nourish dry skin.",
//     "ingredients": ["2-3 cups whole milk"],
//     'photo': '/images/pink-cream.png',
},
], action) => {
    switch(action.type){
        case types.GET_COSMETICS_LIST_SUCCESS:
            return [...action.payload];
        case types.GET_COSMETICS_LIST_FAILURE:
            return alert("error in getting cosmetics list")
        default:
            return state;
    }
}

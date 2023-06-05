export const getCosmetics = (state) => state.cosmetics;

export const getCosmetic = (state, cosmeticId) => {return state.cosmetics.find(cosmetic => cosmetic._id === cosmeticId)}


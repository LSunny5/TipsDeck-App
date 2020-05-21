//Find all tips related to the Category
export const getTips = (tips = [], categoryId) => (
    (!categoryId)
        ? tips
        : tips.filter(tip => tip.category_id === categoryId)
);

//find the tip from tip id
export const findTip = (tips = [], tipId) => 
    tips.find(tip => tip.id === parseInt(tipId));

//get Category name from id
export const getCategoryName = (categories = [], catId) =>
    categories.find(cat => cat.id === catId);

//get Category id from name
export const getCategoryId = (categories = [], catName) =>
    categories.find(cat => cat.category === catName);

//shuffle an array tips
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
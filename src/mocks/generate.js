const candidates = [...new Array(100)].map((_, index) => ({
  id: "Candidate " + ("000" + (index + 1)).slice(-4),
  score: Math.random(),
  ingredientAmounts: [
    {
      ingredient: "baking soda",
      amount: Math.round(Math.random() * 4),
      units: "tbsp",
    },
    {
      ingredient: "flour",
      amount: Math.round(Math.random() * 4),
      units: "cup",
    },
    {
      ingredient: "sugar",
      amount: Math.round(Math.random() * 4),
      units: "tbsp",
    },
  ],
}));

export default candidates;

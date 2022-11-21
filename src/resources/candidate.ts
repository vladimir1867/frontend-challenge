export interface IngredientAmount {
  ingredient: string;
  amount: number;
  units?: string;
}

export interface Candidate {
  id: string;
  score: number;
  ingredientAmounts: IngredientAmount[];
  selected?: boolean;
}

export const isCandidateSelected = (candidate: Candidate) => candidate.selected;

export const getCandidateId = (candidate: Candidate) => candidate.id;
export const getCandidateScore = (candidate: Candidate) => candidate.score;

export const getIngredientAmount =
  (ingredient: string) => (candidate: Candidate) =>
    candidate.ingredientAmounts.find(
      (ingredientAmount) => ingredientAmount.ingredient === ingredient
    );

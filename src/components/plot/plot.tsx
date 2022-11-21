import { useCallback, useMemo } from "react";

import {
  Candidate,
  getCandidateId,
  getCandidateScore,
  getIngredientAmount,
} from "../../resources/candidate";

import styles from "./plot.module.css";
import Plotly from "./react-plotly";

function getLayout(
  ingredient: string,
  candidates: Candidate[]
): Partial<Plotly.Layout> {
  // extract a set of unique units from the candidate ingredients
  const units = [
    ...new Set(
      candidates
        .map(getIngredientAmount(ingredient))
        .map((ingredientAmount) => ingredientAmount?.units)
        .filter(Boolean) as string[]
    ).values(),
  ];

  return {
    hoverlabel: {
      bgcolor: "#fff",
      bordercolor: "#048",
    },
    margin: {
      b: 80,
      t: 40,
      l: 80,
      r: 40,
    },
    paper_bgcolor: "transparent",
    showlegend: false,
    xaxis: {
      // if all ingredients share the same units, display them
      title: `${ingredient}${units.length === 1 ? ` (${units[0]})` : ""}`,
    },
    yaxis: {
      title: "Score",
    },
  };
}

function getIngredientTrace(ingredient: string) {
  const getCandidateAmount = getAmount(ingredient);

  return function getCandidateTrace(
    candidates: Candidate[]
  ): Partial<Plotly.PlotData> {
    return {
      type: "scatter" as const,
      mode: "markers" as const,
      hovertemplate: "%{text}<extra></extra>",
      text: candidates.map(getCandidateId),
      x: candidates.map(getCandidateAmount),
      y: candidates.map(getCandidateScore),
    };
  };
}

function getAmount(ingredient: string) {
  const getCandidateIngredientAmount = getIngredientAmount(ingredient);

  return function getCandidateAmount(candidate: Candidate) {
    return getCandidateIngredientAmount(candidate)?.amount ?? NaN;
  };
}

export function Plot({
  candidates,
  ingredient,
  maxSelections,
  onSelect,
}: {
  candidates: Candidate[];
  ingredient: string;
  maxSelections?: number;
  onSelect?: (id: string) => void;
}) {
  const layout = useMemo(
    () => getLayout(ingredient, candidates),
    [ingredient, candidates]
  );

  const selectedCandidates = useMemo(
    () => candidates.filter((candidate) => candidate.selected),
    [candidates]
  );

  const data: Partial<Plotly.PlotData>[] = useMemo(() => {
    const unselectedCandidates = candidates.filter(
      (candidate) => !candidate.selected
    );

    const getCandidateTrace = getIngredientTrace(ingredient);

    return [
      {
        ...getCandidateTrace(unselectedCandidates),
        marker: {
          color:
            maxSelections && selectedCandidates.length >= maxSelections
              ? "#ddd"
              : "#fff",
          size: 12,
          line: {
            color: "#048",
            width: 2,
          },
        },
      },
      {
        ...getCandidateTrace(selectedCandidates),
        marker: {
          color: "#048",
          size: 12,
          line: {
            color: "#048",
            width: 2,
          },
        },
      },
    ];
  }, [candidates, ingredient, maxSelections, selectedCandidates]);

  const onClick = useCallback(
    ({ points }: Plotly.PlotMouseEvent) => {
      if (onSelect) {
        const id = (points[0] as any).text;
        if (
          maxSelections &&
          selectedCandidates.length >= maxSelections &&
          !selectedCandidates.find((candidate) => candidate.id === id)
        ) {
          // max selections have already been made; cannot select another
          return;
        }

        onSelect(id);
      }
    },
    [onSelect, maxSelections, selectedCandidates]
  );

  return (
    <Plotly
      data={data}
      layout={layout}
      className={styles.plot}
      onClick={onClick}
    />
  );
}

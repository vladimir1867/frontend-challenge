import clsx from "clsx";
import React, { useCallback } from "react";

import type { Candidate } from "../../resources/candidate";

import styles from "./candidates.module.css";

export function Candidates({
  candidates,
  maxSelected,
  onSelect,
}: {
  candidates: Candidate[];
  maxSelected: boolean;
  onSelect: (id: string, selected?: boolean) => void;
}) {
  const handleSelectChange = useCallback(
    (e: any) => {
      onSelect(e.target.id, e.target.checked);
    },
    [onSelect]
  );

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.candidatesTitle)}>Ranked Candidates</div>
      <div className={clsx(styles.listHeader)}>
        <div>Score</div>
        <div>Title</div>
      </div>
      <div className={clsx(styles.listContainer)}>
        {candidates.map((candidate, index) => (
          <div className={clsx(styles.candidateElement)} key={candidate.id}>
            <div>{Math.round(candidate.score * 10) / 10}</div>
            <div>Candidate {index + 1}</div>
            <input
              id={candidate.id}
              onChange={handleSelectChange}
              checked={candidate.selected ?? false}
              type="checkbox"
              disabled={!candidate.selected && maxSelected}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

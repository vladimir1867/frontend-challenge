import { useCallback, useMemo } from "react";

import styles from "./app.module.css";
import { Candidates } from "./components/candidates";
import { Container } from "./components/container";
import { Navbar } from "./components/navbar";
import { Plot } from "./components/plot";
import { useCandidates } from "./hooks/use-candidates";
import { Candidate } from "./resources/candidate";

export const MAX_SELECTIONS = 5;

export default function App() {
  const { candidates, updateCandidate, updateCandidates } = useCandidates();

  const maxSelected = useMemo(() => {
    if (candidates) {
      return (
        candidates.filter((candidate) => candidate.selected === true).length >=
        5
      );
    } else {
      return false;
    }
  }, [candidates]);

  const onSelect = useCallback(
    (id: string, selected?: boolean) => {
      const selectedCandidate: Candidate | undefined = candidates?.find(
        (candidate) => candidate.id === id
      );
      const updatedCandidates = candidates?.map((candidate) => {
        if (candidate.id === id) {
          return { ...candidate, selected: !candidate.selected };
        } else {
          return candidate;
        }
      });
      if (selectedCandidate) {
        updateCandidate({ ...selectedCandidate, selected });
        updateCandidates(updatedCandidates ?? []);
      }
    },
    [candidates, updateCandidate, updateCandidates]
  );

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* TODO: add list of selectable candidates here */}
        <Candidates
          maxSelected={maxSelected}
          onSelect={onSelect}
          candidates={candidates ?? []}
        />
        <Container title="Candidate Performance" className={styles.performance}>
          {candidates ? (
            <Plot
              ingredient="sugar"
              candidates={candidates}
              maxSelections={MAX_SELECTIONS}
              onSelect={onSelect}
            />
          ) : (
            "loading..."
          )}
        </Container>
      </main>
    </>
  );
}

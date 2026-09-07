import { watch } from "node:fs";
import { useCallback, useEffect, useState } from "react";
import { loadReferenceDirectory } from "./loader";
import { Diagnostic, ReferenceRecord } from "./model";

export function useReferenceData(referenceDirectory: string) {
  const [records, setRecords] = useState<ReferenceRecord[]>([]);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(
    async (showLoading = true) => {
      if (showLoading) setIsLoading(true);
      const result = await loadReferenceDirectory(referenceDirectory);
      setRecords(result.records);
      setDiagnostics(result.diagnostics);
      setIsLoading(false);
    },
    [referenceDirectory],
  );

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    let watcher: ReturnType<typeof watch> | undefined;
    try {
      watcher = watch(referenceDirectory, { recursive: true }, () => {
        clearTimeout(timer);
        timer = setTimeout(() => void reload(false), 150);
      });
    } catch {
      // Loading already surfaces unreadable-directory errors; live refresh is an optional enhancement.
    }
    return () => {
      clearTimeout(timer);
      watcher?.close();
    };
  }, [referenceDirectory, reload]);

  return { records, diagnostics, isLoading, reload };
}

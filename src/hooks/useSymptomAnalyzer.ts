/**
 * useSymptomAnalyzer Hook
 * Manages symptom analysis and medicine recommendations
 */

import { useState, useCallback } from 'react';
import { aiService } from '@/services/ai.service';
import {
  SymptomAnalysisRequest,
  SymptomAnalysisResponse,
  SymptomInput,
} from '@/types/ai.types';

interface UseSymptomAnalyzerReturn {
  symptoms: SymptomInput[];
  analysis: SymptomAnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
  commonSymptoms: string[];
  analysisHistory: SymptomAnalysisResponse[];
  addSymptom: (symptom: SymptomInput) => void;
  removeSymptom: (index: number) => void;
  updateSymptom: (index: number, symptom: SymptomInput) => void;
  analyze: (request?: Partial<SymptomAnalysisRequest>) => Promise<void>;
  loadCommonSymptoms: () => Promise<void>;
  loadHistory: () => Promise<void>;
  clear: () => void;
}

export function useSymptomAnalyzer(): UseSymptomAnalyzerReturn {
  const [symptoms, setSymptoms] = useState<SymptomInput[]>([]);
  const [analysis, setAnalysis] = useState<SymptomAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commonSymptoms, setCommonSymptoms] = useState<string[]>([]);
  const [analysisHistory, setAnalysisHistory] = useState<SymptomAnalysisResponse[]>([]);

  const addSymptom = useCallback((symptom: SymptomInput) => {
    setSymptoms((prev) => [...prev, symptom]);
  }, []);

  const removeSymptom = useCallback((index: number) => {
    setSymptoms((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateSymptom = useCallback((index: number, symptom: SymptomInput) => {
    setSymptoms((prev) => {
      const updated = [...prev];
      updated[index] = symptom;
      return updated;
    });
  }, []);

  const analyze = useCallback(
    async (additionalInfo?: Partial<SymptomAnalysisRequest>) => {
      if (symptoms.length === 0) {
        setError('Please add at least one symptom');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const request: SymptomAnalysisRequest = {
          symptoms,
          ...additionalInfo,
        };

        const result = await aiService.analyzeSymptoms(request);
        setAnalysis(result);

        // Track analysis
        await aiService.trackUsage('symptom_analysis', {
          symptomCount: symptoms.length,
          conditionsFound: result.potentialConditions.length,
          medicinesRecommended: result.medicineRecommendations.length,
          riskLevel: result.overallRisk,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed');
        setAnalysis(null);
      } finally {
        setIsLoading(false);
      }
    },
    [symptoms]
  );

  const loadCommonSymptoms = useCallback(async () => {
    try {
      const symptoms = await aiService.getCommonSymptoms();
      setCommonSymptoms(symptoms);
    } catch (err) {
      console.error('Error loading common symptoms:', err);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const history = await aiService.getAnalysisHistory(10);
      setAnalysisHistory(history);
    } catch (err) {
      console.error('Error loading analysis history:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setSymptoms([]);
    setAnalysis(null);
    setError(null);
  }, []);

  return {
    symptoms,
    analysis,
    isLoading,
    error,
    commonSymptoms,
    analysisHistory,
    addSymptom,
    removeSymptom,
    updateSymptom,
    analyze,
    loadCommonSymptoms,
    loadHistory,
    clear,
  };
}

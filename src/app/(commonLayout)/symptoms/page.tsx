'use client';

import React, { useState, useEffect } from 'react';
import { useSymptomAnalyzer } from '@/hooks/useSymptomAnalyzer';
import { Loader2, AlertCircle, Plus, X, Heart, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

export default function SymptomAnalyzerPage() {
  const [symptoms, setSymptomsLocal] = useState<Symptom[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [newSeverity, setNewSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [newDuration, setNewDuration] = useState('');
  const [displayCommonSymptoms, setDisplayCommonSymptoms] = useState(false);

  const {
    analysis,
    isLoading,
    error,
    commonSymptoms,
    analyze,
    loadCommonSymptoms,
    clear,
  } = useSymptomAnalyzer();

  useEffect(() => {
    loadCommonSymptoms();
  }, [loadCommonSymptoms]);

  const addSymptom = () => {
    if (!newSymptom.trim()) return;

    setSymptomsLocal((prev) => [
      ...prev,
      {
        name: newSymptom,
        severity: newSeverity,
        duration: newDuration,
      },
    ]);

    setNewSymptom('');
    setNewSeverity('moderate');
    setNewDuration('');
  };

  const removeSymptom = (index: number) => {
    setSymptomsLocal((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCommonSymptom = (symptom: string) => {
    if (!symptoms.find((s) => s.name.toLowerCase() === symptom.toLowerCase())) {
      setSymptomsLocal((prev) => [
        ...prev,
        { name: symptom, severity: 'moderate', duration: '' },
      ]);
    }
    setDisplayCommonSymptoms(false);
  };

  const handleAnalyze = async () => {
    if (symptoms.length === 0) return;

    // Convert local symptoms to the format expected by the hook
    await analyze({
      symptoms: symptoms.map((s) => ({
        symptom: s.name,
        severity: s.severity,
        duration: {
          value: parseInt(s.duration) || 1,
          unit: 'days' as const,
        },
      })),
    });
  };

  const handleClear = () => {
    setSymptomsLocal([]);
    clear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold">Health Analyzer</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Describe your symptoms and get AI-powered medicine recommendations
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-4 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              This tool provides information only. Always consult a doctor for medical advice.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                Add Symptoms
              </h2>

              {/* Add Symptom Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Symptom
                  </label>
                  <Input
                    placeholder="e.g., Headache, Fever, Cough..."
                    value={newSymptom}
                    onChange={(e) => setNewSymptom(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') addSymptom();
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                      Severity
                    </label>
                    <select
                      value={newSeverity}
                      onChange={(e) =>
                        setNewSeverity(e.target.value as 'mild' | 'moderate' | 'severe')
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                      Duration
                    </label>
                    <Input
                      placeholder="e.g., 2 days"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={addSymptom}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Symptom
                </Button>
              </div>

              {/* Current Symptoms */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                  Current Symptoms ({symptoms.length})
                </h3>

                {symptoms.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400 text-sm text-center py-4">
                    No symptoms added yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {symptoms.map((symptom, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 p-3 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {symptom.name}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs mr-2 ${
                                symptom.severity === 'mild'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : symptom.severity === 'moderate'
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              }`}
                            >
                              {symptom.severity}
                            </span>
                            {symptom.duration && <span>{symptom.duration}</span>}
                          </p>
                        </div>
                        <button
                          onClick={() => removeSymptom(idx)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            {/* Common Symptoms */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                Common Symptoms
              </h3>
              <div className="space-y-2">
                {commonSymptoms.slice(0, 5).map((symptom, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddCommonSymptom(symptom)}
                    className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
                  >
                    + {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || symptoms.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 h-10"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Symptoms'
                )}
              </Button>

              <Button
                onClick={handleClear}
                variant="outline"
                disabled={isLoading}
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {isLoading && <LoadingSpinner />}

        {error && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200">Analysis Error</h3>
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {analysis && (
          <div className="max-w-4xl mx-auto mt-8 space-y-6">
            {/* Risk Assessment */}
            <div
              className={`rounded-lg border p-6 ${
                analysis.overallRisk === 'high' || analysis.overallRisk === 'critical'
                  ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                  : analysis.overallRisk === 'medium'
                  ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900/50'
                  : 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">Overall Risk Assessment</h3>
              <p className={`text-sm font-medium capitalize`}>{analysis.overallRisk} Risk</p>
              {analysis.nextSteps && analysis.nextSteps.length > 0 && (
                <p className="text-sm mt-2">{analysis.nextSteps[0]}</p>
              )}
            </div>

            {/* Potential Conditions */}
            {analysis.potentialConditions && analysis.potentialConditions.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Potential Conditions</h3>
                <div className="space-y-3">
                  {analysis.potentialConditions.map((condition, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/10"
                    >
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {condition.condition}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Confidence: {condition.confidence}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medicine Recommendations */}
            {analysis.medicineRecommendations &&
              analysis.medicineRecommendations.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold mb-4">Recommended Medicines</h3>
                  <div className="grid gap-4">
                    {analysis.medicineRecommendations.map((med, idx) => (
                      <div
                        key={idx}
                        className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {med.name}
                          </p>
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                            {med.effectiveness}% effective
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <strong>Active Ingredient:</strong> {med.activeIngredient}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <strong>Suitability:</strong> {med.suitability}
                        </p>
                        {med.dosage && (
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Dosage: {med.dosage}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Important Notes */}
            {analysis.nextSteps && analysis.nextSteps.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
                  Important Notes
                </h3>
                <ul className="space-y-2">
                  {analysis.nextSteps.map((note, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2"
                    >
                      <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

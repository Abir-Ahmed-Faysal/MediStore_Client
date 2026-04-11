/**
 * AI Features Type Definitions
 * Covers Smart Search, Chatbot, and Symptom Analyzer
 */

// ==================== SMART SEARCH ====================

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  limit?: number;
}

export interface SearchFilters {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  brand?: string[];
}

export interface SearchResult {
  medicineId: string;
  name: string;
  description: string;
  relevanceScore: number;
  matchedFields: string[];
  image?: string;
  price?: number;
  rating?: number;
}

export interface SmartSearchResponse {
  query: string;
  results: SearchResult[];
  suggestions: SuggestionItem[];
  executionTime: number;
  totalResults: number;
}

export interface SuggestionItem {
  text: string;
  type: 'medicine' | 'symptom' | 'ingredient' | 'category';
  frequency?: number;
  trending?: boolean;
}

// ==================== CHATBOT ====================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  relatedMedicines?: RelatedMedicine[];
  metadata?: {
    hasWarning?: boolean;
    requiresAction?: boolean;
    medicineRecommendation?: boolean;
  };
}

export interface ChatContext {
  userId: string;
  conversationId: string;
  history: ChatMessage[];
  intent?: ChatIntent;
}

export type ChatIntent = 
  | 'search_medicine'
  | 'symptom_analysis'
  | 'side_effects'
  | 'alternatives'
  | 'usage_instructions'
  | 'general_question'
  | 'pricing'
  | 'availability'
  | 'store_info';

export interface ChatbotResponse {
  message: string;
  suggestions: string[];
  relatedMedicines?: RelatedMedicine[];
  actions?: ChatAction[];
  conversationId: string;
}

export interface ChatAction {
  type: 'view_medicine' | 'search' | 'book_consultation' | 'call_support' | 'seek_emergency';
  label: string;
  value: string;
}

export interface RelatedMedicine {
  medicineId: string;
  name: string;
  reason: string;
  image?: string;
  price?: number;
}

export interface ConversationHistory {
  conversationId: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  summary?: string;
}

// ==================== SYMPTOM ANALYZER ====================

export interface SymptomInput {
  symptom: string;
  severity: SeverityLevel;
  duration: DurationInfo;
  additionalInfo?: string;
}

export type SeverityLevel = 'mild' | 'moderate' | 'severe' | 'critical';

export interface DurationInfo {
  value: number;
  unit: 'hours' | 'days' | 'weeks' | 'months';
}

export interface SymptomAnalysisRequest {
  symptoms: SymptomInput[];
  age?: number;
  medicalHistory?: string[];
  currentMedications?: string[];
}

export interface PotentialCondition {
  condition: string;
  confidence: number; // 0-100
  description: string;
  commonTreatments: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface MedicineRecommendation {
  medicineId: string;
  name: string;
  activeIngredient: string;
  dosage: string;
  effectiveness: number; // 0-100
  commonSideEffects: string[];
  suitability: 'high' | 'medium' | 'low';
  price?: number;
  image?: string;
}

export interface SafetyWarning {
  type: 'critical' | 'warning' | 'info';
  message: string;
  action: 'consult_doctor' | 'seek_emergency' | 'contact_pharmacist' | 'none';
}

export interface SymptomAnalysisResponse {
  timestamp: Date;
  symptomsAnalyzed: SymptomInput[];
  potentialConditions: PotentialCondition[];
  medicineRecommendations: MedicineRecommendation[];
  warnings: SafetyWarning[];
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  nextSteps: string[];
  doctorConsultationNeeded: boolean;
}

// ==================== COMMON AI TYPES ====================

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  processing_time?: number;
}

export interface AIAnalytics {
  userId: string;
  action: 'search' | 'chat' | 'symptom_analysis';
  query?: string;
  resultsCount?: number;
  timeSpent?: number;
  userAction?: 'clicked' | 'purchased' | 'shared' | 'bookmarked';
  timestamp: Date;
}

export interface AISettings {
  enableAISearch: boolean;
  enableChatbot: boolean;
  enableSymptomAnalyzer: boolean;
  includeDisclaimer: boolean;
  language: 'en' | 'es' | 'fr' | 'de';
  responseStyle: 'concise' | 'detailed' | 'professional';
}

// ==================== MEDICAL DATA ====================

export interface MedicineInfo {
  id: string;
  name: string;
  genericName: string;
  activeIngredients: string[];
  dosages: string[];
  categories: string[];
  symptoms: string[];
  sideEffects: string[];
  contraindications: string[];
  interactions: string[];
  price: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
}

export interface HealthCondition {
  id: string;
  name: string;
  symptoms: string[];
  severity: SeverityLevel;
  commonMedicines: string[];
  requiresDoctor: boolean;
  emergencyIndicators: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  type: 'active' | 'inactive';
  purposes: string[];
  commonSideEffects: string[];
  interactions: string[];
}

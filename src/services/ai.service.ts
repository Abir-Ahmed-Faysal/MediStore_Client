/**
 * AI Services - Frontend API calls
 * Handles Smart Search, Chatbot, and Symptom Analyzer requests
 */

import axios, { AxiosInstance } from 'axios';
import {
  SmartSearchResponse,
  ChatbotResponse,
  SymptomAnalysisResponse,
  SymptomAnalysisRequest,
  SearchQuery,
  ChatContext,
  ConversationHistory,
} from '@/types/ai.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class AIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE,
      withCredentials: true,
    });
  }

  // ==================== SMART SEARCH ====================

  /**
   * Perform AI-powered smart search for medicines
   */
  async smartSearch(query: string, limit: number = 10): Promise<SmartSearchResponse> {
    try {
      const response = await this.client.post('/ai/search', {
        query,
        limit,
      });
      return response.data;
    } catch (error) {
      console.error('Smart search error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get search suggestions (Auto-complete)
   */
  async getSearchSuggestions(query: string): Promise<string[]> {
    try {
      const response = await this.client.get('/ai/search/suggestions', {
        params: { q: query },
      });
      return response.data.suggestions;
    } catch (error) {
      console.error('Search suggestions error:', error);
      return [];
    }
  }

  /**
   * Get trending searches
   */
  async getTrendingSearches(): Promise<string[]> {
    try {
      const response = await this.client.get('/ai/search/trending');
      return response.data.trending;
    } catch (error) {
      console.error('Trending searches error:', error);
      return [];
    }
  }

  // ==================== CHATBOT ====================

  /**
   * Send message to AI chatbot
   */
  async sendChatMessage(
    message: string,
    conversationId?: string
  ): Promise<ChatbotResponse> {
    try {
      const response = await this.client.post('/ai/chat', {
        message,
        conversationId,
      });
      return response.data;
    } catch (error) {
      console.error('Chat error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Stream chat response (Server-Sent Events)
   */
  async streamChatMessage(
    message: string,
    conversationId?: string
  ): Promise<ReadableStream> {
    const url = `${API_BASE}/ai/chat/stream`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });

    if (!response.ok) throw new Error('Stream error');
    return response.body!;
  }

  /**
   * Get chat history for user
   */
  async getChatHistory(limit: number = 50): Promise<ConversationHistory[]> {
    try {
      const response = await this.client.get('/ai/chat-history', {
        params: { limit },
      });
      return response.data.conversations;
    } catch (error) {
      console.error('Chat history error:', error);
      return [];
    }
  }

  /**
   * Get specific conversation
   */
  async getConversation(conversationId: string): Promise<ConversationHistory> {
    try {
      const response = await this.client.get(
        `/ai/chat/conversations/${conversationId}`
      );
      return response.data;
    } catch (error) {
      console.error('Get conversation error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Clear chat history
   */
  async clearChatHistory(): Promise<{ success: boolean }> {
    try {
      const response = await this.client.delete('/ai/chat-history');
      return response.data;
    } catch (error) {
      console.error('Clear chat history error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Save chat conversation
   */
  async saveConversation(
    conversationId: string,
    title: string
  ): Promise<{ success: boolean }> {
    try {
      const response = await this.client.post(
        `/ai/chat/conversations/${conversationId}/save`,
        { title }
      );
      return response.data;
    } catch (error) {
      console.error('Save conversation error:', error);
      throw this.handleError(error);
    }
  }

  // ==================== SYMPTOM ANALYZER ====================

  /**
   * Analyze symptoms and get medicine recommendations
   */
  async analyzeSymptoms(
    request: SymptomAnalysisRequest
  ): Promise<SymptomAnalysisResponse> {
    try {
      const response = await this.client.post('/ai/symptom-analyze', request);
      return response.data;
    } catch (error) {
      console.error('Symptom analysis error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get common symptoms for quick selection
   */
  async getCommonSymptoms(): Promise<string[]> {
    try {
      const response = await this.client.get('/ai/symptoms/common');
      return response.data.symptoms;
    } catch (error) {
      console.error('Common symptoms error:', error);
      return [];
    }
  }

  /**
   * Get symptom details
   */
  async getSymptomDetails(symptomName: string): Promise<any> {
    try {
      const response = await this.client.get(
        `/ai/symptoms/${encodeURIComponent(symptomName)}`
      );
      return response.data;
    } catch (error) {
      console.error('Symptom details error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get analysis history
   */
  async getAnalysisHistory(limit: number = 10): Promise<SymptomAnalysisResponse[]> {
    try {
      const response = await this.client.get('/ai/symptom-analyze/history', {
        params: { limit },
      });
      return response.data.analyses;
    } catch (error) {
      console.error('Analysis history error:', error);
      return [];
    }
  }

  // ==================== ANALYTICS ====================

  /**
   * Track AI feature usage
   */
  async trackUsage(
    action: 'search' | 'chat' | 'symptom_analysis',
    metadata: any = {}
  ): Promise<void> {
    try {
      await this.client.post('/ai/analytics', {
        action,
        metadata,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Analytics error:', error);
      // Silent fail for analytics
    }
  }

  // ==================== HEALTH CHECK ====================

  /**
   * Check if AI services are available
   */
  async healthCheck(): Promise<{
    available: boolean;
    search: boolean;
    chatbot: boolean;
    analyzer: boolean;
  }> {
    try {
      const response = await this.client.get('/ai/health');
      return response.data;
    } catch (error) {
      return {
        available: false,
        search: false,
        chatbot: false,
        analyzer: false,
      };
    }
  }

  // ==================== ERROR HANDLING ====================

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return new Error('An unexpected error occurred');
  }
}

// Export singleton instance
export const aiService = new AIService();

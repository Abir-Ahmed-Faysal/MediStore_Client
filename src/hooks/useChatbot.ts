/**
 * useChatbot Hook
 * Manages AI health chatbot conversations, messages, and history
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { aiService } from '@/services/ai.service';
import { ChatMessage, ChatbotResponse } from '@/types/ai.types';

interface UseChatbotReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  conversationId: string | null;
  sendMessage: (message: string) => Promise<void>;
  streamMessage: (message: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  clearHistory: () => Promise<void>;
  resetChat: () => void;
}

export function useChatbot(): UseChatbotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messageCountRef = useRef(0);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await aiService.sendChatMessage(text, conversationId || undefined);

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        suggestions: response.suggestions,
        relatedMedicines: response.relatedMedicines,
        metadata: {
          hasWarning: response.actions?.some((a) => a.type === 'seek_emergency'),
          medicineRecommendation: !!response.relatedMedicines?.length,
        },
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationId(response.conversationId);
      messageCountRef.current++;

      // Track chat usage
      await aiService.trackUsage('chat', {
        messageCount: messageCountRef.current,
        messageLength: text.length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  const streamMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const stream = await aiService.streamChatMessage(
        text,
        conversationId || undefined
      );
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let streamContent = '';
      const streamMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, streamMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        streamContent += chunk;

        // Update content in real-time
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === 'assistant') {
            lastMsg.content = streamContent;
          }
          return updated;
        });
      }

      messageCountRef.current++;
      await aiService.trackUsage('chat', {
        messageCount: messageCountRef.current,
        streamedContent: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Stream failed');
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const history = await aiService.getChatHistory(50);
      
      if (history.length > 0) {
        const latestConversation = history[0];
        setConversationId(latestConversation.conversationId);
        setMessages(latestConversation.messages);
      }
    } catch (err) {
      console.error('Error loading chat history:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await aiService.clearChatHistory();
      setMessages([]);
      setConversationId(null);
      messageCountRef.current = 0;
    } catch (err) {
      setError('Failed to clear history');
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
    messageCountRef.current = 0;
  }, []);

  return {
    messages,
    isLoading,
    error,
    conversationId,
    sendMessage,
    streamMessage,
    loadHistory,
    clearHistory,
    resetChat,
  };
}

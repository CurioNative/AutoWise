'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { vehicleQuestionAnswering } from '@/ai/flows/vehicle-question-answering';
import { manageServiceAppointment } from '@/ai/flows/service-booking-management';
import { AutoWiseIcon } from './icons';
import { cn } from '@/lib/utils';
import { Loader2, Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hello! How can I help you with your vehicle today? You can ask questions or manage appointments (e.g., "schedule a service for tomorrow at 2pm").' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText: string;
      // Simple intent detection using keywords. A more robust solution could use a classification model.
      const isAppointmentRelated = ['schedule', 'cancel', 'reschedule', 'book', 'appointment'].some(keyword => input.toLowerCase().includes(keyword));

      if (isAppointmentRelated) {
        const result = await manageServiceAppointment({ userQuery: input });
        responseText = result.confirmationMessage;
      } else {
        const result = await vehicleQuestionAnswering({ question: input });
        responseText = result.answer;
      }

      const aiMessage: Message = { sender: 'ai', text: responseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage: Message = { sender: 'ai', text: "I'm sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={cn('flex items-start gap-3', message.sender === 'user' ? 'justify-end' : '')}>
              {message.sender === 'ai' && <div className="p-1 rounded-full bg-primary/10 "><AutoWiseIcon className="size-6 shrink-0 text-primary" /></div>}
              <div className={cn('max-w-sm rounded-lg p-3 text-sm shadow-sm', message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-primary/10 "><AutoWiseIcon className="size-6 shrink-0 text-primary" /></div>
                <div className="max-w-xs rounded-lg p-3 bg-muted flex items-center">
                    <Loader2 className="animate-spin size-4" />
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your vehicle..."
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading} size="icon" aria-label="Send message">
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
}

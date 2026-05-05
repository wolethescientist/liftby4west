"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";

export default function ChatPage() {
  const { chatMessages, driver, sendMessage } = useStore();
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!text) {
      return;
    }
    sendMessage(text, "user");
    setMessage("");
  }

  return (
    <div className="flex min-h-[calc(100vh-9rem)] flex-col gap-5">
      <Card className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">Driver</p>
          <h1 className="mt-1 text-xl font-black text-text">{driver.name}</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-bold text-success">
          <span className="h-2 w-2 rounded-full bg-success" />
          Online
        </div>
      </Card>

      <div className="flex-1 space-y-4">
        {chatMessages.map((item) => {
          const isUser = item.sender === "user";
          return (
            <div key={item.id} className={isUser ? "ml-auto max-w-[82%]" : "mr-auto max-w-[82%]"}>
              <div
                className={
                  isUser
                    ? "rounded-md bg-navy px-4 py-3 text-white"
                    : "rounded-md bg-subtle px-4 py-3 text-text"
                }
              >
                <p className="text-sm leading-6">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="sticky bottom-20 grid grid-cols-[1fr_auto] gap-3 bg-white py-3">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message your driver"
          className="h-12 rounded-md border border-border px-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
        />
        <Button type="submit" size="lg" aria-label="Send message">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

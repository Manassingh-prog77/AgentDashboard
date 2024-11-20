"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
interface Message {
    sender: string;
    text: string;
  }
interface ApiPayload {
    [key: string]: unknown; // Generic object to represent dynamic payloads
 }

export default function Layout() {
  const [activeTab, setActiveTab] = useState("Test Call");
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+1 123 456 7890");
  const [name, setName] = useState("");
  const id = useParams();

  const API_KEY = "key_caba942c1deb87e371563fadf38e";
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  // Helper function for API requests
  const apiRequest = async (url:string, payload: ApiPayload) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    } catch (error:unknown) {
      console.error(error);
      alert("An unexpected error occurred.");
      return null;
    }
  };

  // Test Call handler
  const handleTestCall = async () => {
    if (!name.trim() || !phoneNumber.trim()) {
      alert("Please provide both your name and phone number.");
      return;
    }

    const payload = {
      from_number: "+12137771234",
      to_number: phoneNumber,
      override_agent_id: "oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD",
      metadata: {},
      retell_llm_dynamic_variables: { customer_name: name },
    };

    const data = await apiRequest(
      "https://api.retellai.com/v2/create-phone-call",
      payload
    );

    if (data) {
      alert("Test Call initiated successfully!");
      console.log("Call Response:", data);
    }
  };

  // Test Chat handler
  const handleTestChat = async () => {
    if (!messageInput.trim()) {
      alert("Please type a message.");
      return;
    }

    const payload = {
      prompt: messageInput,
      user_name: name,
      agent_id: id.id
    };

    const data = await apiRequest(
      "https://api.retellai.com/v2/create-web-call",
      payload
    );

    if (data) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: messageInput },
        { sender: "bot", text: data.response || "No response from bot." },
      ]);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f4f9]">
      <div className="flex-shrink-0 w-full bg-white p-6 border-l border-gray-300 shadow-lg">
        <div className="flex justify-between mb-8">
          <Button
            variant={activeTab === "Test Call" ? "default" : "outline"}
            className={`w-1/2 rounded-md text-lg font-medium ${
              activeTab === "Test Call"
                ? "bg-[#6c63ff] text-white"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setActiveTab("Test Call")}
          >
            Test Call
          </Button>
          <Button
            variant={activeTab === "Test Chat" ? "default" : "outline"}
            className={`w-1/2 rounded-md text-lg font-medium ${
              activeTab === "Test Chat"
                ? "bg-[#6c63ff] text-white"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setActiveTab("Test Chat")}
          >
            Test Chat
          </Button>
        </div>

        {activeTab === "Test Call" ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Name
              </label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-gray-50 rounded-md border focus:ring-[#6c63ff]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Phone Number
              </label>
              <Input
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-12 bg-gray-50 rounded-md border focus:ring-[#6c63ff]"
              />
            </div>
            <Button
              onClick={handleTestCall}
              className="w-full bg-[#6c63ff] text-white text-lg font-medium h-12 rounded-md hover:bg-[#584ed9]"
            >
              Call Me
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-[80%]">
            <div className="flex-grow bg-gray-50 border rounded-md p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">
                  No messages yet. Start a conversation!
                </p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.sender === "user"
                        ? "self-end bg-[#6c63ff] text-white"
                        : "self-start bg-gray-200 text-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center mt-4">
              <Textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-grow bg-gray-50 rounded-md border focus:ring-[#6c63ff]"
              />
              <Button
                onClick={handleTestChat}
                className="ml-2 bg-[#6c63ff] text-white text-lg font-medium h-12 rounded-md hover:bg-[#584ed9]"
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

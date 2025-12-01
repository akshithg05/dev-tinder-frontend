import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Chat() {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([
    { text: "Hello world", from: "them" },
    { text: "Hi!", from: "me" },
  ]);

  //   useEffect(() => {

  //   }, []);

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-2xl border-gray-700 m-5 h-[75vh] flex flex-col bg-[#1e1e1e] shadow-lg">
      <h1 className="p-4 border-b border-gray-700 text-lg font-semibold text-gray-200">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#121212] text-gray-200">
        {messages?.map((msg, index) => {
          const isMe = msg.from === "me";
          return (
            <div
              key={index}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              <div
                className={`chat-bubble ${
                  isMe
                    ? "chat-bubble-primary text-white"
                    : "chat-bubble-secondary text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-[#1a1a1a]">
        <input
          className="flex-1 p-3 rounded-xl border border-gray-700 bg-[#2a2a2a] text-gray-200 focus:outline-none"
          placeholder="Type a message..."
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 active:scale-95 transition">
          Send
        </button>
      </div>
    </div>
  );
}

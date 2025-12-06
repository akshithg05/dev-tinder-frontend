import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default function Chat() {
  const { toUserId } = useParams();
  const user = useSelector((store) => store?.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const fetchChats = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/chat/${toUserId}`, {
        withCredentials: true,
      });

      const messages = res?.data?.data?.messages || [];

      const normalized = messages.map((msg) => {
        const isMe = msg.senderId._id === userId;

        return {
          text: msg.text,
          from: isMe ? "me" : "them",
          name: isMe
            ? "Me"
            : `${msg.senderId.firstName} ${msg.senderId.lastName}`,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderId: msg.senderId._id,
        };
      });

      setAllMessages(normalized);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (userId) fetchChats();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      toUserId,
    });

    socketRef.current.off("messageReceived");

    socketRef.current.on(
      "messageReceived",
      ({ firstName, userId: senderId, text }) => {
        if (senderId === userId) return;

        setAllMessages((prev) => [
          ...prev,
          {
            text,
            from: "them",
            name: firstName,
            time: getTime(),
          },
        ]);
      }
    );

    return () => {
      socketRef.current.off("messageReceived");
      socketRef.current.disconnect();
    };
  }, [userId, toUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  function sendMessage() {
    if (!message.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      toUserId,
      text: message,
    });

    setAllMessages((prev) => [
      ...prev,
      {
        text: message,
        from: "me",
        name: "Me",
        time: getTime(),
      },
    ]);

    setMessage("");
  }

  if (loading && !error) {
    return (
      <div className="grid place-items-center min-h-full">
        <span className="loading  loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!loading && error) {
    return (
      <div className="grid place-items-center min-h-full">
        <h1>Somehting went wrong!</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-2xl border-gray-700 m-5 h-[75vh] flex flex-col bg-[#1e1e1e] shadow-lg">
      <h1 className="p-4 border-b border-gray-700 text-lg font-semibold text-gray-200">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#121212] text-gray-200">
        {allMessages.map((msg, index) => {
          const isMe = msg.from === "me";

          return (
            <div
              key={index}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header">
                {msg.name}
                <time className="text-xs opacity-50 ml-2">{msg.time}</time>
              </div>

              <div
                className={`chat-bubble ${
                  isMe ? "chat-bubble-primary" : "chat-bubble-secondary"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      <form
        className="p-4 border-t border-gray-700 flex items-center gap-3 bg-[#1a1a1a]"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          className="flex-1 p-3 rounded-xl border border-gray-700 bg-[#2a2a2a] text-gray-200 focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 active:scale-95 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}

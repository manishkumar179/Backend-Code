import React from "react";
import {
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";

const ChatBox = ({ realMessage, message, sendMessage, setMessage, myId }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300 p-4">
      <div className="w-full max-w-md h-[600px] bg-white rounded-3xl shadow-2xl
       overflow-hidden border border-slate-200 flex flex-col">
        <div className="px-5 py-4 border-b bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=
                600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWF
                yY2h8Mnx8bW9kZWwlMjBtZW58ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2
               border-white rounded-full"></span>
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">MK</h2>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>

          <button>
            <EllipsisVerticalIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-2">
          {realMessage.map((value, index) => (
            <div
              key={index}
              className={`flex ${
                value.senderId === myId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                  value.senderId === myId
                    ? "bg-slate-900 text-white rounded-br-md"
                    : "bg-white text-slate-800 rounded-bl-md"
                }`}
              >
                <p>{value.message}</p>

                <p
                  className={`text-[10px] mt-1 ${
                    value.senderId === myId
                      ? "text-slate-300"
                      : "text-slate-400"
                  }`}
                >
                  {value.senderId === myId ? "You" : "Them"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />

            <button
              className=" active:scale-95 w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition"
              onClick={sendMessage}
            >
              <PaperAirplaneIcon className="w-5 h-5 text-white  rotate-[-45deg]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

import { useState } from "react";
import ChatPic from "../assets/chatPic.png";
import { FiPhone, FiMoreVertical } from "react-icons/fi";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({
    "Waldemar Mannering": [
      { sender: "support", text: "How can we help? We're here for you!", time: "1:15 PM" },
      { sender: "user", text: "Hey John, I am looking for the best admin template. Could you please help me to find it out?", time: "1:20 PM" },
    ],
    "Felecia Rower": [
      { sender: "user", text: "It’s perfect for my next project. How can I purchase it?", time: "1:36 PM" },
      { sender: "support", text: "Thanks. From our official site 😊", time: "1:45 PM" },
    ],
    "Calvin Moore": [
      { sender: "support", text: "If it takes long you can mail us.", time: "1:00 PM" },
    ],
  });

  const chats = [
    { name: "Waldemar Mannering", message: "Refer friends. Get rewards.", time: "1 Minute", active: true },
    { name: "Felecia Rower", message: "I will purchase it for sure. 👍", time: "8 Minutes", active: false },
    { name: "Calvin Moore", message: "If it takes long you can mail...", time: "1 Day", active: false },
  ];

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);

  const handleSendMessage = () => {
    if (message.trim() !== "" && currentChat) {
      const newMessage = {
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChat]: [...prevMessages[currentChat], newMessage],
      }));
      setMessage("");
    }
  };

  const handleChatClick = (chatName) => {
    setCurrentChat(chatName);
    setIsSidebarVisible(false); // Hide sidebar on mobile view
  };

  return (
    <div className="flex md:h-[68vh] h-[75vh] bg-gray-100 w-full shadow">
      {/* Chat Sidebar */}
      <div
        className={`lg:max-w-[360px] w-full bg-white border-r rounded-tl-[6px] rounded-bl-[6px] ${
          !isSidebarVisible ? "hidden lg:block" : ""
        }`}
      >
        <div className="flex h-[62px] p-4 text-[18px] font-medium text-[#7367F0] items-center">Chats</div>
        <ul>
          {chats.map((chat, index) => (
            <li
              key={index}
              className={`p-4 cursor-pointer ${
                currentChat === chat.name ? "bg-chat-person-back" : "bg-white hover:bg-blue-100"
              }`}
              onClick={() => handleChatClick(chat.name)}
            >
              <div className="flex items-center">
                <div className="rounded-full bg-gray-300 h-8 w-8 flex-shrink-0"></div>
                <div className="ml-4">
                  <p
                    className={`font-medium text-[15px] ${
                      currentChat === chat.name ? "text-white" : "text-[#4B465C]"
                    }`}
                  >
                    {chat.name}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      currentChat === chat.name ? "text-white" : "text-[#4B465C]"
                    }`}
                  >
                    {chat.message}
                  </p>
                </div>
                <span
                  className={`ml-auto text-[13px] ${
                    currentChat === chat.name ? "text-gray-400" : "text-[#4B465C]"
                  }`}
                >
                  {chat.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className={`flex flex-col w-full ${isSidebarVisible ? "hidden lg:flex" : ""}`}>
        {currentChat ? (
          <>
            {/* Topbar */}
            <div className="flex justify-between bg-[#FFFFFF] h-[62px] p-4 border-b rounded-tr-[6px] items-center shadow">
              <div className="flex">
                <button
                  className="lg:hidden text-blue-500 font-medium mr-4"
                  onClick={() => setIsSidebarVisible(true)} // Show sidebar on click (for small screens)
                >
                  Back
                </button>
                <img src={ChatPic} className="h-[38px] w-[38px] rounded-full max-sm:hidden" alt="Profile" />
                <div className="ml-4">
                  <p className="font-medium text-[15px] text-[#4B465C]">{currentChat}</p>
                  <p className="text-sm font-normal text-[#4B465C]">Next js developer</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <FiPhone className="h-5 w-5 cursor-pointer hover:text-gray-700 " />
                <FiMoreVertical className="h-5 w-5 cursor-pointer hover:text-gray-700" />
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto rounded-br-[6px]">
              {messages[currentChat].map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "support" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg h-[42px] ${
                      message.sender === "support"
                        ? "bg-[#123258] text-white text-[15px] shadow"
                        : "bg-[#FFFFFF] text-[#4B465C] text-[15px] shadow"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className="text-[13px] text-[#4B465C] mt-1">{message.time}</div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 border rounded-[6px] h-[48px] px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 text-[15px] shadow"
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 bg-[#123258] text-white px-4 py-2 rounded-[6px] hover:bg-[#123358] text-[15px] font-medium h-[48px] w-[88px]"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-gray-500">
            <p className="text-lg">No chat selected</p>
            <p className="text-sm">Please select a chat from the sidebar to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

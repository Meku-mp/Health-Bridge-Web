import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import ChatPic from "../assets/Sample_User_Icon.png";
import { FiPhone, FiMoreVertical } from "react-icons/fi";
import { app } from "../utilities/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctorData, setDoctorData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setDoctorData(userDoc.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch patient data from Firebase
    const fetchPatients = async () => {
      const receiptUploadRef = collection(db, "ReceiptUpload");
      const receiptQuery = query(
        receiptUploadRef,
        where("selectedDoctorName", "==", doctorData.name),
        where("status", "==", "1")
      );

      const receiptSnapshot = await getDocs(receiptQuery);
      const patientData = [];

      for (let docSnapshot of receiptSnapshot.docs) {
        const patientEmail = docSnapshot.data().email;

        // Now fetch the patient details from the "patients" collection based on the email
        const patientRef = query(
          collection(db, "patients"),
          where("email", "==", patientEmail)
        );

        const patientSnapshot = await getDocs(patientRef);
        patientSnapshot.forEach((patientDoc) => {
          patientData.push({
            id: patientDoc.id,
            ...patientDoc.data(),
            receiptImageUrl: docSnapshot.data().imageUrl, // Add the receipt image URL to the patient data
          });
        });
      }

      // Filter patients by status == "1" (Assuming status 1 means new or pending)
      const filteredPatients = patientData.filter(
        (patient) => patient.status === "2"
      );
      setPatients(patientData);
    };

    fetchPatients();
  }, [doctorData.name]);

  useEffect(() => {
    if (currentChat) {
      const messagesRef = collection(db, `chat`);
      const q = query(
        messagesRef,
        where("email", "==", currentChat.email),
        where("selectedDoctorName", "==", doctorData.name),
        orderBy("createdAt", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(chatMessages);
      });

      return () => unsubscribe();
    }
  }, [currentChat, doctorData.name]);

  const handleSendMessage = async () => {
    if (message.trim() !== "" && currentChat) {
      const newMessage = {
        text: message,
        sender: "doctor",
        email: currentChat.email,
        selectedDoctorName: doctorData.name,
        createdAt: new Date().toISOString(),
      };
      try {
        await addDoc(collection(db, `chat`), newMessage);
        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const handleChatClick = (patient) => {
    setCurrentChat(patient);
    setIsSidebarVisible(false); // Hide sidebar on mobile view
  };

  // console.log(doctorData);
  console.log(messages);

  return (
    <div className="flex md:h-[68vh] h-[75vh] bg-gray-100 w-full shadow">
      {/* Chat Sidebar */}
      <div
        className={`lg:max-w-[360px] w-full bg-white border-r rounded-tl-[6px] rounded-bl-[6px] ${
          !isSidebarVisible ? "hidden lg:block" : ""
        }`}
      >
        <div className="flex h-[62px] p-4 text-[18px] font-medium text-[#7367F0] items-center">
          Chats
        </div>
        <ul>
          {patients.map((patient) => (
            <li
              key={patient.id}
              className={`p-4 cursor-pointer ${
                currentChat?.id === patient.id
                  ? "bg-chat-person-back"
                  : "bg-white hover:bg-blue-100"
              }`}
              onClick={() => handleChatClick(patient)}
            >
              <div className="flex items-center">
                <img
                  src={patient.profilePicture || ChatPic}
                  className="h-[38px] w-[38px] rounded-full"
                />
                <div className="ml-4">
                  <p
                    className={`font-medium text-[15px] ${
                      currentChat?.id === patient.id
                        ? "text-white"
                        : "text-[#4B465C]"
                    }`}
                  >
                    {patient.username}
                  </p>
                  {/* <p
                    className={`text-sm truncate ${
                      currentChat?.id === patient.id
                        ? "text-white"
                        : "text-[#4B465C]"
                    }`}
                  >
                    {patient.lastMessage}
                  </p> */}
                </div>
                {/* <span
                  className={`ml-auto text-[13px] ${
                    currentChat?.id === patient.id
                      ? "text-gray-400"
                      : "text-[#4B465C]"
                  }`}
                >
                  {patient.lastMessageTime}
                </span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div
        className={`flex flex-col w-full ${
          isSidebarVisible ? "hidden lg:flex" : ""
        }`}
      >
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
                <img
                  src={ChatPic}
                  className="h-[38px] w-[38px] rounded-full max-sm:hidden"
                  alt="Profile"
                />
                <div className="ml-4">
                  <p className="font-medium text-[15px] text-[#4B465C]">
                    {currentChat.username}
                  </p>
                  <p className="text-sm font-normal text-[#4B465C]">Patient</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <FiPhone className="h-5 w-5 cursor-pointer hover:text-gray-700 " />
                <FiMoreVertical className="h-5 w-5 cursor-pointer hover:text-gray-700" />
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto rounded-br-[6px]">
              {messages.length > 0 &&
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.sender === "doctor" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg h-[42px] ${
                        message.sender === "doctor"
                          ? "bg-[#123258] text-white text-[15px] shadow"
                          : "bg-[#FFFFFF] text-[#4B465C] text-[15px] shadow"
                      }`}
                    >
                      {message.text}
                    </div>
                    <div className="text-[13px] text-[#4B465C] mt-1">
                      {message.createdAt?.toDate &&
                        message.createdAt.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </div>
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
            <p className="text-sm">
              Please select a chat from the sidebar to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

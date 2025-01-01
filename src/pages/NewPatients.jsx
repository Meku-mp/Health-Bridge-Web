import { useState, useEffect } from "react";
import CardImage from "../assets/Sample_User_Icon.png";
import Swal from "sweetalert2";
import { auth, db } from "../utilities/firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Modal component to show the receipt
import PropTypes from "prop-types";

const ReceiptModal = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg max-w-[90%] max-h-[90%] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Receipt</h2>
          <button
            onClick={onClose}
            className="text-red-600 text-lg font-semibold"
          >
            Close
          </button>
        </div>
        <img
          src={imageUrl}
          alt="Receipt"
          className="w-full h-auto rounded-md"
        />
      </div>
    </div>
  );
};

export default function NewPatients() {
  const [patients, setPatients] = useState([]);
  const [doctorData, setDoctorData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptImageUrl, setReceiptImageUrl] = useState("");

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

  // Fetch patient data from Firebase
  const fetchPatients = async () => {
    try {
      const receiptUploadRef = collection(db, "ReceiptUpload");
      const receiptQuery = query(
        receiptUploadRef,
        where("selectedDoctorName", "==", doctorData.name)
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
        (patient) => patient.status === "1"
      );
      setPatients(filteredPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    if (doctorData.name) {
      fetchPatients();
    }
  }, [doctorData]);

  // Function to handle Accept button click
  const handleAccept = (patientId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this patient!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDoc(doc(db, "patients", patientId), { status: "2" });
        Swal.fire("Accepted!", "The patient has been accepted.", "success");
        fetchPatients(); // Refresh patient list
      }
    });
  };

  // Function to handle Remove button click
  const handleRemove = (patientId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this patient!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDoc(doc(db, "patients", patientId), { status: "0" });
        Swal.fire("Removed!", "The patient has been removed.", "success");
      }
    });
  };

  // Function to handle the "View Receipt" button click
  const handleViewReceipt = (imageUrl) => {
    setReceiptImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setReceiptImageUrl(""); // Clear the image URL
  };

  return (
    <div className="flex md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center midxl:w-[75vw]">
      <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[50px] pb-[40px]">
        <span>New Patients</span>
      </div>

      {patients.length === 0 && (
        <div className="text-center text-gray-600">No new patients</div>
      )}

      <div className="space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex max-w-full p-5 bg-white border border-gray-300 rounded-lg shadow min-h-[144px] items-center justify-between max-sm:flex-col max-sm:items-center"
          >
            <div className="flex">
              <div className="flex p-5 items-center max-midxl:hidden">
                <img
                  src={CardImage}
                  alt="Patient"
                  className="rounded-md w-20 h-20"
                />
              </div>
              <div className="flex p-5 gap-3 flex-col justify-center max-sm:items-center">
                <div className="flex max-sm:items-center">
                  <span className="font-semibold text-lg text-gray-800">
                    {patient.username}
                  </span>
                </div>
                <div className="flex midxl:items-center gap-6 max-midxl:gap-4 justify-start max-midxl:flex-col max-sm:items-center">
                  <span className="font-medium text-sm text-gray-600">
                    Age: {patient.age}
                  </span>
                  <hr className="w-px h-3.5 bg-gray-600 max-midxl:hidden" />
                  <span className="font-medium text-sm text-gray-600">
                    {patient.email}
                  </span>
                  <hr className="w-px h-3.5 bg-gray-600 max-midxl:hidden" />
                  <span className="font-medium text-sm text-gray-600">
                    {patient.gender}
                  </span>
                  <hr className="w-px h-3.5 bg-gray-600 max-midxl:hidden" />
                  <span className="font-medium text-sm text-gray-600">
                    {patient.mobileNo}
                  </span>
                  <hr className="w-px h-3.5 bg-gray-600 max-midxl:hidden" />
                  <span className="font-medium text-sm text-gray-600">
                    Jun 12, 2021
                  </span>
                  <hr className="w-px h-3.5 bg-gray-600 max-midxl:hidden" />
                  <button
                    onClick={() => handleViewReceipt(patient.receiptImageUrl)}
                    className="font-semibold text-sm text-blue-700 w-24 h-6 bg-blue-200 rounded-md"
                  >
                    View Receipt
                  </button>
                </div>
                <div className="flex midxl:w-4/5">
                  <span className="font-normal text-xs text-gray-500 max-sm:text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 max-lg:flex-col max-sm:mt-3">
              <button
                onClick={() => handleAccept(patient.id)}
                className="text-base font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 w-24 h-12"
              >
                Accept
              </button>
              <button
                onClick={() => handleRemove(patient.id)}
                className="text-base font-semibold text-gray-700 bg-white rounded-lg hover:bg-gray-400 w-24 h-12 border"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying the receipt */}
      <ReceiptModal
        isOpen={isModalOpen}
        imageUrl={receiptImageUrl}
        onClose={closeModal}
      />
    </div>
  );
}

ReceiptModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

// import React from 'react'
import CardImage from "../assets/Sample_User_Icon.png";
// import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../utilities/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function YourPatients() {
  const [patients, setPatients] = useState([]);
  const [doctorData, setDoctorData] = useState({});
  const navigate = useNavigate();

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
        (patient) => patient.status === "2"
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

  return (
    <div className="flex md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center xl:w-[75vw]">
      <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[50px] pb-[40px] w-full">
        <span>Your Patients</span>
      </div>

      {patients.length === 0 && (
        <div className="text-center text-gray-600">No patients</div>
      )}

      <div className="space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex max-w-full bg-white border border-[#DBDADE] rounded-[6px] shadow min-h-[120px] items-center justify-between max-sm:flex-col max-sm:items-center"
          >
            <div className="flex">
              <div className="flex p-[20px] items-center max-lg:hidden">
                <img
                  src={CardImage}
                  alt="Patient"
                  className="rounded-[4px] w-[80px] h-[80px]"
                />
              </div>
              <div className="flex p-[20px] gap-[12px] flex-col justify-center">
                <div className="flex">
                  <span className="font-semibold text-[18px] text-[#101828]">
                    {patient.username}
                  </span>
                </div>
                <div className="flex midxl:items-center xl:gap-[24px] max-xl:gap-[16px] justify-start max-xl:flex-col max-sm:items-center">
                  <span className="font-medium text-[14px] text-[#475467]">
                    Age: {patient.age}
                  </span>
                  <hr className="w-[1px] h-[14px] bg-[#4B465C] max-xl:hidden" />
                  <span className="font-medium text-[14px] text-[#475467]">
                    {patient.gender}
                  </span>
                  <hr className="w-[1px] h-[14px] bg-[#4B465C] max-xl:hidden" />
                  <span className="font-medium text-[14px] text-[#475467]">
                    {patient.mobileNo}
                  </span>
                  <hr className="w-[1px] h-[14px] bg-[#4B465C] max-xl:hidden" />
                  <span className="font-medium text-[14px] text-[#475467]">
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-[8px] max-lg:flex-col max-sm:mt-3 p-[20px]">
              <button
                onClick={() => navigate(`/mypatient/${patient.id}`)}
                className="text-[16px] font-semibold text-white bg-[#123258] rounded-[8px] hover:bg-[#0d1e33] w-[137px] h-[48px]"
              >
                View Patient
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

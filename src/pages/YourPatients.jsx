// import React from 'react'
import CardImage from "../assets/Sample_User_Icon.png";
// import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../utilities/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

export default function YourPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user_email");

  // Fetch patient data from Firebase
  const fetchPatients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "patients")); // Adjust collection name if needed
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Filter patients by status
      const filteredPatients = data.filter((patient) => patient.status === "2");
      setPatients(filteredPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [userEmail]);

  return (
    <div className="flex md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center xl:w-[75vw]">
      <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[50px] pb-[40px] w-full">
        <span>Your Patients</span>
      </div>
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

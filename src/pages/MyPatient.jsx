// MyPatient.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardImage from "../assets/Sample_User_Icon.png";
import Swal from "sweetalert2";
import GraphButtonIcon from "../assets/graph-button-icons.png";
import GlucoseLevel from "../components/GlucoseLevel";
import InsulinTracking from "../components/InsulinTracking";
import Weight from "../components/Weight";
import Urination from "../components/Urination";
import Reports from "../components/Reports";
import SpecialNote from "../components/SpecialNote";
import { db } from "../utilities/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function MyPatient() {
  const { id } = useParams(); // Get patient ID from URL
  const [patient, setPatient] = useState(null);
  const [glucoseChartData, setGlucoseData] = useState([]);
  const [insulinChartData, setInsulinData] = useState([]);
  const [weightChartData, setWeightData] = useState([]);
  const [urinationChartData, setUrinationData] = useState([]);
  const [reportChartData, setReportData] = useState([]);
  const [specialNoteData, setSpecialNoteData] = useState([]);
  const [activeContent, setActiveContent] = useState("glucoseLevel");

  const showContent = (content) => {
    setActiveContent(content);
  };

  // Fetch specific patient data from Firebase
  const fetchPatient = async () => {
    try {
      const docRef = doc(db, "patients", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPatient({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("No such patient!");
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  // Generic function to fetch chart data
  const fetchChartData = async (collectionName, setData, patientEmail) => {
    try {
      const q = query(
        collection(db, collectionName),
        where("email", "==", patientEmail)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  useEffect(() => {
    if (patient && patient.email) {
      fetchChartData("GlucoseLevelChart", setGlucoseData, patient.email);
      fetchChartData("InsulinTrackingChart", setInsulinData, patient.email);
      fetchChartData("WeightChart", setWeightData, patient.email);
      fetchChartData("UrinationChart", setUrinationData, patient.email);
      fetchChartData("ReportUpload", setReportData, patient.email);
      fetchChartData("SpecialNote", setSpecialNoteData, patient.email);
    }
  }, [patient]);

  /* // Function to handle Call button click
  const handleCall = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to call this patient!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, call!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Called!", "The call has been initiated.", "success");
      }
    });
  };

  // Function to handle Message button click
  const handleMessage = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to send a message to this patient!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send message!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Sent!", "The message has been sent.", "success");
      }
    });
  }; */

  if (!patient) {
    return (
      <div className="flex h-full justify-center items-center md:ml-[300px] ml-[90px] mt-[100px]">
        <p>Loading patient data...</p>
      </div>
    );
  }

  console.log(glucoseChartData);
  console.log(insulinChartData);
  console.log(weightChartData);
  console.log(urinationChartData);

  return (
    <div className="flex h-full bg-[#F8F7FA] md:ml-[300px] ml-[90px] max-midxl:pr-[55px] max-md:pr-[32px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center xl:w-[75vw] ">
      <div className="text-[#4B465C] text-[26px] font-extrabold pr-8 md:pb-[50px] pb-[40px] w-full">
        <span>My Patient</span>
      </div>
      <div className="space-y-4">
        <div className="flex max-w-full bg-white border border-[#DBDADE] rounded-[6px] shadow min-h-[120px] items-center justify-between max-sm:flex-col max-sm:items-center">
          <div className="flex">
            <div className="flex p-[20px] items-center max-xl:hidden">
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
                  {patient.email}
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
          {/* <div className="flex gap-[8px] max-lg:flex-col max-sm:mt-3 p-[20px] ">
            <button
              onClick={handleCall}
              className="text-[16px] font-semibold text-[#123258] bg-[#18DF80] rounded-[8px] hover:bg-[#2fbc78] w-[102px] h-[48px]"
            >
              Call
            </button>
            <button
              onClick={handleMessage}
              className="text-[16px] font-semibold text-[#344054] bg-[#FFFFFF] rounded-[8px] hover:bg-[#8b8b8b] w-[102px] h-[48px] border-[1px]"
            >
              Message
            </button>
          </div> */}
        </div>
        <div className="flex mt-[50px] mb-[50px] flex-wrap max-lg:justify-center">
          {/* Buttons to switch content */}
          {[
            { label: "Glucose Level", value: "glucoseLevel" },
            { label: "Insulin Tracking", value: "insulinTracking" },
            { label: "Weight", value: "weight" },
            { label: "Urination", value: "urination" },
            { label: "Reports", value: "reports" },
            { label: "Special Note", value: "specialNote" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => showContent(btn.value)}
              className={`flex items-center justify-center w-[170px] h-[38px] rounded-[6px] gap-[8px] ${
                activeContent === btn.value
                  ? "bg-[#123258] text-white"
                  : "hover:bg-[#123258] hover:text-white"
              } active:bg-[#123258] active:text-[#FFFFFF]`}
            >
              <img
                src={GraphButtonIcon}
                alt="Graph-Button-Icon"
                className="w-[18px] h-[18px]"
              />
              <span className="text-[15px] text-[#A1A1AA] font-medium">
                {btn.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex w-full bg-white p-[30px] rounded-[10px] shadow min-h-[400px] justify-center max-sm:flex-col max-sm:items-center mb-[30px] ">
          {/* Pass filtered data as props to chart components */}
          {activeContent === "glucoseLevel" && (
            <GlucoseLevel data={glucoseChartData} />
          )}
          {activeContent === "insulinTracking" && (
            <InsulinTracking data={insulinChartData} />
          )}
          {activeContent === "weight" && <Weight data={weightChartData} />}
          {activeContent === "urination" && (
            <Urination data={urinationChartData} />
          )}
          {activeContent === "reports" && <Reports data={reportChartData} />}
          {activeContent === "specialNote" && (
            <SpecialNote data={specialNoteData} />
          )}
        </div>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";

export default function SpecialNote({ data }) {
  const processedData = data.map((item) => ({
    createdAt: item.date,
    note: item.note,
  }));

  return (
    <div className="flex flex-col w-full">
      {processedData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col max-w-full bg-white border p-[12px] border-[#EAECF0] rounded-[10px] shadow min-h-[90px] max-sm:flex-col "
        >
          <div className="text-[#101828] text-[11px] font-semibold mt-[-5px] pb-[3px]">
            {item.createdAt}
          </div>
          <div className="flex flex-col min-h-[30px] p-[10px] bg-[#F6F8FB] w-full text-[14px] font-semibold text-[#4C6780]">
            {item.note}
          </div>
        </div>
      ))}
    </div>
  );
}

SpecialNote.propTypes = {
  data: PropTypes.array.isRequired,
};

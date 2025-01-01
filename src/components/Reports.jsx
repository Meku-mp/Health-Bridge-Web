import PropTypes from "prop-types";

export default function Reports({ data }) {
  const processedData = data.map((item) => ({
    date: item.createdAt,
    image: item.imageUrl,
  }));

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-[160px] h-[175px] p-[12px] ga-[9px] rounded-[10px] shadow-md bg-[#F9FAFB] border-[#EAECF0]">
        {/* <img src={Xray} alt="Xray" className="max-w-[136px] max-h-[129px]" /> */}
        {processedData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col w-[160px] h-[175px] p-[12px] ga-[9px] rounded-[10px] shadow-md bg-[#F9FAFB] border-[#EAECF0] m-2"
          >
            <span>{item.date}</span>
            <img
              src={item.image}
              alt={`Report ${index}`}
              className="max-w-[136px] max-h-[129px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Reports.propTypes = {
  data: PropTypes.array.isRequired,
};

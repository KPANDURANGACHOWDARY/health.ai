"use client";
const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold mt-2 text-gray-800">{value}</p>
    </div>
  );
};

export default Card;
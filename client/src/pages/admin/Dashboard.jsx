import React, { useEffect, useState } from "react";
import { apiGetDashboard } from "../../apis";
import CustomChart from "../../components/chart/CustomChart";
import BoxInfo from "../../components/chart/BoxInfo";
import { formatMoney, formatPrice } from "../../utils/helper";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState();
  const [isMonth, setIsMonth] = useState(false);
  const [customTime, setCustomTime] = useState({
    from: "",
    to: "",
  });
  const fetchDataDashboard = async (params) => {
    const response = await apiGetDashboard(params);
    if (response.success) setData(response.data);
  };
  useEffect(() => {
    const type = isMonth ? "MTH" : "D";
    const params = { type };
    if (customTime.from) params.from = customTime.from;
    if (customTime.to) params.to = customTime.to;
    fetchDataDashboard(params);
  }, [isMonth, customTime]);
  const handleCustomTime = () => {
    setCustomTime({ from: "", to: "" });
  };
  const pieData = {
    labels: ["Total order pending", "Total order successful"],
    datasets: [
      {
        label: "Total",
        data: [
          data?.pieData?.find((el) => el?.status === "Pending")?.sum,
          data?.pieData?.find((el) => el?.status === "Succeed")?.sum,
          // data?.pieData?.find((el) => el?.status === "Processing")?.sum,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-[1256px] flex flex-col gap-4 bg-gray-50 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-6 border-b w-full bg-white flex items-center fixed top-0">
        <h1 className="text-xl text-[#374151] font-bold tracking-tight px-4">
          DASHBOARD
        </h1>
      </div>
      <div className="px-4 my-6 mx-4">
        <div className="grid grid-cols-4 gap-4">
          <BoxInfo
            text="Users"
            icon={<AiOutlineUserAdd size={22} />}
            number={data?.users[0]?.count}
            className="border-blue-500 text-white bg-blue-500"
          />
          <BoxInfo
            text="The amount has been paid"
            icon={<img src="/dong.svg" className="h-6 object-contain" />}
            number={
              data?.totalSuccess?.length > 0
                ? formatMoney(
                    formatPrice(
                      Math.round(data?.totalSuccess[0]?.count * 24230)
                    )
                  )
                : 0
            }
            className="border-green-500 text-white bg-green-500"
          />
          <BoxInfo
            text="Unpaid amount"
            icon={<img src="/dong.svg" className="h-6 object-contain" />}
            number={
              data?.totalFailed?.length > 0
                ? formatMoney(
                    formatPrice(Math.round(data?.totalFailed[0]?.count * 24230))
                  )
                : 0
            }
            className="border-orange-500 text-white bg-orange-500"
          />
          <BoxInfo
            text="Number of products sold"
            // icon={<img src="/dong.svg" className="h-6 object-contain" />}
            number={
              data?.soldQuantities?.length > 0
                ? data?.soldQuantities[0]?.count
                : 0
            }
            className="border-yellow-500 text-white bg-yellow-500"
          />
        </div>
        <div className="mt-6 grid grid-cols-10 gap-4">
          <div className="col-span-7 min-h-[500px] border flex flex-col gap-4 relative rounded-md flex-auto p-4">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-8">
                <span>{`Statistics of revenue by ${
                  isMonth ? "month" : "day"
                }`}</span>
                <div className="flex items-center font-thin gap-8">
                  <span className="flex items-center gap-2">
                    <label htmlFor="from">From</label>
                    <input
                      type="date"
                      value={customTime.from}
                      onChange={(e) =>
                        setCustomTime((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }))
                      }
                      id="from"
                    />
                  </span>
                  <span className="flex items-center gap-2">
                    <label htmlFor="from">To</label>
                    <input
                      type="date"
                      value={customTime.to}
                      onChange={(e) =>
                        setCustomTime((prev) => ({
                          ...prev,
                          to: e.target.value,
                        }))
                      }
                      id="to"
                    />
                  </span>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border-blue-500 text-blue-500 border`}
                    onClick={handleCustomTime}
                  >
                    Default
                  </button>
                </div>
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md border hover:border-main-blue ${
                    isMonth ? "" : "text-white font-semibold bg-main"
                  }`}
                  onClick={() => setIsMonth(false)}
                >
                  Day
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md border hover:border-main-blue ${
                    isMonth ? "text-white font-semibold bg-main" : ""
                  }`}
                  onClick={() => setIsMonth(true)}
                >
                  Month
                </button>
              </span>
            </div>
            {data?.chartData && (
              <CustomChart
                customTime={customTime}
                isMonth={isMonth}
                data={data?.chartData}
              />
            )}
          </div>
          <div className="col-span-3 rounded-md border p-4">
            <span className="font-bold gap-8">Order status</span>
            <div>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

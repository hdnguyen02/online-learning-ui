import { useState, useEffect } from "react";
import { fetchData, showToastError } from "../../global";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';

import { format, subMonths } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Statistics() {
  const [commonStatistics, setCommonStatistics] = useState();
  const [statisticsUsersDecks, setStatisticsUsersDecks] = useState();


  const [startDateStatisticDecksUsers, setStartDateStatisticDecksUsers] = useState(null);
  const [endDateStatisticDecksUsers, setEndDateStatisticDecksUsers] = useState(null);

  async function getCommonStatistics() {
    const subUrl = "/admin/common-statistics";
    try {
      const { data } = await fetchData(subUrl, "GET");
      setCommonStatistics(data);
    } catch ({ message }) {
      showToastError(message);
    }
  }


  useEffect(() => {
    getCommonStatistics();

    const currentDate = new Date();
    const sixMonthsAgo = subMonths(currentDate, 6); // 6 tháng trước

    // Định dạng ngày tháng thành định dạng 'yyyy-MM'
    setStartDateStatisticDecksUsers(format(sixMonthsAgo, 'yyyy-MM')); // Set startDateStatisticDecksUsers là 6 tháng trước
    setEndDateStatisticDecksUsers(format(currentDate, 'yyyy-MM')); 



  }, []);
  const fetchStatistics = async (start, end) => {
    if (!start || !end) return; // Kiểm tra xem start và end đã được chọn chưa

    const formattedStartDate = format(start, 'yyyy-MM');
    const formattedEndDate = format(end, 'yyyy-MM');

    const subUrl = `/admin/statistics-users-decks?startMonth=${formattedStartDate}&endMonth=${formattedEndDate}`;
    console.log(subUrl);
    try {
      const { data: rawData } = await fetchData(subUrl, 'GET');

      setStatisticsUsersDecks(rawData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (startDateStatisticDecksUsers && endDateStatisticDecksUsers) {
      fetchStatistics(startDateStatisticDecksUsers, endDateStatisticDecksUsers);
    }
  }, [startDateStatisticDecksUsers, endDateStatisticDecksUsers]);



  




  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-2xl py-10 px-10 xl:py-16 xl:px-20 bg-gray-50 dark:bg-[#2E3856] flex items-center justify-between flex-col gap-16 lg:flex-row"
          >
            <div className="w-full lg:w-60">
              <h2
                className="font-manrope text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center lg:text-left"
              >
                Our Stats
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200 leading-6 text-center lg:text-left">
                We help you to unleash the power within your business
              </p>
            </div>
            <div className="w-full lg:w-4/5">
              <div
                className="flex flex-col flex-1 gap-10 lg:gap-0 lg:flex-row lg:justify-between"
              >
                <div className="block">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityUsers}+
                  </div>
                  <span className="text-gray-900 dark:text-white text-center block lg:text-left">
                    Users
                  </span>
                </div>
                <div className="block">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityDecks}+
                  </div>
                  <span className="text-gray-900 dark:text-white text-center block lg:text-left">
                    Decks
                  </span>
                </div>
                <div className="block">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityGroups}+
                  </div>
                  <span className="text-gray-900 dark:text-white text-center block lg:text-left">
                    Groups
                  </span>
                </div>
                <div className="block">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityDecks}+
                  </div>
                  <span className="text-gray-900 dark:text-white text-center block lg:text-left">
                    Group card set
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="mt-12 flex items-center justify-between">
        <div className="flex flex-col gap-y-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Người dùng và bộ thẻ</span>

          {/* <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label> */}
          <div className="flex flex-col gap-y-3">
            <DatePicker
              selected={startDateStatisticDecksUsers}
              onChange={(date) => setStartDateStatisticDecksUsers(date)}
              selectsStart
              startDateStatisticDecksUsers={startDateStatisticDecksUsers}
              endDateStatisticDecksUsers={endDateStatisticDecksUsers}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText="MM/yyyy"
              className="dark:text-white dark:bg-[#2E3856] dark:border-none dark:outline-none dark:focus:outline-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <span>To</span>
            {/* Chọn ngày kết thúc */}

            {/* <label className="block text-sm font-medium mb-1">Ngày kết thúc</label> */}
            <DatePicker
              selected={endDateStatisticDecksUsers}
              onChange={(date) => setEndDateStatisticDecksUsers(date)}
              selectsEnd
              startDateStatisticDecksUsers={startDateStatisticDecksUsers}
              endDateStatisticDecksUsers={endDateStatisticDecksUsers}
              minDate={startDateStatisticDecksUsers} // Không cho phép chọn ngày kết thúc trước ngày bắt đầu
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText="MM/yyyy"
              className=" dark:text-white dark:bg-[#2E3856] dark:border-none dark:outline-none dark:focus:outline-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


        </div>

        <ResponsiveContainer height={450} width="80%">
  <LineChart
    data={statisticsUsersDecks}
    margin={{ top: 20, right: 50, left: 20, bottom: 40 }}
  >
    {/* Tắt các đường kẻ ngang và dọc */}
    <CartesianGrid horizontal={false} vertical={false} />
    <XAxis
      dataKey="month"
      tickFormatter={(tick) => format(new Date(tick), "MMMM")}
      interval={0}
      tickMargin={10} // Tạo khoảng cách giữa ticks và trục X
      tick={{
        fontSize: 12,
        angle: -45,
        textAnchor: "end",
        fill: "var(--color-x-axis)", // Sử dụng biến CSS động
      }}
    />
    <YAxis
      tick={{
        fontSize: 12,
        fill: "var(--color-y-axis)", // Sử dụng biến CSS động
      }}
    />
    <Tooltip
      contentStyle={{
        backgroundColor: "var(--tooltip-bg)", // Tùy chỉnh màu nền Tooltip
        color: "var(--tooltip-text)", // Tùy chỉnh màu chữ Tooltip
      }}
    />
    <Legend
      layout="horizontal" // Đặt Legend theo chiều ngang
      align="right" // Căn chỉnh sang bên phải
      verticalAlign="top" // Căn chỉnh ở phía trên của biểu đồ
      formatter={(value) => {
        if (value === "numberUsers") return "Total Users";
        if (value === "numberDecks") return "Total Decks";
        return value;
      }}
      wrapperStyle={{
        marginLeft: "20px",
        color: "var(--legend-text)", // Tùy chỉnh màu chữ Legend
      }}
    />
    <Line
      type="monotone"
      dataKey="numberUsers"
      stroke="#8884d8"
      activeDot={{ r: 8 }}
    />
    <Line type="monotone" dataKey="numberDecks" stroke="#82ca9d" />
  </LineChart>
</ResponsiveContainer>


      </div>







    </div>
  );
}

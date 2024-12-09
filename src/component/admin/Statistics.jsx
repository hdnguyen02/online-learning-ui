import { useState, useEffect } from "react";
import { fetchData, showToastError } from "../../global";
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';


import { format, subMonths } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Statistics() {
  const [commonStatistics, setCommonStatistics] = useState();
  const [statisticsUsersDecks, setStatisticsUsersDecks] = useState();
  const [statisticsDecksCards, setStatisticsDecksCards] = useState();



  const [startDateStatisticDecksUsers, setStartDateStatisticDecksUsers] = useState(null);
  const [endDateStatisticDecksUsers, setEndDateStatisticDecksUsers] = useState(null);


  const [startDateStatisticDecksCards, setStartDateStatisticDecksCards] = useState(null);
  const [endDateStatisticDecksCards, setEndDateStatisticDecksCards] = useState(null);

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
    getStatisticsLanguages();

    const currentDate = new Date();
    const sixMonthsAgo = subMonths(currentDate, 6); // 6 tháng trước


    setStartDateStatisticDecksUsers(format(sixMonthsAgo, 'yyyy-MM')); // Set startDateStatisticDecksUsers là 6 tháng trước
    setEndDateStatisticDecksUsers(format(currentDate, 'yyyy-MM'));


    setStartDateStatisticDecksCards(format(sixMonthsAgo, 'yyyy-MM')); // Set startDateStatisticDecksUsers là 6 tháng trước
    setEndDateStatisticDecksCards(format(currentDate, 'yyyy-MM'));



  }, []);
  const fetchStatistics = async (start, end) => {
    if (!start || !end) return; // Kiểm tra xem start và end đã được chọn chưa

    const formattedStartDate = format(start, 'yyyy-MM');
    const formattedEndDate = format(end, 'yyyy-MM');



    const subUrl = `/admin/statistics-users-decks?startMonth=${formattedStartDate}&endMonth=${formattedEndDate}`;
    try {
      const { data: rawData } = await fetchData(subUrl, 'GET');

      setStatisticsUsersDecks(rawData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchStatisticsDecksAndUsers = async (start, end) => {
    if (!start || !end) return; // Kiểm tra xem start và end đã được chọn chưa

    const formattedStartDate = format(start, 'yyyy-MM');
    const formattedEndDate = format(end, 'yyyy-MM');



    const subUrl = `/admin/statistics-decks-cards?startMonth=${formattedStartDate}&endMonth=${formattedEndDate}`;
    try {
      const { data: rawData } = await fetchData(subUrl, 'GET');


      const dict = rawData.map(item => ({
        month: format(new Date(item.month), 'MMMM yyyy'), // Chuyển 'month' thành kiểu Date trước khi format
        numberDecks: item.numberDecks,
        numberCards: item.numberCards
      }))
      console.log(dict);
      setStatisticsDecksCards(dict);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (startDateStatisticDecksUsers && endDateStatisticDecksUsers) {
      fetchStatistics(startDateStatisticDecksUsers, endDateStatisticDecksUsers);
    }
  }, [startDateStatisticDecksUsers, endDateStatisticDecksUsers]);


  useEffect(() => {
    if (startDateStatisticDecksCards && endDateStatisticDecksCards) {
      fetchStatisticsDecksAndUsers(startDateStatisticDecksCards, endDateStatisticDecksCards);
    }
  }, [startDateStatisticDecksCards, endDateStatisticDecksCards]);



  // Biểu đồ tròn ngôn ngữ
  const [statisticsLanguages, setStatisticsLanguages] = useState([]);

  async function getStatisticsLanguages() {
    try {
      const { data: rawData } = await fetchData('/admin/statistics-languages', 'GET');
      if (!rawData) return;
      setStatisticsLanguages(rawData);
    }
    catch (error) {
      console.log(error);
    }


  }


  const COLORS = ['#82ca9d', '#8884d8', '#ffc658'];



  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-2xl py-6 px-10 bg-gray-100 dark:bg-[#2E3856] flex items-center justify-between flex-col gap-16 lg:flex-row"
          >
            <div className="w-full lg:w-64">
              <h2
                className="font-manrope text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center lg:text-left"
              >
                Our Statistics
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200 leading-6 text-center lg:text-left">
                We help you to unleash the power within your business
              </p>
            </div>
            <div className="w-full lg:w-4/5">
              <div
                className="flex flex-col flex-1 gap-10 lg:gap-0 lg:flex-row lg:justify-between"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityUsers}
                  </div>
                  <span className="text-gray-900 dark:text-white text-center block lg:text-left">
                    Users
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityDecks}
                  </div>
                  <span className="text-gray-900 dark:text-white text-center block lg:text-left">
                    Decks
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityGroups}
                  </div>
                  <span className="text-gray-900 dark:text-white text-center block lg:text-left">
                    Groups
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="font-manrope font-bold text-4xl text-indigo-600 dark:text-orange-500 mb-3 text-center lg:text-left"
                  >
                    {commonStatistics?.quantityDecks}
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



      <div className="mt-12 mb-4 flex justify-between">
        <span className="text-xl font-bold text-gray-900 dark:text-white">Người dùng và bộ thẻ</span>

        {/* <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label> */}
        <div className="flex gap-x-3 items-center">
          <DatePicker
            selected={startDateStatisticDecksUsers}
            onChange={(date) => setStartDateStatisticDecksUsers(date)}
            selectsStart
            startDateStatisticDecksUsers={startDateStatisticDecksUsers}
            endDateStatisticDecksUsers={endDateStatisticDecksUsers}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="MM/yyyy"
            className="w-24 dark:text-white dark:bg-[#2E3856] dark:border-none dark:outline-none dark:focus:outline-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-24 dark:text-white dark:bg-[#2E3856] dark:border-none dark:outline-none dark:focus:outline-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


      </div>






      <ResponsiveContainer height={300} width="97%">

        <LineChart
          data={statisticsUsersDecks}
          margin={{ bottom: 40 }}
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

      {/* Biểu đồ vùng */}

      <div className="mt-12 mb-4">
        <span className="text-lg font-bold text-gray-900 dark:text-white">Bộ thẻ, thẻ và ngôn ngữ</span>
      </div>

      <div className="flex mr-7">
        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={statisticsDecksCards}>
            {/* Loại bỏ CartesianGrid để không hiển thị các đường gạch ngang, dọc */}
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="numberDecks" fill="#8884d8" />
            <Bar dataKey="numberCards" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>



        <ResponsiveContainer width="50%" height={300}>
          <AreaChart data={statisticsDecksCards}>
            {/* Loại bỏ CartesianGrid để không hiển thị các đường gạch ngang, dọc */}
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="numberDecks" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="numberCards" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>

      </div>


      {/* Biểu đồ tròn */}

      



        <div className="mt-12 flex">


        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={statisticsDecksCards}>
            {/* Loại bỏ CartesianGrid để không hiển thị các đường gạch ngang, dọc */}
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="numberDecks" fill="#8884d8" />
            <Bar dataKey="numberCards" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        
        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie
              data={statisticsLanguages}
              dataKey="count"
              nameKey="nameInternational"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {statisticsLanguages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>


      







      </div>
      










    </div>
  );
}

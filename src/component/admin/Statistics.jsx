import { useState, useEffect } from "react";
import { fetchData, showToastError, showToastMessage } from "../../global";
import Empty from "../Empty";
import { ToastContainer } from "react-toastify";
import { commonformatDistanceToNow } from "../../helper/common";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";

export default function Statistics() {
  const [revenues, setRevenues] = useState() 
  const [commonStatistics, setCommonStatistics] = useState()

  async function getStatistics() {
    const subUrl = "/admin/statistics";
    try {
      const { data } = await fetchData(subUrl, "GET");
      setRevenues(data);

    } catch ({ message }) {
      showToastError(message);
    }
  }

  async function getCommonStatistics() { 
    const subUrl = "/admin/common-statistics";
    try {
      const { data } = await fetchData(subUrl, "GET")
      setCommonStatistics(data)

    } catch ({ message }) {
      showToastError(message)
    }
  }

  useEffect(() => {
    getStatistics()
    getCommonStatistics()
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-10">
        <div className="flex gap-x-8 items-center h-12">
          <span className="font-medium uppercase text-sm">Statistics</span>
        </div>
      </div>

      <hr className="my-8"></hr>


        <div className="flex justify-between">
          <div className="w-44">
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="mb-2 text-lg font-medium tracking-tight text-gray-900 flex justify-between">
                <span>Users</span>
                <span>
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
              <p className="font-normal text-gray-700 text-xl">{commonStatistics?.quantityUsers}</p>
            </a>
          </div>
          <div className="w-44">
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="mb-2 text-lg font-medium tracking-tight text-gray-900 flex justify-between">
                <span>Groups</span>
                <span>
                <i class="fa-solid fa-users"></i>
                </span>
              </div>
              <p className="font-normal text-gray-700 text-xl">{commonStatistics?.quantityGroups}</p>
            </a>
          </div>
          <div className="w-44">
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="mb-2 text-lg font-medium tracking-tight text-gray-900 flex justify-between">
                <span>Decks</span>
                <span>
                <i class="fa-solid fa-folder"></i>
                </span>
              </div>
              <p className="font-normal text-gray-700 text-xl">{commonStatistics?.quantityDecks}</p>
            </a>
          </div>
          <div className="w-44">
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="mb-2 text-lg font-medium tracking-tight text-gray-900 flex justify-between">
                <span>Cards</span>
                <span>
                <i className="fa-solid fa-repeat"></i>
                </span>
              </div>
              <p className="font-normal text-gray-700 text-xl">{commonStatistics?.quantityCards}</p>
            </a>
          </div>
        </div>


      <ResponsiveContainer width="100%" height={400} className="mt-12">
            <BarChart
              data={revenues}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#8884d8"
                barSize={40} // Đặt kích thước cột ở đây
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>

      <ToastContainer />
    </div>
  );
}

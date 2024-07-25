import { useState } from "react";
import Logo from "./Logo";
import data from "../data/batches_data.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

function DataTable() {
  const [batchesData] = useState(data);
  const [filteredData, setFilteredData] = useState(batchesData);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(filteredData);

  return (
    <div className="relative bg-[#E2BBE9] min-h-screen min-w-full flex justify-center items-start">
      <div className="flex flex-col justify-start items-center gap-8 my-12">
        <h1 className="text-[#444B79] text-7xl font-bold text-center">
          Chai aur Code
        </h1>
        <div
          className="bg-[#F9F7F7] min-w-[1200px] min-h-[700px] flex flex-col gap-4 p-8 rounded-[18px] shadow-md
"
        >
          <h2 className="text-3xl font-semibold text-[#313131]">Batches</h2>
          <p className="text-[#4B4747]">
            Create learner’s batch and share information at the same time.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const filteredData = batchesData.filter((data) =>
                search === ""
                  ? data
                  : data?.title
                      .trim()
                      .toLowerCase()
                      .includes(search.trim().toLowerCase())
              );
              setFilteredData(filteredData);
            }}
            className="flex flex-row justify-start items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search by Title (alt+k or cmd+k)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-1 outline-none w-2/6 border border-[#BEBEBE] rounded"
            />
            <button
              type="submit"
              className="bg-[#6C6BAF] px-4 py-1 rounded text-white"
            >
              Search
            </button>
          </form>

          <table className="table-auto shadow-md border border-separate border-spacing-0 border-tools-table-outline rounded-lg mt-6">
            <thead>
              <tr className="bg-[#F2F2F2] text-left">
                <th className="border rounded-tl-lg border-[#7D7D7D] p-4">
                  Title
                </th>
                <th className="border border-[#7D7D7D] p-4">Start Date</th>
                <th className="border border-[#7D7D7D] p-4">End Date</th>
                <th className="border border-[#7D7D7D] p-4">Price</th>
                <th className="border border-[#7D7D7D] p-4">Validity/Expiry</th>
                <th className="border rounded-tr-lg border-[#7D7D7D] p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData
                .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
                .map((data, index) => (
                  <tr key={index} className="border border-[#7D7D7D]">
                    <td className="border border-y-transparent border-[#7D7D7D] p-4">
                      <div className="flex flex-row justify-start items-center gap-4">
                        <img
                          src={data.src}
                          alt={data.title}
                          className="w-[100px] h-[60px]"
                        />
                        <span className="w-3/4">{data.title}</span>
                      </div>
                    </td>
                    <td className="border border-y-transparent border-[#7D7D7D] p-4">
                      {data.startDate}
                    </td>
                    <td className="border border-y-transparent border-[#7D7D7D] p-4">
                      {data.endDate}
                    </td>
                    <td className="border border-y-transparent border-[#7D7D7D] p-4">
                      {data.price}
                    </td>
                    <td className="border border-y-transparent border-[#7D7D7D] p-4">
                      {data["validity/expiry"]}
                    </td>
                    <td className="border border-y-transparent border-[#7D7D7D] p-4">
                      <span
                        className={`rounded p-1 ${
                          data.status === "Published"
                            ? "bg-[#DEFFDE] border border-[#4ED04B]"
                            : "bg-[#F3F3F3] border border-[#A4A4A4]"
                        } text-center`}
                      >
                        {data.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex flex-row justify-end items-center w-full gap-2 px-4">
            <span className="text-[#4B4747]">Rows per page</span>

            <select
              className="p-1 border border-[#BEBEBE] rounded"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10} name="10">
                10
              </option>
              <option value={20} name="20">
                20
              </option>
              <option value={50} name="50">
                50
              </option>
              <option value={100} name="100">
                100
              </option>
            </select>

            <ChevronLeft
              className={`${
                page === 1
                  ? "pointer-events-none text-[#D6D6D6]"
                  : "cursor-pointer text-black"
              } h-10 w-10`}
              onClick={() => {
                setPage((prev) => {
                  if (prev > 0) {
                    return prev - 1;
                  }
                });
              }}
            />
            <ChevronRight
              className={`${
                page === Math.ceil(batchesData.length / rowsPerPage)
                  ? "pointer-events-none text-[#D6D6D6]"
                  : "cursor-pointer text-black"
              } h-10 w-10`}
              onClick={() => {
                setPage((prev) => {
                  if (prev <= Math.ceil(batchesData.length / rowsPerPage)) {
                    return prev + 1;
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
      <Logo />
    </div>
  );
}

export default DataTable;

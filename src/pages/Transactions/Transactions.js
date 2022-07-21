import moment from "moment";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Chip from "../../components/Chip/Chip";
import LoadingTransaction from "../../components/LoadingPulse/LoadingTransaction";
import TopNavbar from "../../components/Navbar/TopNavbar";
import useGetHistory from "../../hooks/UseGetHistory/useGetHistory";

const Transactions = () => {
  const [
    historyData,
    historyEmpty,
    initializeHistory,
    scroll,
    getHistory
  ] = useGetHistory();
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleFilter = (type) => {
    if (type === "all") {
      setFilter("all");
      getHistory("all");
    } else if (type === "tambah") {
      setFilter("tambah");
      getHistory("tambah");
    } else if (type === "ubah") {
      setFilter("ubah");
      getHistory("ubah");
    } else if (type === "join group") {
      setFilter("join group");
      getHistory("join group");
    } else if (type === "add group") {
      setFilter("add group");
      getHistory("add group");
    } else if (type === "attendance") {
      setFilter("attendance");
      getHistory("attendance");
    } else if (type === "approve group") {
      setFilter("approve group");
      getHistory("approve group");
    }
  };

  return (
    <>
      <div className="flex flex-col sticky top-0">
        <TopNavbar
          navbarColor={`bg-blue-500`}
          label={`Riwayat`}
          labelColor={`text-white`}
          back={true}
          navigateTo={-1}
        />
        <style>
          {`.scrollable::-webkit-scrollbar {
                display: none;
            }`}
        </style>
        <div className="flex items-center gap-2 px-4 overflow-x-auto scrollable mb-2 mt-4">
          <Chip
            text={"Semua"}
            enable={filter === "all"}
            handleClick={() => handleFilter("all")}
          />
          <Chip
            text={"Tambah"}
            enable={filter === "tambah"}
            handleClick={() => handleFilter("tambah")}
          />
          <Chip
            text={"Ubah"}
            enable={filter === "ubah"}
            handleClick={() => handleFilter("ubah")}
          />
          <Chip
            text={"Kehadiran"}
            enable={filter === "attendance"}
            handleClick={() => handleFilter("attendance")}
          />
          <Chip
            text={"Bergabung Grup"}
            enable={filter === "join group"}
            handleClick={() => handleFilter("join group")}
          />
          <Chip
            text={"Buat Grup"}
            enable={filter === "add group"}
            handleClick={() => handleFilter("add group")}
          />
          <Chip
            text={"Menyetujui Grup"}
            enable={filter === "approve group"}
            handleClick={() => handleFilter("approve group")}
          />
        </div>
      </div>
      {initializeHistory ? (
        <div className="px-4">
            <LoadingTransaction />
        </div>
      ) : (
        <div
          className="flex flex-col overflow-y-auto h-screen px-4"
          id="scrollableDiv"
        >
          {historyData === "noHistory" ? (
            <p className="flex items-center justify-center text-sm text-gray-500">
              -Belum Ada Riwayat-
            </p>
          ) : (
            <>
              <ul>
                <InfiniteScroll
                  className="flex flex-col gap-1"
                  dataLength={historyData.length}
                  next={() =>
                    scroll(
                      filter === "all"
                        ? "all"
                        : filter === "WFO"
                        ? "wfo"
                        : filter === "WFH"
                        ? "wfh"
                        : filter === "Cuti"
                        ? "cuti"
                        : ""
                    )
                  }
                  hasMore={!historyEmpty}
                  loader={
                    <div className="flex justify-center items-center p-1">
                      <svg
                        role="status"
                        className="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  }
                  scrollableTarget={"scrollableDiv"}
                >
                  {historyData.map((val, index) => (
                    <li
                      key={index}
                      className="bg-white rounded-lg dark:bg-slate-800 dark:border-gray-600"
                      onClick={() =>
                        navigate("/detail-transaction", { state: val })
                      }
                    >
                      <div className="px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {val.transaction === "attendance" && "🕖"}
                          {val.transaction === "join group" && "👥"}
                          {val.transaction === "add group" && "➕"}
                          {val.transaction === "approve group" && "✔️"}
                          {val.transaction === "not approve grup" && "❌"}
                          {val.transaction === "decline group" && "❌"}
                          <div className="flex flex-col dark:text-white">
                            {val.transaction === "attendance" && (
                              <p className="font-bold">Kehadiran</p>
                            )}
                            {val.transaction === "join group" && (
                              <p className="font-bold">Bergabung Grup</p>
                            )}
                            {val.transaction === "add group" && (
                              <p className="font-bold">Buat Grup</p>
                            )}
                            {val.transaction === "approve group" && (
                              <p className="font-bold">Menyetujui User</p>
                            )}
                            {val.transaction === "not approve grup" && (
                              <p className="font-bold">Ditolak Grup</p>
                            )}
                            {val.transaction === "decline group" && (
                              <p className="font-bold">Menolak </p>
                            )}
                            {val.transactionType === "add" && (
                              <div className="bg-blue-100 w-fit text-xs text-blue-500 rounded py-0.5 px-1 font-bold">
                                Tambah
                              </div>
                            )}
                            {val.transactionType === "update" && (
                              <div className="bg-orange-100 w-fit text-xs text-orange-500 rounded py-0.5 px-1 font-bold">
                                Ubah
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs dark:text-white">
                          {moment(val.date.seconds * 1000).format("DD/MM/YYYY")}{" "}
                        </p>
                      </div>
                    </li>
                  ))}
                </InfiniteScroll>
                <div className="h-64"></div>
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Transactions;

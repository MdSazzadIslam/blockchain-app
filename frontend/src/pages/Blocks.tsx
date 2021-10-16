import React, { useState, useEffect } from "react";
import BlockService from "../services/blockService";
import Loader from "../components/Loader";
import ListRow from "../components/ListRow";
import Pagination from "react-js-pagination";
import { IBlock } from "../models/blocks";
import Message from "../components/Message";
import "./Blocks.css";

interface IProps {}

const Blocks: React.FC<IProps> = () => {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setError] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState<number>(5);
  const [records, setRecords] = useState<IBlock[]>([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await BlockService.getBlocks();
      if (res.messages !== "Success") {
        setError(true);
      }
      setBlocks(res.data);
      setLoading(false);
      displayPagingData(res.data, pageNo);
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Logic for displaying pagination records
  const displayPagingData = (data: IBlock[], pageNo: number) => {
    debugger;
    const indexOfLastBlocks = pageNo * limit;
    const indexOfFirstBlocks = indexOfLastBlocks - limit;
    const currentBlocks = data.slice(indexOfFirstBlocks, indexOfLastBlocks);
    setRecords(currentBlocks);
  };

  if (err) {
    return <Message variant="danger">{"Something went wrong"}</Message>;
  }

  if (loading) {
    return <Loader />;
  }
  const handleChange = (pageNo: number) => {
    console.log(blocks);
    setPageNo(pageNo);
    displayPagingData(blocks, pageNo);
  };

  return (
    <div className="main-content">
      <div className="container mt-7">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>Action</th>
                      <th>SL</th>
                      <th>Hash</th>
                      <th>Heigh</th>
                      <th>time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ListRow blocks={records} />
                  </tbody>
                </table>

                <div className="container-fluid mb-2 mt-1 ">
                  <div className="row align-items-center">
                    <div className="col-md-4 col-sm-12"></div>
                    <div className="col-md-8 col-sm-12">
                      <div className="float-md-right">
                        <Pagination
                          activePage={pageNo}
                          itemsCountPerPage={limit}
                          totalItemsCount={blocks.length}
                          pageRangeDisplayed={pageRangeDisplayed}
                          onChange={handleChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right", marginBottom: "30px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;

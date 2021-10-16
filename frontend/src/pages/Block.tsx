import React, { useState, useEffect } from "react";
import BlockService from "../services/blockService";
import Loader from "../components/Loader";

import { IBlock } from "../models/blocks";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

import "./Blocks.css";

type IProps = {
  blocks: IBlock;
};
const Block: React.FC<IProps> = () => {
  const [block, setBlock] = useState<IBlock>();
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setError] = useState<boolean>(false);
  const [hash, setHash] = useState<string>("");

  const { id } = useParams() as any;

  useEffect(() => {
    try {
      setHash(id);
      setLoading(true);
      const fetchData = async () => {
        const res = await BlockService.getBlock(hash ? hash : id);
        if (res.messages !== "Success") {
          setError(true);
        }
        setBlock(res.data);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (err) {
    return <Message variant="danger">{"Something went wrong"}</Message>;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-content">
          <div className="container mt-7">
            <div className="row">
              <div className="col">
                <h3>Block {block?.height}</h3>
                <div className="card shadow">
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <tbody>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            Hash
                            <h6 style={{ textAlign: "right" }}>
                              {block?.hash}
                            </h6>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            Height
                            <h6 style={{ textAlign: "right" }}>
                              {block?.height}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Weight
                            <h6 style={{ textAlign: "right" }}>
                              {block?.weight} WU
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Bits
                            <h6 style={{ textAlign: "right" }}>
                              {block?.bits}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Merkle root
                            <h6 style={{ textAlign: "right" }}>
                              {block?.mrkl_root}
                            </h6>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            Previous Hash
                            <h6 style={{ textAlign: "right" }}>
                              {block?.prev_block}
                            </h6>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            Nonce
                            <div
                              style={{
                                textAlign: "right",
                                marginBottom: "30px",
                              }}
                            >
                              <h6>{block?.nonce}</h6>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Block;

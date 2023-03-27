import { useEffect, useState } from "react";
import Base from "../../Component/Base";
import Transaction from "./Transactions";

const AllTransaction = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
  }, []);
  const handleUserInfo = (data) => {
    setUserInfo(data);
  };
  return (
    <>
      <Base handleUserInfo={handleUserInfo} userDetails={userInfo} />

      <Transaction />
    </>
  );
};
export default AllTransaction;

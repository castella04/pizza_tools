import React, { useState } from "react";
import RadioButton from "./radiobutton";
import { Helmet } from "react-helmet-async";
import "../css/OperationManagement.css";
import { useLocation } from "react-router-dom";

function OperationManagement() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [storeName, setStoreName] = useState(searchParams.get("storeName"));
  const [carID, setCarID] = useState(searchParams.get("carID"));
  const [ODO, setODO] = useState("");
  const [light, setLight] = useState("1");
  const [checkLamp, setCheckLamp] = useState("1");
  const [fuel, setFuel] = useState("1");
  const [carStatus, setCarStatus] = useState("NA");
  const [driverName, setDriverName] = useState("");
  const [license, setLicense] = useState("");
  const [licenseBase64, setLicenseBase64] = useState("");
  const [isImgUploaded, setIsImgUploaded] = useState(false);

  // const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  // const [error, setError] = useState(null);

  const carIDByStoreName = {
    2584: ["2633", "2634", "2660", "車"],
    2601: ["2004", "2005", "2006", "車"],
  };

  const availableCarID = storeName ? carIDByStoreName[storeName] : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
    const formattedTime = currentTime
      .replace(/\//g, "-")
      .replace(/,/g, "")
      .replace(/\s/g, "-");

    const data = {
      storeName,
      carID,
      ODO,
      light,
      checkLamp,
      fuel,
      carStatus,
      driverName,
      licenseBase64,
      submitTime: formattedTime,
    };

    console.log("JSONデータ:", JSON.stringify(data, null, 2));

    // setLoading(true);
    setStatusMessage("送信中...");
    // setError(null);

    try {
      const response = await fetch("https://casteira.com:4160/omdata", {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatusMessage("送信が完了しました。お気をつけて！");
      } else {
        throw new Error("送信に失敗しました。もう一度やり直してください。");
      }
    } catch (error) {
      // setError(error.message);
      setStatusMessage("サーバーへの接続に失敗しました。");
    } finally {
      // setLoading(false);
    }
  };

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setLicense(URL.createObjectURL(file));
    setIsImgUploaded(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLicenseBase64(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div class="main-inner">
      <Helmet>
        <title>運行日誌デジタル - PizzaTools</title>
        <meta name="description" content="ここで運行日誌をつけられます" />
      </Helmet>
      <h1 class="page-title">運行日誌デジタル</h1>
      <div class="input_area">
        <form class="submit-form" onSubmit={handleSubmit}>
          <label class="storeName">
            店舗名:
            <select
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
                setCarID("");
              }}
              required
            >
              <option value="">選択してください</option>
              <option value="2584">飯塚楽市</option>
              <option value="2601">飯塚近大前</option>
            </select>
          </label>
          <br />

          <label id="carID">
            車両のナンバー:
            <select
              value={carID}
              onChange={(e) => setCarID(e.target.value)}
              disabled={!storeName}
              required
            >
              <option value="">選択してください</option>
              {availableCarID.map((ID, index) => (
                <option key={index} value={ID}>
                  {ID}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label id="ODO">
            総走行距離:
            <input
              type="number"
              value={ODO}
              onChange={(e) => setODO(e.target.value)}
              placeholder="入力"
              required
            />
            km
          </label>
          <br />

          <label id="light">
            ライトは点灯しますか？
            <RadioButton
              options={[
                { label: "はい", value: "1" },
                { label: "いいえ", value: "0" },
              ]}
              selectedValue={light}
              setSelectedValue={setLight}
            />
          </label>

          <label id="checkLamp">
            警告灯は点灯していませんか？
            <RadioButton
              options={[
                { label: "はい", value: "1" },
                { label: "いいえ", value: "0" },
              ]}
              selectedValue={checkLamp}
              setSelectedValue={setCheckLamp}
            />
          </label>

          <label id="fuel">
            燃料は十分ですか？
            <RadioButton
              options={[
                { label: "はい", value: "1" },
                { label: "いいえ", value: "0" },
              ]}
              selectedValue={fuel}
              setSelectedValue={setFuel}
            />
          </label>

          <label id="carStatus">
            車両の状態:
            <input
              type="text"
              value={carStatus}
              onChange={(e) => setCarStatus(e.target.value)}
              placeholder="何かあれば記入"
            />
          </label>
          <br />

          <label id="driverName">
            ドライバー名:
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="名前を入力"
              required
            />
          </label>
          <br />

          <label id="license">
            免許証の写真を撮影してください。
            <br />
            <label htmlFor="file-upload" className="license">
              写真を撮る
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/png, image/jpeg"
              capture="camera"
              onChange={handleInputImage}
              required
              style={{ display: "none" }}
            />
            <img
              class={isImgUploaded ? "img-preview true" : "img-preview"}
              src={license}
              alt="アップロードされた免許証"
              style={{ width: "150px", height: "200px" }}
            />
          </label>

          <br />

          <button id="submit_button" type="submit">
            送信
          </button>
        </form>
        <div class="request_status">
          {statusMessage && <p>{statusMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default OperationManagement;

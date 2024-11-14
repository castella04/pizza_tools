import React from "react";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
const Omexport = () => {
  const [storeName, setStoreName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSubmit = async () => {
    const data = {
      storeName,
      dateFrom,
      dateTo,
    };

    console.log("JSONデータ:", JSON.stringify(data, null, 2));

    try {
      const params = new URLSearchParams();
      params.append("data", JSON.stringify(data));
      const response = await fetch(
        "https://casteira.com:4160/omexport?${params.toString()}",
        {
          mode: "cors",
          method: "GET",
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        alert("ダウンロードに失敗しました。");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("サーバーへの接続に失敗しました");
    }
  };
  return (
    <div class="main-inner">
      <Helmet>
        <title>運行日誌出力 - PizzaTools</title>
        <meta name="description" content="運行日誌をダウンロードします" />
      </Helmet>
      <h1 class="page-title">運行日誌出力</h1>
      <div class="input_area">
        <form class="submit-form">
          <label class="storeName">
            店舗名:
            <select
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
                setDateFrom("");
                setDateTo("");
              }}
              required
            >
              <option value="">選択してください</option>
              <option value="2584">飯塚楽市</option>
              <option value="2601">飯塚近大前</option>
            </select>
          </label>
          <br />
          <label class="dateFrom">
            開始日時：
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>

          <br />
          <label class="dateTo">
            終了日時：
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
          <br />
          <button class="submit-button" onClick={handleSubmit}>
            出力
          </button>
        </form>
      </div>
    </div>
  );
};

export default Omexport;

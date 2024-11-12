import React, { useState } from 'react';
import RadioButton from './radiobutton';

function OperationManagement() {
    const [storeName, setStoreName] = useState('');
    const [carID, setCarID] = useState('');
    const [ODO, setODO] = useState('');
    const [light, setLight] = useState('');
    const [checkLamp, setCheckLamp] = useState('');
    const [fuel, setFuel] = useState('');
    const [carStatus, setCarStatus] = useState('');
    const [driverName, setDriverName] = useState('');
    const [license, setLicense] = useState('');
    const [licenseBase64, setLicenseBase64] = useState('');
    const [submitTime, setSubmitTime] = useState(null);
    

    const carIDByStoreName = {
        '2584': ['2633', '2634', '2660', '車'],
        '2601': ['2004', '2005', '2006', '車']
    };

    const availableCarID = storeName ? carIDByStoreName[storeName] : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTime = new Date().toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'});
        currentTime = currentTime.replace(/\//g, '-').replace(/,/g, '').replace(/\s/g, '-');
        setSubmitTime(currentTime);

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
            submitTime
        };

        console.log('JSONデータ:', JSON.stringify(data, null, 2));

         try {
            const response = await fetch('https://casteira.com:4160/omdata', {
                mode: "cors",
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('データが正常に送信されました');
            } else {
                alert('送信エラーが発生しました');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('サーバーへの接続に失敗しました');
        }
    }

    const handleInputImage = (e) => {
        const file = e.target.files[0];
        if(!file) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setLicenseBase64(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(file);


    }

    return (
        <div class="all-wrap">
            <form onSubmit={handleSubmit}>
                <label>
                    店舗名:
                    <select
                        value={storeName}
                        onChange={(e) => {
                            setStoreName(e.target.value);
                            setCarID('');
                        }}
                    >
                        <option value="">選択してください</option>
                        <option value="2584">飯塚楽市</option>
                        <option value="2601">飯塚近大前</option>
                    </select>
                </label>
                <br/>

                <label>
                    車両のナンバー:
                    <select value={carID} onChange={(e) => setCarID(e.target.value)}
                    disabled={!storeName}
                    >
                        <option value="">選択してください</option>
                        {availableCarID.map((ID, index) => (
                            <option key={index} value={ID}>{ID}</option>
                        ))}
                    </select>
                </label>
                <br/>

                <label>
                    総走行距離:
                    <input
                        type="text"
                        value={ODO}
                        onChange={(e) => setODO(e.target.value)}
                        placeholder='入力'
                    />
                    km
                </label>
                <br/>

                <label>
                    ライトは点灯しますか？
                    <RadioButton 
                        options={
                            [
                                {label: 'はい', value: '1'},
                                {label: 'いいえ', value: '0'}
                            ]
                        }
                        selectedValue={light}
                        setSelectedValue={setLight}    
                    />
                </label>

                <label>
                    警告灯は点灯していませんか？
                    <RadioButton 
                        options={
                            [
                                {label: 'はい', value: '1'},
                                {label: 'いいえ', value: '0'}
                            ]
                        }
                        selectedValue={checkLamp}
                        setSelectedValue={setCheckLamp}
                    />
                </label>

                <label>
                    燃料は十分ですか？
                    <RadioButton 
                        options={
                            [
                                {label: 'はい', value: '1'},
                                {label: 'いいえ', value: '0'}
                            ]
                        }
                        selectedValue={fuel}
                        setSelectedValue={setFuel}
                    />
                </label>

                <label>
                    車両の状態:
                    <input
                        type="text"
                        value={carStatus}
                        onChange={(e) => setCarStatus(e.target.value)}
                        placeholder='何かあれば記入'
                    />
                </label>
                <br/>

                <label>
                    ドライバー名:
                    <input
                        type="text"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder='名前を入力'
                    />
                </label>
                <br/>
                
                <label>
                    免許証の写真を撮影してください
                    <br/>
                    <input
                        type="file"
                        onChange={handleInputImage}
                    />
                </label>
                <br/>

                <button type="submit">送信</button>

            </form>
        </div>
    )
}

export default OperationManagement;
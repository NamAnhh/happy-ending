import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import queryString from "query-string";
import "./gaming.scss";

function Gaming() {
  const params = window.location.search;
  const [password, setPassword] = useState("");
  const [numberChoice, setNumberChoice] = useState(0);
  const [result, setResult] = useState([]);
  const [resultDisabled, setResultDisabled] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    if (params && params !== "") {
      const newParams = queryString.parse(params);
      const idParams = newParams.filter.replace("id=", "");
      setNumberChoice(Number(newParams?.numberChoice));
      setResult([...JSON.parse(newParams?.result)]);
      setId(idParams);

      const jsonDisabled = localStorage.getItem("disabled");
      if (jsonDisabled) {
        const parseDisabled = JSON.parse(jsonDisabled);
        if (parseDisabled.id !== idParams) {
          localStorage.removeItem("disabled");
          return;
        }
        setResultDisabled(parseDisabled);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (key, value) => {
    switch (key) {
      case "password": {
        setPassword(value);
        break;
      }
      case "numberChoice": {
        setNumberChoice(Number(value));
        let arrResult = [];
        for (let i = 0; i < Number(value); i++) {
          arrResult.push({});
        }
        setResult(arrResult);
        break;
      }
      default:
        break;
    }
  };

  const handleChangeQuest = (index, key, value) => {
    const resultClone = [...result];
    resultClone[index][key] = value;
    setResult(resultClone);
  };

  const renderSetQuestion = () => {
    return result.map((it, index) => {
      return (
        <div key={index}>
          <label>Quest: {index + 1}</label>
          <div style={{ display: "flex" }}>
            <input
              value={it?.quest1}
              onChange={(e) =>
                handleChangeQuest(index, "option1", e.target.value)
              }
            />
            <input
              value={it?.quest2}
              onChange={(e) =>
                handleChangeQuest(index, "option2", e.target.value)
              }
            />
          </div>
        </div>
      );
    });
  };

  const saveToParams = () => {
    const params = {
      id: uuidv4(),
      numberChoice,
      result: JSON.stringify(result),
    };
    window.location.replace(`?filter=${queryString.stringify(params)}`);
  };

  const handleDisabled = (index, optionIndex) => {
    if (!resultDisabled) {
      const data = {
        id,
        listDisabled: [{ index, optionIndex }],
      };
      localStorage.setItem("disabled", JSON.stringify(data));
      setResultDisabled(data);
      return;
    }
    if (
      resultDisabled.id === id &&
      resultDisabled.listDisabled.includes(index)
    ) {
      return;
    }

    const data = {
      id,
      listDisabled: [...resultDisabled.listDisabled, { index, optionIndex }],
    };
    localStorage.setItem("disabled", JSON.stringify(data));
    setResultDisabled(data);
  };

  const renderClassDisabled = (index, optionIndex) => {
    if (!resultDisabled) return "";
    const itemDisabled = resultDisabled.listDisabled.find(
      (it) => it.index === index
    );
    if (!itemDisabled) return "";
    if (itemDisabled.optionIndex === optionIndex) {
      return "gamingItemSelectItemDisabled gamingItemSelectItemDisabledChoosed";
    }
    return "gamingItemSelectItemDisabled";
  };

  const renderPlaceClient = () => {
    return result.map((it, index) => {
      return (
        <div className="gamingItem mb-28" key={it}>
          <label>Địa điểm ăn chơi {index + 1}</label>
          <div className="wrapGamingItemSelectItem">
            <div
              className={`gamingItemSelectItem ${renderClassDisabled(
                index,
                0
              )}`}
              onClick={() => handleDisabled(index, 0)}
            >
              <span>{it?.option1}</span>
            </div>
            <div
              className={`gamingItemSelectItem ${renderClassDisabled(
                index,
                1
              )}`}
              onClick={() => handleDisabled(index, 1)}
            >
              <span>{it?.option2}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="wrapGaming">
      {renderPlaceClient()}
      <div className="mb-28">
        <input
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>
      {password === "namanhdepzai" && (
        <>
          <div className="mb-28">
            <label>Số lượng chọn: </label>
            <input
              value={numberChoice}
              onChange={(e) => handleChange("numberChoice", e.target.value)}
            />
            {renderSetQuestion()}
          </div>
          <div>
            <button onClick={saveToParams}>Save To Params</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Gaming;

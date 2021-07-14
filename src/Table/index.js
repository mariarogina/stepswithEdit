import Form from "../Form";
import uuid from "react-uuid";
import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const pencil = <FontAwesomeIcon icon={faPencilAlt} />;
const close = <FontAwesomeIcon icon={faWindowClose} />;

const Table = () => {
  const [table, setTable] = useState([]);
  const [checkedLines, setCheckedLines] = useState([])

  const onAddRow = (form) => {
    let newTable = [];

    let exists = false;

    table.forEach((item) => {
      if (item.date === form.date) {
        exists = true;
      }
    });

    if (exists) {
      newTable = table.map((item) => {
        if (item.date === form.date) {
          item.km = parseInt(form.km) + parseInt(item.km);
        }
        return item;
      });
    } else {
      newTable = [
        ...table,
        {
          id: uuid(),
          date: form.date,
          km: form.km,
        },
      ];
    }

    newTable.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

    setTable(newTable);
  };

  const onDeleteRow = (id) => {
    const newTable = table.filter((item) => item.id !== id);

    setTable(newTable);
  };
  const handleCheckLine = useCallback((item, index) => {
    setCheckedLines(prevList => {
      if (prevList.find(item => item === index)) {
        return prevList.filter(f => f !== index)
      } else {
        return [...prevList, index]
      }
    })
  }, [])

  const onEditRow = (e) => {
    console.log(e);
  };

  return (
    <div style={{ width: "500px",  margin: "10px 60px" }}>
      <Form onAddRow={onAddRow} />
      <div
        className="table"
        style={{
          textAlign: "center",
          margin: "20px auto",
          borderRadius: "15px",
          height:"80vh"
        }}
      >
        <table >
          <thead>
            <tr className="row" style={{ border: "none" }}>
              <th
                scope="col"
                align="center"
                className="col"
                style={{ width: "120px" }}
              >
                Дата
              </th>
              <th
                scope="col"
                align="center"
                className="col"
                style={{ width: "120px" }}
              >
                Расстояние
              </th>
              <th
                scope="col"
                align="center"
                className="col"
                style={{ width: "120px" }}
              >
                Изменить
              </th>
              <th
                scope="col"
                align="center"
                className="col"
                style={{ width: "120px" }}
              >
                Удалить
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((item, index) => {
                    const isCheckedLine = checkedLines.includes(index)
              return <tr
                className="row"
                style={{ display: "flex", border: "none" }}
                key={item.id}
              >
              <th scope="row">{index}</th>
                <td className="col" style={{ width: "120px" }}>
                {isCheckedLine ? <input
                            type="text"
                            name={"date"}
                            defaultValue={moment(item.date).format("DD/MM/YYYY")}
                            onChange={(event) => onEditRow(event)}
                          /> : moment(item.date).format("DD/MM/YYYY")}
                  
                </td>
                <td className="col" style={{ width: "120px" }}>
                  {item.km} км
                </td>
                <td className="col" style={{ width: "120px" }}>
                  <button onClick={handleCheckLine(index)}>{pencil}</button>
                </td>
                <td className="col" style={{ width: "120px" }}>
                  <button onClick={() => onDeleteRow(item.id)}>{close}</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

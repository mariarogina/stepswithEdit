import Form from "../Form";
import uuid from "react-uuid";
import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const close = <FontAwesomeIcon icon={faWindowClose} />;
const pencil = <FontAwesomeIcon icon={faPencilAlt} />;

const Table = () => {
  const [table, setTable] = useState([]);
  const [checkedLines, setCheckedLines] = useState([]);

  const onAddRow = useCallback(
    (form) => {
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
    },
    [table, setTable]
  );

  const onDeleteRow = useCallback(
    (id) => {
      const newTable = table.filter((item) => item.id !== id);

      setTable(newTable);
    },
    [table, setTable]
  );

  const handleCheckLine = useCallback(
    (item) => {
      setCheckedLines((prevList) => {
        if (prevList.find((o) => o === item.id)) {
          return prevList.filter((f) => f !== item.id);
        } else {
          return [...prevList, item.id];
        }
      });
    },
    [setCheckedLines]
  );

  const onEditRow = useCallback((event, line) => {
    const newValue = event.target.value;
    const fieldName = event.target.name;
    setTable((oldList) => {
      return oldList.map((item, index) => {
        if (index === line) {
          return { ...item, [fieldName]: newValue };
        } else {
          return item;
        }
      });
    });
  }, []);

  return (
    <div>
      <Form onAddRow={onAddRow} />
      <div
        className="table"
        style={{
          textAlign: "center",
          margin: "10px 10px",
          borderRadius: "15px",
          height: "80vh",
          width: "600px",
        }}
      >
        <table>
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
              const isCheckedLine = checkedLines.includes(item.id);
              return (
                <tr
                  className="row table-tr"
                  key={item.id}
                  style={{
                    backgroundColor: isCheckedLine ? "yellow" : "transparent",
                    border: "none",
                  }}
                >
                  <th scope="row"></th>
                  <td className="col" style={{ width: "120px" }}>
                    {isCheckedLine ? (
                      <input
                        type="date"
                        name={"date"}
                        defaultValue={item.date}
                        onChange={(event) => onEditRow(event, index)}
                      />
                    ) : (
                      item.date
                    )}
                  </td>
                  <td className="col" style={{ width: "120px" }}>
                    {isCheckedLine ? (
                      <input
                        type="number"
                        name={"km"}
                        defaultValue={item.km}
                        onChange={(event) => onEditRow(event, index)}
                      />
                    ) : (
                      item.km
                    )}
                  </td>
                  <td className="col" style={{ width: "120px" }}>
                    <button onClick={() => handleCheckLine(item)}>
                      {pencil}
                    </button>
                  </td>
                  <td className="col" style={{ width: "120px" }}>
                    <button onClick={() => onDeleteRow(item.id)}>
                      {close}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const api = () => {
    axios
      .get("http://localhost:8080/detailser")
      .then((res) => {
        const sortedData = res.data.sort((a, b) => a.pid - b.pid);

        //Set sorted data to state
        setData(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // onload
  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Rid</th>
            <th>Pid</th>
            <th>Rdamt</th>
            <th>Rddate</th>
            <th>Lday</th>
            <th>Famt</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.rid}</td>
              <td>{item.pid}</td>
              <td>{item.rdamt}</td>
              <td>{item.rddate}</td>
              <td>{item.lday}</td>
              <td>{item.famt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { iLogger } from "data/instances";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

export default function Realtime() {
  const [newData, setNewData] = useState([]);
  const [logCounts, setLogCounts] = useState({
    info: 0,
    warning: 0,
    error: 0,
    debug: 0,
  });

  const colors = {
    info: "#36A2EB",
    warning: "#FFCE56",
    error: "#FF6384",
    debug: "#4BC0C0",
  };

  useEffect(() => {
    iLogger.connectToServer();

    const pushInData = (data) => {
      console.log(data)
      const parsedData =data;

      console.log(parsedData)
      setNewData((prevData) => [...prevData, parsedData]);

      // Update log counts
      setLogCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
        newCounts[parsedData.typeLog] = (newCounts[parsedData.typeLog] || 0) + 1;
        return newCounts;
      });
    };

    iLogger.listenLogs(pushInData);

    // Cleanup function to stop listening when the component unmounts
    return () => {
      iLogger.disconnectServer();
    };
  }, []);

  const chartData = {
    labels: ["Info", "Warning", "Error", "Debug"],
    datasets: [
      {
        data: [
          logCounts.info,
          logCounts.warning,
          logCounts.error,
          logCounts.debug,
        ],
        backgroundColor: [
          colors.info,
          colors.warning,
          colors.error,
          colors.debug,
        ],
        hoverBackgroundColor: [
          colors.info,
          colors.warning,
          colors.error,
          colors.debug,
        ],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disable the legend in the chart
      },
    },
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Realtime</CardTitle>
            </CardHeader>
            <CardBody>
              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}
              >
                <Table responsive style={{ overflowX: "hidden" }}>
                  <thead className="text-primary">
                    <tr>
                      <th>Tipo</th>
                      <th>Mensaje</th>
                      <th>Fecha</th>
                      <th>Host</th>
                      <th>Módulo</th>
                      <th>Protocolo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.typeLog}</td>
                        <td>{data.data}</td>
                        <td>{data.date}</td>
                        <td>{data.host}</td>
                        <td>{data.module}</td>
                        <td>{data.protocol}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Estadísticas de los Logs</CardTitle>
            </CardHeader>
            <CardBody style={{ height: "266px" }}>
              <Pie data={chartData} options={chartOptions} />
            </CardBody>
            <CardFooter>
              <div className="legend">
                <i className="fa fa-circle" style={{ color: colors.info }} /> Info{" "}
                <i className="fa fa-circle" style={{ color: colors.warning }} /> Warning{" "}
                <i className="fa fa-circle" style={{ color: colors.error }} /> Error{" "}
                <i className="fa fa-circle" style={{ color: colors.debug }} /> Debug
              </div>
              <hr />
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
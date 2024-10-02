import fetcho from "data/Fetcho";
import { URL_API } from "data/instances";
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

export default function Warnings() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const URL_WARNING = `${URL_API}/warnings`;

        const parsedData = await fetcho({ url: URL_WARNING, method: "GET" });

        const mappedData = parsedData.map((value) => {
          const obj = {
            type: value.log_tp,
            log: value.log_da,
            date: value.log_dt,
            host: value.log_ho,
            module: value.log_mo,
          };

          return obj;
        });

        console.log(mappedData);
        setData(mappedData);
      } catch (error) {
        console.error(`Ocurrio un error al buscar la data: ${error}`);
      }
    }

    getData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Warnings</CardTitle>
              </CardHeader>
              <CardBody>
                <div
                  className="table-responsive"
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <Table responsive style={{ overflowX: "hidden" }}>
                    <thead className="text-primary">
                      <tr>
                        <th>Tipo</th>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                        <th>Host</th>
                        <th>Modulo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((info) => {
                          return (
                            <tr>
                              <td>{info?.type}</td>
                              <td>{info?.log}</td>
                              <td>{info?.date}</td>
                              <td>{info?.host}</td>
                              <td>{info?.module}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

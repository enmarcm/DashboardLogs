import fetcho from "data/Fetcho";
import { URL_API } from "data/instances";
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Table,
  Col,
  Input,
} from "reactstrap";

function Day() {
  const [inputValue, setInputValue] = useState("");
  const [param, setParam] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!param) return;

    async function getData() {
      try {
        const URL_DAY = `${URL_API}/date/${param}`;

        const parsedData = await fetcho({ url: URL_DAY, method: "GET" });

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
  }, [param]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setParam(inputValue);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Ingresa la fecha</CardTitle>
              </CardHeader>
              <CardBody>
                <Input
                  type="date"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button color="primary" onClick={handleClick}>
                  Enviar
                </Button>
              </CardBody>
            </Card>
          </Col>

          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Fecha</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}>
                  <Table >
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
                        data.map((info, index) => (
                          <tr key={index}>
                            <td>{info?.type}</td>
                            <td>{info?.log}</td>
                            <td>{info?.date}</td>
                            <td>{info?.host}</td>
                            <td>{info?.module}</td>
                          </tr>
                        ))}
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

export default Day;
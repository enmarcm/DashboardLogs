import net from "net";

const configSocketDefault = {
  writable: true,
};

export default class LoggerClient {
  constructor({
    HOST_SERVER,
    PORT_SERVER,
    configSocket = configSocketDefault,
  }) {
    this.host = HOST_SERVER;
    this.port = PORT_SERVER;
    this.socketClient = new net.Socket(configSocket);
    this.isConnected = false;
    this.#connectToServer();
  }

  #connectToServer() {
    this.socketClient.connect(this.port, this.host, this.#connectPrivate);

    this.socketClient.on("error", this.#errorPrivate);

    this.socketClient.on("close", this.#closePrivate);
  }

  #connectPrivate = () => {
    console.log(`Conectado al servidor ${this.host}:${this.port}`);
    this.isConnected = true;
  };

  #errorPrivate = (err) => {
    console.error(`Error en la conexión: ${err.message}`);
    this.isConnected = false;
  };

  #closePrivate = () => {
    console.log(`Conexión cerrada con el servidor ${this.host}:${this.port}`);
    this.isConnected = false;
  };

  disconnectServer() {
    this.socketClient.end(() => {
      console.log(`Desconectado del servidor ${this.host}:${this.port}`);
      this.isConnected = false;
    });
  }

  listenLogs(callback) {
    if (!this.isConnected) {
      setTimeout(() => this.listenLogs(), 500);
      return;
    }

    console.log("Ahora yo escucho");
    this.socketClient.on("data", (data) => {
      const dataParsed = data.toString();

      console.log(`Mensaje recibido: ${dataParsed}`);

      callback(dataParsed)
      return dataParsed;
    });
  }

  log({ data, typeLog, module }) {
    if (!this.isConnected) {
      setTimeout(() => this.log({ data, typeLog, module }), 500);
      return;
    }

    try {
      const OBJ_PARSED = JSON.stringify({
        date: new Date().toISOString(),
        module,
        log: data,
        typeLog,
      });

      const stringSend = `init^${
        typeLog === "debug" ? "ns" : "sv"
      }^${OBJ_PARSED}^fin`;

      this.socketClient.write(stringSend);

      console.log(`Se envió la información al servidor: ${stringSend}`);
    } catch (error) {
      console.error(`No se logró enviar el LOG: ${error.message}`);
    }
  }
}

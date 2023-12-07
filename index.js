"use strict";

import express from "express";
const app = express();
import ping from "ping";
import fs from "fs/promises";
import pino from "pino";
import pinoLoki from "pino-loki";


const transport = pino.transport({
  target: 'pino-loki',
  options: {
    host: 'http://localhost:3331',
  }
});

const loggerToLoki = pino(transport)

const host = ["192.168.1.3", "www.google.com", "www.codecademy.com"];
const freq = 1000;

// Date Config variable
const tanggal = new Date().getDate();
const bulan = new Date().getMonth() + 1;
const tahun = new Date().getFullYear();
const jam = new Date().getHours();
const menit = new Date().getMinutes();
const detik = new Date().getSeconds();
const fullDate = `${tanggal}${bulan}${tahun}`;
const fullJam     = `${jam}:${menit}:${detik}`
const dir = `log/${tahun}/${bulan}`;


// PING config
const pingConfig = {
  packetSize: 32,
  timeout: 10
}

// PING Function
// host.forEach((host) => {
//   setInterval(() => {
//     // create dir if doesn't exist
//     fs.mkdir(`log/${tahun}/${bulan}`, { recursive: true }).catch(
//       console.error
//     );
//     ping.sys.probe(host, async (isAlive) => {
//       let info = isAlive
//         ? `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getUTCSeconds()} - Reply from ${host} Byte:${pingConfig.packetSize} : 🆙 \r\n`
//         : `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} Request Timed Out ❌ \r\n`;
    

//       // Write Data
//       const writeData = fs.writeFile(`${dir}/${new Date().getDate()}-${new Date().getMonth() +1 }-${new Date().getFullYear()}-${host}.log`, info, { flag: 'a'});
//     }, pingConfig);
//   }, freq);
// });

// PING Function
host.forEach((host) => {
  setInterval(() => {
    ping.sys.probe(host, async (isAlive) => {
      let alive = isAlive ?
      loggerToLoki.info({
        host: host,
        status: "UP",
        timestamp: new Date().getTime()
      }) :
      loggerToLoki.warn({
        host: host,
        status: "DOWN",
        timestamp: new Date().getTime()
      })
    })
  })
})

app.listen(3000, () => {
  console.info(`⚡️[server] running on localhost:3000`);
});

"use strict";

import express from "express";
const app = express();
import ping from "ping";
import fs from "fs/promises";
import { createWriteStream } from "fs";


const host = ["192.168.1.3", "www.google.com", "www.codecademy.com"];
const freq = 1000;

const tanggal = new Date().getDate();
const bulan = new Date().getMonth() + 1;
const tahun = new Date().getFullYear();
const jam = new Date().getHours();
const menit = new Date().getMinutes();
const detik = new Date().getSeconds();
const fullDate = `${tanggal}${bulan}${tahun}`;
// const fullJam     = `${jam}:${menit}:${detik}`
const dir = `log/${tahun}/${bulan}`;

host.forEach((host) => {
  setInterval(() => {
    // create dir if doesn't exist
    fs.mkdir(`log/${tahun}/${bulan}`, { recursive: true }).catch(
      console.error
    );
    // fs.mkdir(`log/${tahun}/${new Date().getMonth()}`, {
    //   recursive: true,
    // }).catch(console.error);
    ping.sys.probe(host, async (isAlive) => {
      let info = isAlive
        ? `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getUTCSeconds()} - IP ${host} : 🆙 \r\n`
        : `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - IP ${host} ❌ \r\n`;
      // console.info(info)

      // Append file
      // const writeLog = await fs.appendFile(
      //   `${dir}/${bulan}-${tanggal}-${host}.log`,
      //   info
      // );

      // Write Data
      const writeData = fs.writeFile(`${dir}/${new Date().getDate()}-${new Date().getMonth() +1 }-${new Date().getFullYear()}-${host}.log`, info, { flag: 'a'});
    });
  }, freq);
});

app.listen(3000, () => {
  console.info(`⚡️[server] running on localhost:3000`);
});

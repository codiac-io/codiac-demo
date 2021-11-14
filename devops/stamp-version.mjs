import * as pkgConfig from "../package.json"
import * as srcConfig from '../src/app-config.json'
import * as distConfig from '../dist/app-config.json'
import fs from 'fs';

class StampVersion {
  constructor() { }

  go() {
    let pkg = Object.assign({}, pkgConfig.default);
    let src = Object.assign({}, srcConfig.default);
    let dist = Object.assign({}, distConfig.default);

    src.version = pkg.version;
    const writeStream1 = fs.createWriteStream('./src/app-config.json');
    // write some data with a base64 encoding
    writeStream1.write(JSON.stringify(src, null, 2), 'ascii');
    // the finish event is emitted when all data has been flushed from the stream
    writeStream1.on('finish', () => {
      console.log('updated src app-config version to : ', src.version);
    });
    // close the stream
    writeStream1.end();


    dist.version = pkg.version;
    const writeStream2 = fs.createWriteStream('./dist/app-config.json');
    // write some data with a base64 encoding
    writeStream2.write(JSON.stringify(dist, null, 2), 'ascii');
    // the finish event is emitted when all data has been flushed from the stream
    writeStream2.on('finish', () => {
      console.log('updated dist app-config version to : ', dist.version);
    });
    // close the stream
    writeStream2.end();

  }
}

const stampVersion = new StampVersion().go();

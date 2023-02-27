const fs = require('fs');
const path = require('path');
const util = require('util');
const mime = require('mime');
const glob = require('glob');
const globAsync = util.promisify(glob);
const azure = require('azure-storage');
const webp = require('webp-converter');

const azKey1 =
  'bQpo6tHbk4fogMV8jmWKgOgHeSRrjgXfWyYkFKyKG1lIEkssuQOIRcQFwRekO1tLo23ynWNYeVJlTYZ/UVmflw==';
const azKey2 =
  '9AZaU2A8MkfvUVqBCCGiGnWk4/ICxPLR6sEU7hVIeYcRBCeVmar9WrRs88wdT64Z10C+H7ARD7vI5Vo824fZnw==';

process.env.AZURE_STORAGE_ACCOUNT =
  process.env.AZURE_STORAGE_ACCOUNT || 'myntraweb';
process.env.AZURE_STORAGE_ACCESS_KEY =
  process.env.AZURE_STORAGE_ACCESS_KEY || azKey2;
process.env.UPLOAD_IMAGE = process.env.UPLOAD_IMAGE || false;
const containerName = process.env.AZURE_STORAGE_CONTAINER || 'www';

function createContainer(name) {
  const blobService = azure.createBlobService();
  const opts = {
    publicAccessLevel: 'blob'
  };
  blobService.createContainerIfNotExists(name, opts, function(
    error,
    result,
    response
  ) {
    console.log('[debug] createContainer', error, result, response);
  });
}
//createContainer('checkout');

async function convertImage(filePath) {
  const [name, extension] = filePath.split('.');
  if (extension !== 'webp') {
    const result = webp.cwebp(filePath, `${name}.webp`, '-q 90');
    return result.then(response => {
      fs.unlinkSync(filePath);
      return `${name}.webp`;
    });
  }

  return filePath;
}

async function uploadFile(filePath) {
  const blobService = azure.createBlobService();
  let fileName = path.basename(filePath);
  const contentType = mime.getType(filePath);
  let blobName;
  if ('application/javascript' === contentType)
    blobName = 'assets/js/' + fileName;
  else if ('text/css' === contentType) blobName = 'assets/css/' + fileName;
  else if (/font\//.test(contentType)) blobName = 'fonts/' + fileName;
  else if (/image\//.test(contentType)) {
    filePath = await convertImage(filePath);
    fileName = path.basename(filePath);
    blobName = 'assets/img/' + fileName;
  }
  const maxAge = 365 * 24 * 60 * 60;
  const options = {
    contentSettings: {
      contentType,
      cacheControl: 'max-age=' + maxAge + ', public'
    }
  };

  return new Promise((resolve, reject) => {
    blobService.doesBlobExist(containerName, blobName, function(error, result) {
      if (!error) {
        if (result.exists) {
          return reject('Already exists..');
        } else {
          blobService.createBlockBlobFromLocalFile(
            containerName,
            blobName,
            filePath,
            options,
            function(error, result, response) {
              if (error) return reject(error);
              const url = `https://constant.myntassets.com/${containerName}/${blobName}`;
              resolve(url);
            }
          );
        }
      } else {
        return reject('doesBlobExist error');
      }
    });
  });
}

async function pushBuild() {
  let assetsPath = '../public';
  if (process.env.UPLOAD_IMAGE === 'true') {
    assetsPath = '../images';
  }

  const dirPath = path.resolve(__dirname, assetsPath);
  const files = await globAsync(`${dirPath}/**/*.*`);

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const fileName = path.basename(file);
    const ignoreFiles = ['report.html'];
    if (ignoreFiles.indexOf(fileName) > -1) {
      break;
    }
    const url = await uploadFile(file).catch(err => {
      console.error('[FAILED]', file, '=======>', err);
    });
    if (url) console.log('[SUCCESS]', file, '=======>', url);
  }
}

(async function main() {
  await pushBuild();
})();

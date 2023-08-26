import formidable from "formidable";
import fs from "fs";
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file) => {
  try {
    const stream = fs.createReadStream(file[0].filepath);
    const options = {
      pinataMetadata: {
        name: file[0].originalFilename,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file[0].filepath);

    return response;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const newFormidable = new formidable();

      // const form = new formidable.IncomingForm();
      const form = formidable();
      form.parse(req, async function (err, fields, files) {
        if (err) {
          return res.status(500).send("Upload Error");
        }

        const response = await saveFile(files.file);
        console.log("RESPONSE: ", response);
        const { IpfsHash } = response;

        return res.send(IpfsHash);
      });
    } catch (e) {
      console.log("ERROR: ", e);
      res.status(500).send("Server Error");
    }
  } else if (req.method === "GET") {
    try {
      const response = await pinata.pinList(
        { pinataJWTKey: process.env.PINATA_JWT },
        {
          pageLimit: 1,
        }
      );
      res.json(response.rows[0]);
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }
}

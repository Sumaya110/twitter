import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
const mv = require('mv');

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleFileUpload = async (req, res) => {
  console.log("helooo")
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        // console.log(fields, files);
        // console.log(files.file.filepath);
        var oldPath = files.file.filepath;
       
        var newPath = `..../public/uploads/${files.file.originalFilename}`;
     
        mv(oldPath, newPath, function (err) {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleFileUpload;

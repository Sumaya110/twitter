import { IncomingForm } from 'formidable';
const mv = require('mv');

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleFileUpload = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        console.log(fields, files);
      
        var oldPath = files.file[0].filepath;
       
       
        var newPath = `./public/images/${files.file[0].originalFilename}`;
     
        mv(oldPath, newPath, function (err) {});
        res.status(200).json(`/images/${files.file[0].originalFilename}`);

      });
    });

 
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleFileUpload;
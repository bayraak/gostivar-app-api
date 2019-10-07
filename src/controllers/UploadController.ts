import { Request, Response } from "express";
import { S3 } from 'aws-sdk';

class UploadController {

    static uploadPostPhoto = async (req: Request, res: Response) => {
        const file = req.files[0];
        const s3 = new S3();
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: 'post-photos/' + new Date().getTime() + '-' + file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        

        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
              res.send(err).status(500);
            }
          
            //success
            if (data) {
                res.send(data);
            }
          });
    }
}

export default UploadController;
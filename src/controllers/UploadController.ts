import { Request, Response } from "express";
import { S3 } from 'aws-sdk';

class UploadController {

    static uploadPostPhoto = async (req: Request, res: Response) => {
        const files = req['files'];
        
        if (files && files.length) {
            const promises = [];
            files.forEach(file => {
                promises.push(UploadController.uploadFileToS3(file));
            });

            try {
                const response = await Promise.all(promises);
                return res.send(response.map(image => image.Location));
            } catch(err) {
                return res.send(err).status(500);
            }
        } else {
            return res.send('No file found').status(500);
        }
    }

    static uploadFileToS3 = async (file) => {
        const s3 = new S3();
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: 'post-photos/' + new Date().getTime() + '-' + file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        return s3.upload(params).promise();
    }

}

export default UploadController;
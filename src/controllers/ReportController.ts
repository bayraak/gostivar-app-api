import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { PostReport } from "../entity/PostReport";
import { plainToClass } from "class-transformer";
import { CreateReportRequest, ReportDTO, ReportFilterModel } from "../models/postReport";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

class ReportController {
    static getAll = async (req: Request, res: Response) => {
        const filter = req.query;
        const reportFilterModel = plainToClass(ReportFilterModel, filter, {excludeExtraneousValues: true});

        let query = {};

        if (reportFilterModel.postId) {
            query['postId'] = reportFilterModel.postId;
        }

        if (reportFilterModel.userId) {
            query['userId'] = reportFilterModel.userId;
        }

        const postReportPepository = getRepository(PostReport);
        const reports = await postReportPepository.find({
            relations: ['user', 'post'],
            where: query,
            order: {createdAt: 'DESC'},
            take: reportFilterModel.take,
            skip: reportFilterModel.skip
        });
        const reportsDTO = plainToClass(ReportDTO, reports, { excludeExtraneousValues: true });
        res.send(reportsDTO);
    };

    static createReport = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const body = req.body;
        const createReportRequest = plainToClass(CreateReportRequest, body, {excludeExtraneousValues: true});

        if (!createReportRequest.postId) {
            return res.status(400).send({err: 'postId is required'});
        }

        try {
            const userRepository = getRepository(User);
            const postRepository = getRepository(Post);
            const postReportPepository = getRepository(PostReport);

            const user = await userRepository.findOne(userId);
            const post = await postRepository.findOne(createReportRequest.postId);
            if (!post) {
                return res.status(404).send({err: `Post not found with id: ${createReportRequest.postId}`});
            }

            let report = new PostReport();
            report.reason = createReportRequest.reason;
            report.post = post;
            report.user = user;
            report = await postReportPepository.save(report);

            const reportDTO = plainToClass(ReportDTO, report, { excludeExtraneousValues: true });
            return res.send(reportDTO);
        } catch (err) {
            return res.status(500).send({err: `Error occured`});
        }
    };

    static getOneById = async (req: Request, res: Response) => {
        const reportId: number = req.params.id;

        if (!reportId) {
            return res.status(400).send({err: 'reportId is required'});
        }

        try {
            const postReportPepository = getRepository(PostReport);
            const report = await postReportPepository.findOne(reportId, {relations: ['user', 'post']});
            const reportDTO = plainToClass(ReportDTO, report, { excludeExtraneousValues: true });
            return res.send(reportDTO);
    
        } catch (err) {
            return res.status(500).send({err: `Error occured`});
        }
    };
}

export default ReportController;
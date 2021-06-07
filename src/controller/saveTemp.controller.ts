/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Delete, Get, Patch, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { SaveTempService } from "../service/saveTempService";
import { SetTime } from "../service/setIntervalSaveTemp";


@Controller('')
export class SaveTempController extends SaveTempService {
    @Get('cities/:city')
    async getSaveTemp(req: Request, res: Response) {
        try {
            const { city } = req.params
            const historic = await this.returnHistoric(city)
            return res.status(200).json(historic)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }

    @Post('cities/:city')
    async createHistoryCities(req: Request, res: Response) {
        try {
            const { city } = req.params
            const interval = await new SetTime().setTimeSaveTemp(city, new Date());
            if (interval) return res.status(400).json({ message: interval.message })
            return res.status(201).json({
                message: `A history of the city will be created ${city} within 30 hours, return to check after`
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }

    @Patch('cities/:city')
    async deleteHistoricFunction(req: Request, res: Response) {
        try {
            const { city } = req.params;
            const delHistoric = await this.deleteHistoric(city)
            return res.status(200).json(delHistoric)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    @Delete('cities/:city')
    async deleteHistoryCities(req: Request, res: Response) {
        try {
            const { city } = req.params;
            await this.deleteCities(city)
            return res.status(200).json({
                message: `Deleted register of the city ${city}`
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}
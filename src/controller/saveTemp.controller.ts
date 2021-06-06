/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { returnHistoric } from "../service/returnHistoric";
import { deleteCities, saveTemp } from "../service/saveTempService";
import { setTimeSaveTemp } from "../service/setIntervalSaveTemp";


@Controller('')
export class SaveTempController {
    @Get('cities/:city')
    async getSaveTemp(req: Request, res: Response) {
        try {
            const { city } = req.params
            const historic = await returnHistoric(city)
            return res.status(200).json(historic)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }

    @Post('')
    async postSaveTemp(req: Request, res: Response) {
        try {
            const temperature = await saveTemp(req.body)
            return res.status(201).json(temperature)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }

    }

    @Post('cities/:cities')
    async createHistoryCities(req: Request, res: Response) {
        try {
            const { cities } = req.params
            const interval = await setTimeSaveTemp(cities, new Date());
            if(interval) return res.status(400).json({ message: interval.message })
            return res.status(200).json({
                message: `A history of the city will be created ${cities} within 30 hours, return to check after`
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }

    @Delete('deleteAll/:cities')
    async deleteHistoryCities(req: Request, res: Response) {
        try {
            const { cities } = req.params;
            await deleteCities(cities)
            return res.status(200).json({
                message: `Deleted the history of the city of ${cities}`
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}
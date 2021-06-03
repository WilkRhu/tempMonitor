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
            const inter = await setTimeSaveTemp(cities, new Date());
            if (inter) {
                return res.status(200).json({
                    message: inter.message
                })
            }
            return res.status(400).json({
                message: 'Não foi possível criar o histórico'
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
                message: `Deletado o histórico da cidade de ${cities}`
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}
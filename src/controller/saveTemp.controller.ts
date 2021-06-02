import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { deleteCities, getAll, saveTemp } from "../service/saveTempService";
import { setTimeSaveTemp } from "../service/setIntervalSaveTemp";


@Controller('cities')
export class SaveTempController {
    @Get('')
    async getSaveTemp(req: Request, res: Response) {
        try {
            const temps = await getAll('saveTemp');
            console.log(temps)
            return res.status(200).json(temps[0])

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

    @Get('create/:cities')
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
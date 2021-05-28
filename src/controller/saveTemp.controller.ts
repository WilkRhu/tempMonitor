import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('cities')
export class SaveTempController {
    @Get('')
    public getSaveTemp(req: Request, res: Response): void {
        res.json({message: 'Hello Word!'})
    }
}
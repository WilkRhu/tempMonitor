import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import ViaCep from "../client/viaCep";
import { ViaCepService } from "../service/viaCepService";

@Controller('')
export class ViaCepController extends ViaCepService {
    @Post('cities/cep/:cep')
    async saveCep(req: Request, res: Response) {
        try {
            const { cep } = req.params;
            const client = await new ViaCep().viaCep(cep)
            if (client) {
                const save = await this.createViaCep(client)
                return res.status(201).json(save)
            }
            return res.status(400).json(client)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}
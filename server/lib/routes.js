import { Router } from 'express';
import { downloadCatalogoEpps } from './downloadControler';

export const downloadRouter = new Router();

downloadRouter.get('/epp/download', downloadCatalogoEpps);

downloadRouter.get('/maquinaria/download', downloadCatalogoEpps);

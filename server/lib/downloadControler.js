import path from 'path';

export const downloadCatalogoEpps = (req, res) => {
    const file = 'res/catalogoEpp.pdf';
    res.download(file); 
};
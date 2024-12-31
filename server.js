import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { config } from "dotenv";
import path from 'path';

config();

// Initialize
const prisma = new PrismaClient();
const port   = process.env.PORT || 4500;
const app    = express();
const __dirname = path.resolve(); 

app.use('/',express.static(path.join(__dirname, 'public')))
app.use(express.json());

// Jika Terkena Cors Unblock dengan Ini
app.use(
    cors({
        origin: "*",
    })
);

// Route Post
app.post("/kodepos", async (req,res) =>{
    const {kode_pos,nama_kelurahan,zona_waktu} = req.body;

    try{
        const kodepos = await prisma.kodepos.create({
            data:{kode_pos,nama_kelurahan,zona_waktu}
        });

        res.json(kodepos);
    }catch(error){
        res.status(500).json({Error: error.message});
    }

});

// Search 
app.get('/kodepos/search', async(req,res) => {
    const {query} = req.query;

    try{
     const results = await prisma.kodepos.findMany({
        where:{
            OR:[
                {
                    nama_kelurahan:{
                        contains: query,
                        mode:"insensitive",
                    }
                },
                {
                    kode_pos:{
                        contains: query,
                        mode:"insensitive",
                    },
                },
            ],
        }
     });
     res.status(200).json(results);

    }catch(error){
        res.status(500).json({error: "Kode Pos dan Kelurahan tidak di temukan"});
    }
})
// Server
app.listen(port, () => {
    console.info(`Server Berjalan di Port ${port}`)
})
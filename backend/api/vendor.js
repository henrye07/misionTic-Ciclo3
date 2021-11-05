const db = require('../models');
const router = require('express').Router();

router.get('/',async (req,res)=>{
    try {
        const vendors=await db.Vendor.findAll({
            include:['Ventas']
        });
        res.status(200).json(vendors);
    } catch (error) {
        res.status(400).send("No se pudieron obtener todos los usuarios...");
    }
});

router.get('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const vendors=await db.Vendor.findByPk(id,{
            include:['Ventas']
        });
        res.status(200).json(vendors);
    } catch (error) {
        res.status(400).send("No se pudieron obtener todos los usuarios...");
    }
});

router.post('/create',async (req,res)=>{
    
    try {
        const name= req.body.name
        const {dataValues}=await db.Vendor.create({
            name
        });
        const vendor = dataValues
        res.status(200).json({vendor,msg:"Creado con exito!"});
    } catch (error) {
        res.status(400).send("User couldn't create");
    }
    
});

router.put('/edit/:id',async (req,res)=>{
    try {
        const id=req.params.id
        const name=req.body.name
        await db.Vendor.update({
                name
        },{
            where:{id}
        });
        res.status(200).json({msg:'Vendor Update!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el Vendedor");
    }
});

router.delete('/delete/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        await db.Vendor.destroy({
            where:{id}
        })
        res.status(200).json({msg:'Vendedor Eliminado!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el Vendedor");
    }
});
module.exports=router;
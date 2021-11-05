const db = require('../models');
const router = require('express').Router();


router.post('/create',async (req,res)=>{
    try {
        console.log(req.body)
        const productID=Number(req.body.productID);
        const invoiceID=Number(req.body.invoiceID);
        const quantity=Number(req.body.quantity);
        const {dataValues}=await db.SaleDetails.create({
            invoiceID,
            productID,
            quantity
        });
        const order = dataValues
        res.status(200).json({order,msg:"Agregado a la Factura con exito!"});
    } catch (error) {
        res.status(400).json({error});
    }
    
});

router.put('/edit/:id',async (req,res)=>{
    try {
        const id= req.params.id;
        const productID=Number(req.body.productID);
        const invoiceID=Number(req.body.invoiceID);
        const quantity=Number(req.body.quantity);
        await db.SaleDetails.update({
            invoiceID,
            productID,
            quantity
        },{
            where:{id}
        });
        res.status(200).json({msg:"Producto Actualizada!"});
    } catch (error) {
        res.status(400).json({error});
    }
});

router.delete('/delete/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        await db.SaleDetails.destroy({
            where:{productID:id}
        })
        res.status(200).json({msg:'Producto Eliminado!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el usuario");
    }
});

module.exports=router;
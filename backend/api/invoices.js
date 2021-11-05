const db = require('../models');
const router = require('express').Router();

router.get('/',async (req,res)=>{
    try {
        const sales=await db.Invoice.findAll({
            include:['Vendedor','items']
        });
        const total= sales.map(sale=>{
            let Total=0;
            sale.items.forEach(product=>{
                return Total+=(product.price*product.SaleDetails.quantity)
            })
            return{...sale.dataValues,total:Total}
        })
        res.status(200).json(total);
    } catch (error) {
        res.status(400).json({error,msg:"No se pudieron obtener todos los usuarios..."});
    }
});

router.get('/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const sale=await db.Invoice.findOne({
            where:{id},
            include:['Vendedor','items']
        });
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json({error,msg:"No se pudieron obtener todos los usuarios..."});
    }
});

router.post('/create',async (req,res)=>{
    
    try {
        const {datos,items}=req.body;
        const name_customer=datos.name_customer;
        const id_customer=Number(datos.id_customer);
        const vendorID=Number(datos.vendorID);
        const {dataValues}=await db.Invoice.create({
            name_customer,
            id_customer,
            vendorID,
        },{
            include:['items']
        });
        const itemsCreate=items.map(product=>
            {return {...product,invoiceID:dataValues.id}}
            )
        await db.SaleDetails.bulkCreate(itemsCreate)
        const sale = dataValues
        res.status(200).json({sale,msg:"Creado con exito!"});
    } catch (error) {
        res.status(400).json({error});
    }
    
});

router.patch('/edit/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const name_customer=req.body.name_customer;
        const id_customer=req.body.id_customer;
        const vendorID=req.body.vendorID;
        const state=req.body.state;
        await db.Invoice.update({
            name_customer,
            id_customer,
            vendorID,
            state
        },{
            where:{id}
        });
        res.status(200).json({msg:'Sale Update!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el usuario");
    }
});

router.delete('/delete/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        await db.SaleDetails.destroy({
            where:{invoiceID:id}
        })
        await db.Invoice.destroy({
            where:{id}
        })
        res.status(200).json({msg:'Producto Eliminado!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el usuario");
    }
});

module.exports=router;
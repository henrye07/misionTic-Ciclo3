const db = require('../models');
const router = require('express').Router();

router.get('/',async (req,res)=>{
    try {
        const products=await db.Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).send("No se pudieron obtener todos los usuarios...");
    }
});

router.post('/create',async (req,res)=>{
    try {
        const product_name=req.body.product_name;
        const description=req.body.description?req.body.description:'';
        const price=Number(req.body.price)
        const quantity=Number(req.body.quantity);
        const state=req.body.state?req.body.state:false;
        const {dataValues}=await db.Product.create({
            product_name,
            description,
            price,
            quantity,
            state
        });
        const product = dataValues
        res.status(200).json({product,msg:"Creado con exito!"});
    } catch (error) {
        res.status(400).send("User couldn't create");
    }
    
});

router.get('/:id_product',async (req,res)=>{
    try {
        const id=req.params.id_product;
        const product=await db.Product.findByPk(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).send("No se pudo obtener el producto");
    }
});

router.get('/all/enable',async (req,res)=>{
    try {
        const products=await db.Product.findAll({
            where:{state:true}
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).send("No se pudo obtener el producto");
    }
});

router.put('/edit/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const product_name=req.body.product_name;
        const description=req.body.description?req.body.description:'';
        const price=Number(req.body.price)
        const quantity=Number(req.body.quantity);
        const state=req.body.state
        await db.Product.update({
            product_name,
            description,
            price,
            quantity,
            state
        },{
            where:{id}
        });
        res.status(200).json({msg:'Product Update!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el Producto");
    }
});

router.delete('/delete/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        await db.Product.destroy({
            where:{id}
        })
        res.status(200).json({msg:'Producto Eliminado!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el Producto");
    }
});

module.exports=router;
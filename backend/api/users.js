const db = require('../models');
const router = require('express').Router()


// * ALL USERS
router.get('/',async (req,res)=>{
    try {
        const users=await db.User.findAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send("No se pudieron obtener todos los usuarios...");
    }
});
// * USER SPECIFIC
router.get('/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const user=await db.User.findByPk(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({msg:false});
    }
});
// * CREATE OR FIND USER
router.post('/create',async (req,res)=>{
    try {
        const {email,name}=req.body
        const user= await db.User.findOne({where:{email}});
        if(!user){
            const {dataValue}=await db.User.create({
                email,
                name
            })
            const dataUser=dataValue;
            return res.status(200).json({user:dataUser});
        }
        else{
            return res.status(200).json({user})
        }
    } catch (error) {
        return res.status(400).send({error:'Invalid data'})
    }
});

// * UPDATE USER
router.put('/edit/:id',async (req,res)=>{
    try {
        const id= req.params.id;
        const name=req.body.name;
        const role=req.body.role?req.body.role:false;
        const state=req.body.state?req.body.state:0;
        await db.User.update({
            name,
            role,
            state
        },{
            where:{id}
        });
        if(role===1){
            await db.Vendor.create({
                name
            })
        }
        res.status(200).json({msg:'User Update!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el usuario");
    }
})

// * DELETE USER
router.delete('/delete/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const user=await db.User.findOne({where:{id}});
        await db.User.destroy({
            where:{id}
        });
        await db.Vendor.destroy({where:{name:user.name}})
        res.status(200).json({msg:'Usuario Eliminado!'});
    } catch (error) {
        res.status(400).send("No se pudo obtener el Usuario");
    }
})

module.exports=router;
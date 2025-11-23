import prisma from "@/lib/db";
import {generateSlug} from "random-word-slugs"
import { createTRPCRouter, PremiumProcedure, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const workflowRouter = createTRPCRouter({
    create:PremiumProcedure.mutation(({ctx})=>{
        return prisma.workFlow.create({
            data:{
                name:generateSlug(3),
                userId:ctx.auth.user.id
            }
            
        })
    }),
    
    remove: protectedProcedure.input(z.object({id:z.string()})).mutation(({ctx , input})=>{
        return prisma.workFlow.delete({
            where:{
                id:input.id,
                userId: ctx.auth.user.id
            }
        })
    }),

    updateName:protectedProcedure.input(z.object({id:z.string() , name:z.string().min(1)}))
    .mutation(({ctx , input})=>{
        return prisma.workFlow.update({
             where:{id:input.id , userId:ctx.auth.user.id}, 
             data:{name:input.name}
        })
       

    }),
    getone:protectedProcedure.input(z.object({id:z.string()})).query(({ctx , input})=>{
        return prisma.workFlow.findUnique({
            where:{id:input.id , userId:ctx.auth.user.id}
        })
    }),
    getmany:protectedProcedure.query(({ctx })=>{
        return prisma.workFlow.findMany({
            where:{ userId:ctx.auth.user.id}
        })
    })
})
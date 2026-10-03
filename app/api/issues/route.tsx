import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const CreateIssueSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().min(10, 'Description is required'),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = CreateIssueSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });

   const newIssue = await prisma.issue.create({
        data: {
            title: validation.data.title,
            description: validation.data.description,
        }
    });
    return NextResponse.json(newIssue, { status: 201 });
}
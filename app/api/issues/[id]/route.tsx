import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const issueId = Number(id);

  if (!Number.isInteger(issueId) || issueId <= 0) {
    return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 },
    );
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return NextResponse.json(updatedIssue);
};


export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const issueId = Number(id);


const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

   if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({});
}

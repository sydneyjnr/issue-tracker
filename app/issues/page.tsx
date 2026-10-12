import prisma from "@/prisma/client";
import { Link, Table } from "@radix-ui/themes";
import IssueActions from "./list/IssueActions";
import { IssueStatusBadge } from "../components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    orderBy?: string;
    page: string
  }>;
}) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  const { status, orderBy, page: pageParam } = await searchParams;

  const statuses = Object.values(Status);

  const validOrderBy: keyof Issue = columns.some(
    (column) => column.value === orderBy,
  )
    ? (orderBy as keyof Issue)
    : "createdAt";

  const validStatus = statuses.includes(status as Status)
    ? (status as Status)
    : undefined;

  const page = parseInt(pageParam) || 1;
  const pageSize = 10;


  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
    orderBy: {
      [validOrderBy]: "asc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where: {status: validStatus}});

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: {
                      ...(status ? { status } : {}),
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy && <ArrowUpIcon className="inline"/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Issue Tracter-Issue List',
  description: 'View all project issues'
};

export default IssuesPage;

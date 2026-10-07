"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const deleteIssue = async () => {
        try {
          await axios.delete(`/api/issues/${issueId}`);
          router.push("/issues");
          router.refresh();
        } catch (error) {
          console.error("Error deleting issue:", error);
        }
      };

  return (
    <Button
      color="red"
      onClick={deleteIssue}
    >
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;

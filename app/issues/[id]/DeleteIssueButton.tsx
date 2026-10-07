"use client";
import { Spinner } from "@/app/components";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteIssue = async () => {
    
        try {
            setIsDeleting(true);
          await axios.delete(`/api/issues/${issueId}`);
          router.push("/issues");
          router.refresh();
        } catch (error) {
            setIsDeleting(false);
          console.error("Error deleting issue:", error);
        }
      };

  return (
    <Button
      color="red"
      onClick={deleteIssue}
        disabled={isDeleting}
        
    >
      Delete Issue
     {isDeleting && <Spinner />}
    </Button>
  );
};

export default DeleteIssueButton;

import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { deleteTask } from "@/action/task";
import { toast } from "sonner";

const DeleteTask = ({
  taskId,
  startTransition,
}: {
  taskId: number;
  startTransition: React.TransitionStartFunction;
}) => {
  const removeTask = async () => {
    try {
      await deleteTask(taskId);
      toast.success("Success", {
        description: "Collection deleted successfully",
      });
    } catch (e) {
      toast.error("Error", {
        description: "Cannot delete collection",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your task.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(removeTask);
            }}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteTask;

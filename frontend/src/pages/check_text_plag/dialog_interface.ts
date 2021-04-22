import PlagiarisedFile from "./plagiarised_file";

interface OpenTextDialogProps {
  files: PlagiarisedFile[];
  isOpen: boolean;
  isLoading?: boolean;
  onClose?(): any;
}

export default OpenTextDialogProps;

interface OpenCodeDialogProps {
  files: string[];
  isOpen: boolean;
  isLoading?: boolean;
  responses: string[];
  onClose?(): any;
}

export default OpenCodeDialogProps;

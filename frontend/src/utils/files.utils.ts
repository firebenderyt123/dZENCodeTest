import { FileToSend } from "@/services/websocket/comments/interfaces/file-send.interface";

export function removeInvalidFiles(files: File[]): [File[], Set<string>] {
  const errors = new Set<string>();
  const newFilesArray = files.filter((file) => {
    switch (file.type) {
      case "image/jpeg":
      case "image/gif":
      case "image/png":
        if (file.size <= 5 * 1024 * 1024) return file; // 5 mb
        errors.add("Image file size should be less than or equal to 5 MB.");
        return;
      case "text/plain":
        if (file.size <= 100 * 1024) return file; // 100 kb
        errors.add("Text file size should be less than or equal to 100 KB.");
        return;
      default:
        errors.add(
          "Invalid file format. Only JPG, GIF, PNG, and TXT files are allowed."
        );
        return;
    }
  });
  return [newFilesArray, errors];
}

export async function createFilesToSend(files: File[]) {
  const filesToSend: FileToSend[] = [];
  for (const file of files) {
    filesToSend.push({
      name: file.name,
      buffer: await file.arrayBuffer(),
      size: file.size,
      type: file.type,
    });
  }
  return filesToSend;
}

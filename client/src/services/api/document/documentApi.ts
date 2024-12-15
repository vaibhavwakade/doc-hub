import { api } from "../axios";
export interface DocumentData {
  title: string;
  description: string;
  docType?: string;
  file?: File;
}
interface documentResponse {
  title: string;
  description: string;
  docType: string;
  fileUrl: string;
  expiryDate: string;
  author: string;
}

export const createDocument = async (
  data: DocumentData
): Promise<documentResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("docType", data.docType);
  formData.append("file", data.file);
  const response = await api.post("/api/v1/document/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const getUserDocumentsByType = async (docType: string) => {
  const response = await api.get(
    `/api/v1/document/user-documents?docType=${docType}`
  );
  return response.data.data;
};

export const updateDocument = async (
  documentId: string,
  data: DocumentData
) => {
  const response = await api.patch(
    `/api/v1/document/update/${documentId}`,
    data
  );
  return response.data.data;
};

export const deleteDocument = async (documentId: string) => {
  const response = await api.delete(`/api/v1/document/delete/${documentId}`);
  return response.data.data;
};

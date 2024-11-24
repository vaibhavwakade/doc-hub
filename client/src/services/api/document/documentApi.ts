import { api } from "../axios";
interface DocumentData {
  title: string;
  description: string;
  docType: string;
  file: File;
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
  const response = await api.post("/document/create", data);
  return response.data.data;
};

export const getUserDocumentsByType = async (docType: string) => {
  const response = await api.get(`/document/user-documents?docType=${docType}`);
  return response.data.data;
};

export const updateDocument = async (
  documentId: string,
  data: DocumentData
) => {
  const response = await api.patch(`/document/update/${documentId}`, data);
  return response.data.data;
};

export const deleteDocument = async (documentId: string) => {
  const response = await api.delete(`/document/delete/${documentId}`);
  return response.data.data;
};

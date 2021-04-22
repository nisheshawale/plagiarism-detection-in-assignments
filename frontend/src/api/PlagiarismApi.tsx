import axios from "axios";

const API_URL = "http://54.90.183.144:3100";
// const API_URL = "http://192.168.43.101:3100";

class PlagiarismApi {
  static requestHeaders() {
    return { "Content-Type": "application/json" };
  }
  static uploadText(formData: any) {
    return axios.post(`${API_URL}/uploadText`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  static uploadCode(formData: any) {
    return axios.post(`${API_URL}/uploadCode`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  static checkTextPlag() {
    return axios.get(`${API_URL}/checkTextPlag`);
  }

  static checkCodePlag() {
    return axios.get(`${API_URL}/checkCodePlag`);
  }

  static getCode(fileName: string) {
    return axios.get(`${API_URL}/getCode`, {
      params: {
        filename: fileName,
      },
    });
  }

  static getCodeNames() {
    return axios.get(`${API_URL}/getCodeNames`);
  }

  static getFile(fileName: string) {
    return axios.get(`${API_URL}/getFile`, {
      params: {
        filename: fileName,
      },
    });
  }

  static getFileNames() {
    return axios.get(`${API_URL}/getFileNames`);
  }
}

export default PlagiarismApi;

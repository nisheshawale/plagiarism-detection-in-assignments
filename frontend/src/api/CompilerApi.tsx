import HttpHelper from "./HttpHelper";

const API_URL = "https://fierce-sea-11103.herokuapp.com";
// const API_URL = "http://localhost:8080";

class CompilerApi {
  static requestHeaders() {
    return { "Content-Type": "application/json" };
  }

  static getTask(lang: string): Promise<any> {
    return HttpHelper.fetch(
      `${API_URL}/api/file/${lang}`,
      "GET",
      this.requestHeaders(),
      null
    );
  }

  static run(answer: any) {
    console.log(answer);
    return HttpHelper.fetch(
      `${API_URL}/api/run/`,
      "POST",
      this.requestHeaders(),
      JSON.stringify(answer)
    );
  }
}

export default CompilerApi;

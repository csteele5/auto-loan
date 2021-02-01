class PrequalifyService {
  async prequalifyLoan(application) {
    if (application.make === "ford") {
      return Promise.resolve({ application: application, result: "Qualified" });
    } else {
      return Promise.resolve({ application: application, result: "Rejected" });
    }
  }
}

export default new PrequalifyService();

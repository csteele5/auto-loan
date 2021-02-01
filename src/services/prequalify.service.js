class PrequalifyService {
  async prequalifyLoan(application) {
    let applicationQualified = true;

    if (application.creditscore < 600) {
      applicationQualified = false;
    }

    if (parseInt(application.price * 5) > parseInt(application.income)) {
      applicationQualified = false;
    }

    if (application.price >= 1000000) {
      return Promise.resolve({ result: "BAD REQUEST" });
    }

    if (applicationQualified === true) {
      return Promise.resolve({ application: application, result: "Qualified" });
    } else {
      return Promise.resolve({ application: application, result: "Rejected" });
    }
  }
}

export default new PrequalifyService();

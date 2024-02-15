import VerificationRepository from "../repositories/verificationRepository";


export const getVerification = async (query) => {

    // console.log("verify   :: ", query)

    try {
      const response = await VerificationRepository.findOne(query);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
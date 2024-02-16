import VerificationRepository from "../repositories/verificationRepository";

export const getVerification = async (query) => {
  try {
    const response = await VerificationRepository.findOne(query);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

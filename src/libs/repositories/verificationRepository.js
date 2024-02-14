import Verification from "../models/verificationModel";

const create = async (payload) => {
    const token = await Verification.create(payload);
    return token;
  };


  const findOne = async (payload) => {
    const token = await Verification.findOne(payload);
    return token;
  };

  const VerificationRepository = {
    create,  
  };
  
  export default VerificationRepository;
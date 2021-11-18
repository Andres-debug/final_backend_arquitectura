import Hospital from '../../../model/hospitals/index';

export default {
  hospitals: async () => await Hospital.find(),
  createHospital: async ({ hospital }, { user }, info) => {
    const { name,address, imgUrl } = vehicle;

    const hospitalExist = await Hospital.findOne({name});

    if (hospitalExist) {
      throw new Error("Hospital already exist ");
    }

    try {
      const newHospital = new Hospital(hospital);
      return await newHospital.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateHospital: async ({ hospital }, { user }, info) => {
    const { _id } = hospital;
    const hospitalExist = await Hospital.findById({ _id });
    if (!hospitalExist) {
      throw new Error("Hospital does not exist");
    }
    try {
      return await Hospital.findOneAndUpdate({ _id }, hospital, { new: true });
    } catch (error) {
      console.log(error);
    }
  },
  deleteVehicle: async ({ hospital }, { user }, info) => {
    const { _id } = hospital;

    const hospitalExist = await Hospital.findById({ _id });

    if (!hospitalExist) {
      throw new Error("Hospital does not exist");
    }

    try {
      await Hospital.findOneAndRemove({ _id }, hospital);
      return "Hospital removed";
    } catch (error) {
      console.log(error);
    }
  },
};

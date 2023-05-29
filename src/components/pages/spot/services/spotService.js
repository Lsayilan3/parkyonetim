import axios from "axios";

const apiUrl = "https://api.kapadokyadavet.com/api/spots";
const apiUrlCategory = "https://api.kapadokyadavet.com/api/spotCategoryies";

const SpotService = {
  getAllSpots: async () => {
    try {
      const response = await axios.get(apiUrl + "/getall");
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch spots");
    }
  },

  fetchAllCategories: async () => {
    try {
      const response = await axios.get(apiUrlCategory + "/getall");
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch categories");
    }
  },

  addSpot: async (newSpotData, selectedCategoryId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(apiUrl, {
        ...newSpotData,
        categoryId: selectedCategoryId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to add spot");
    }
  },

  deleteSpot: async (spotId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          spotId: spotId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete spot");
    }
  },

  updateSpot: async (updatedSpotData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(apiUrl, updatedSpotData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update spot");
    }
  },
};

export default SpotService;

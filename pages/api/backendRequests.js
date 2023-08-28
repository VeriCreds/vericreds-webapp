import axios from "axios";

const addNft = async (documentInfo) => {
  const token = window?.localStorage?.getItem('Token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: false,
  };

  return axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/nfts/`,
      {
        nft_id: documentInfo.nft_id,
        user_id: documentInfo.user_id,
        meta_data: "",
        contract_id: "",
        name: documentInfo.name,
        format: documentInfo.format,
        image: "",
        status: documentInfo.status,
        category: documentInfo.category,
        created_at: documentInfo.created_at
      },
      config
  )
      .then((response) => {
        console.log(response);
        // Return the response for a successful API call
        return {
          success: true,
          message: "Successfully added NFT!"  // You can customize this using the response if needed
        };
      })
      .catch((error) => {
        console.error("Axios error:", error.response ? error.response.data : error.message);
        // Return the error for a failed API call
        return {
          success: false,
          message: error.response ? error.response.data : "Error adding NFT!"
        };
      });
};

const getAllNfts = async () => {
  const token = window?.localStorage?.getItem('Token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: false,
  };

  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/nfts/`,
    config
  )
    .then((response) => {
      console.log(response);
      // Return the response for a successful API call
      return {
        success: true,
        message: "Successfully retrieved all NFTs!",  // You can customize this using the response if needed
        data: response.data.data
      };
    })
    .catch((error) => {
      console.error("Axios error:", error.response ? error.response.data : error.message);
      // Return the error for a failed API call
      return {
        success: false,
        message: error.response ? error.response.data : "Error retrieving NFTs!"
      };
    });

}

export { addNft, getAllNfts };

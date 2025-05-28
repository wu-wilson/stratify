import axios from "axios";

export const isUserRegistered = async (uid: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_DOMAIN}/accounts/exists/${uid}`
    );
    return response.data?.exists === true;
  } catch (error) {
    console.error(
      `Failed to check if user is registered: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return false;
  }
};

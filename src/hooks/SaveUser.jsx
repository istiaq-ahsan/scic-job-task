import axios from "axios";

const SaveUser = async (user) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
  });
};

export default SaveUser;

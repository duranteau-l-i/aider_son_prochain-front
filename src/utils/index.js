import jwt from 'jsonwebtoken';
import axios from 'axios';

export const decodedToken = token => {
  let id = 'null';
  let role = 'null';
  if (!token) {
    return { id, role };
  }

  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.message) {
        console.log(err.message);
        localStorage.clear();
      }
    }
    if (decoded !== undefined) {
      id = decoded._id;
      role = decoded.role;
    }
  });
  return { id, role };
};

// update avatar
export const updateAvatar = (event, role, token) => {
  event.preventDefault();
  let formData = null;
  if (event.target.files[0] !== '') {
    formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    formData.append('name', 'avatar');
    axios
      .post(`${process.env.REACT_APP_API_URL_DEV}/${role}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response.data);
        // const data = { user: { ...response.data.user }, token: token };
      })
      .catch(e => {
        console.log("Impossible d'enregistrer l'image", e);
      });
  }
};

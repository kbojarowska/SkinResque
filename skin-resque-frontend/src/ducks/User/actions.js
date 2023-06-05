import axios from 'axios';
import Cookies from 'js-cookie';
import types from './types';

const USER_URL = 'http://localhost:5000/users';
const PALETTE_URL = 'http://localhost:5000/palettes';

export const getUser = (userId, token) => {
	return (dispatch) => {
		return axios.get(`${USER_URL}/${userId}?token=${token}`).then((response) => {
			dispatch({ type: types.GET_USER_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: types.GET_USER_FAILURE, payload: error });
		});
	};
};

export const createUser = (user) => {
	return (dispatch) => {
		return axios.post(USER_URL, user)
			.then((response) => {
				dispatch({ type: types.CREATE_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: types.CREATE_USER_FAILURE, payload: error });
			});
	};
};

export const loginUser = (values, navigate) => {
	return (dispatch) => {
		return axios.post(`${USER_URL}/login`, values).then((response) => {
			if (response.data.passwordCorrect) {
				Cookies.set('username', values.username);
				Cookies.set('userId', response.data.id);
				Cookies.set('accessToken', response.data.access_token);
				navigate('/');
				return getUser(response.data.id,response.data.access_token)(dispatch);
			}
			alert('Wrong password provided.');
		}).catch((error) => {
			if (error.response.status === 400) {
				return alert('There is no user with given username.');
			}
			return alert('Something went wrong while logging in. Please try again.');
		});
	};
};

export const logoutUser = (navigate) => {
	return (dispatch) => {
		Cookies.remove('username');
		Cookies.remove('userId');
		Cookies.remove('accessToken');
		dispatch({ type: types.LOGOUT_USER_SUCCESS });
		navigate('/login');
	};
};

export const updateUser = (userId, token, toUpdate) => {
	return (dispatch) => {
		return axios.put(`${USER_URL}/${userId}?token=${token}`, toUpdate)
		.then(() => {
			alert('Succesfully updated user data');
			dispatch({ type: types.UPDATE_USER_SUCCESS, payload: toUpdate });
		})
		.catch((error) => {
			alert('Something went wrong while updating user data');
			dispatch({ type: types.UPDATE_USER_FAILURE, payload: error });
		});
	};
};

export const updateUserPassword = (userId, token, toUpdate) => {
	return (dispatch) => {
		return axios.patch(`${USER_URL}/${userId}/newPassword?token=${token}`, toUpdate)
		.then(() => {
			alert('Succesfully updated user data');
			dispatch({ type: types.UPDATE_USER_SUCCESS, payload: { password: toUpdate.password} });
		})
		.catch((error) => {
			alert('Something went wrong while updating user data');
			dispatch({ type: types.UPDATE_USER_FAILURE, payload: error });
		});
	};
}

export const deleteUser = (userId, token) => {
	return (dispatch) => {
		return axios.delete(`${USER_URL}/${userId}?token=${token}`).then(() => {
			dispatch({ type: types.DELETE_USER_SUCCESS });
		})
		.catch((error) => {
			dispatch({ type: types.DELETE_USER_FAILURE, payload: error });
		});
	};
};

export const getUserSavedCosmetics = (userId, token) => {
	return (dispatch) => {
		return axios.get(`${USER_URL}/${userId}/saved-cosmetics?token=${token}`).then((savedCosmetics) => {
			dispatch({ type: types.GET_SAVED_COSMETICS_SUCCESS, payload: savedCosmetics.data});
		}).catch((error) => {
			dispatch({ type: types.GET_SAVED_COSMETICS_FAILURE, payload: error});
		});
	};
};

export const getUserSavedPalettes = (userId, token) => {
	return (dispatch) => {
		return axios.get(`${USER_URL}/${userId}/saved-palettes?token=${token}`).then((savedCosmetics) => {
			dispatch({ type: types.GET_SAVED_PALETTES_SUCCESS, payload: savedCosmetics.data});
		}).catch((error) => {
			dispatch({ type: types.GET_SAVED_PALETTES_FAILURE, payload: error});
		});
	};
};

<<<<<<< HEAD
export const addCosmetic = (userId, cosmetic, token) => {
	return (dispatch) => {
		return axios.patch(`${USER_URL}/${userId}/cosmetics/${cosmetic._id}?token=${token}`).then(() => {
			dispatch({ type: types.ADD_COSMETIC_SUCCESS, payload: cosmetic });
=======
export const addCosmetic = (userId, cosmeticId, token) => {
	return (dispatch) => {
		return axios.patch(`${USER_URL}/${userId}/cosmetics/${cosmeticId}?token=${token}`).then(() => {
			dispatch({ type: types.ADD_COSMETIC_SUCCESS, payload: cosmeticId });
>>>>>>> a5dc027238178f2cf7f892619d202294f2fe86aa
		})
		.catch((error) => {
			dispatch({ type: types.ADD_COSMETIC_FAILURE, payload: error });
		});
	};
};

export const deleteCosmetic = (userId, cosmeticId, token) => {
	return (dispatch) => {
		return axios.delete(`${USER_URL}/${userId}/cosmetics/${cosmeticId}?token=${token}`).then(() => {
			dispatch({ type: types.DELETE_COSMETIC_SUCCESS, payload: cosmeticId });
		}).catch((error) => {
			dispatch({ type: types.DELETE_COSMETIC_FAILURE, payload: error });
		});
	};
};

export const addPalette = (userId, palette, token) => {
	return (dispatch) => {
		return axios.post(PALETTE_URL, palette).then((response) => {
			const paletteId = response.data[0]._id;
			axios.patch(`${USER_URL}/${userId}/palettes/${paletteId}?token=${token}`).then(() => {
				alert('Succesfully added palette');
				dispatch({ type: types.ADD_PALETTE_SUCCESS, payload: palette });
			}).catch((error) => {
				dispatch({ type: types.ADD_PALETTE_FAILURE, payload: error });
			})
		}).catch((error) => {
			alert('Error saving palette');
			dispatch({ type: types.ADD_PALETTE_FAILURE, payload: error });
		})
	};
};

export const deletePalette = (userId, paletteId, token) => {
	return (dispatch) => {
		return axios.delete(`${USER_URL}/${userId}/palettes/${paletteId}?token=${token}`).then(() => {
			dispatch({ type: types.DELETE_PALETTE_SUCCESS, payload: paletteId });
		}).catch((error) => {
			dispatch({ type: types.DELETE_PALETTE_FAILURE, payload: error });
		});
	};
};

export const deleteProfilePicture = (user) => {
	return (dispatch) => {
		return axios.delete(`${USER_URL}/profile-picture/${user._id}?token=${user.token}`)
		.then((response) => {
			window.location.reload();
			dispatch({ type: types.DELETE_PROFILE_PICTURE_SUCCESS, payload: response.data});
		})
		.catch((error) => {
			dispatch({ type: types.DELETE_PROFILE_PICTURE_FAILURE, payload: error });
		});
	};
};
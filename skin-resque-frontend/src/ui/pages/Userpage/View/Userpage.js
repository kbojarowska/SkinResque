import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Heading, Text } from '../../../components';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import { deleteProfilePicture, deleteCosmetic, deletePalette, getUserSavedCosmetics, getUserSavedPalettes } from '../../../../ducks/User/actions';
import '../Userpage.scss';
import { getSavedCosmetics, getSavedPalettes } from '../../../../ducks/User/selectors';

function withRouter(Component){
    function ComponentWithRouterProp(props){
        let params = useParams();
        return(
            <Component
                {...props}
                router={{ params }}
            />
        );
    }
    return ComponentWithRouterProp;
};

function Userpage({ savedCosmetics, savedPalettes, getUserSavedCosmetics, getUserSavedPalettes, deleteProfilePicture, deleteCosmetic, deletePalette }) {

	const navigate = useNavigate();
	const URL = 'http://localhost:5000';
	const [user, setUser] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);
	const [skinType, setSkinType] = useState(null);
	const [profilePictureChanged, setProfilePictureChanged] = useState(false);
	const token = Cookies.get('accessToken');

	useEffect(() => {
		const id = Cookies.get('userId');
		if (!id) {
			return navigate('/login');
		}
		const token = Cookies.get('accessToken');
		
		getUserSavedPalettes(id, token);
		getUserSavedCosmetics(id, token);

		axios.get(`${URL}/users/${id}?token=${token}`).then((response) => {
			setUser({ ...response.data, token: token });
			setProfilePicture(response.data.profile_picture);
			response.data.skin_type && setSkinType(response.data.skin_type);
		})
			.catch(() => {
				alert('Something went wrong while downloading user data.');
			});
	}, []);

	const readAsBinaryString = (e) => {
		const file = e.target.files[0];

		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onerror = (error) => {
				reject(error);
			};

			reader.onload = (e) => {
				resolve(e.target.result);
			};

			reader.readAsBinaryString(file);
		});
	}

	const handleFileChange = (e) => {
		if (e.target.files) {
			readAsBinaryString(e).then((binaryFile) => {
				const token = Cookies.get('accessToken');
				return axios.put(`${URL}/users/${user._id}?token=${token}`, { profilePicture: binaryFile }).then(() => {
					setProfilePictureChanged(!profilePictureChanged);
					window.location.reload();
				}).catch(() => {
					alert('Something went wrong while uploading profile picture');
				});
			});
		}
	};

	const cosmeticsList = savedCosmetics && savedCosmetics.map((cosmetic) => {
		return (
			<Link to={`/cosmetics/${cosmetic._id}`} key={cosmetic._id}>
				<div className='cosmetic' >
					<div className='bin'>
						<FiTrash2 onClick={() => deleteCosmetic(user._id, cosmetic._id, token)} />
					</div>
					<img src={cosmetic.photo} className='cosmetic-img' />
					<Text size='small'>{cosmetic.name}</Text>
				</div>
			</Link >
		)
	})
	

	const paletteList = savedPalettes && savedPalettes.map((palette) => {
		return (
			<div className='palette' key={palette._id}>
				<div className='bin'>
					<FiTrash2 onClick={() => deletePalette(user._id, palette._id, token)} />
				</div>
				<div className='color-container'>
					{palette.colors.map((color, index) => 
						<div className='palette-element' key={index} style={{ 'background-color': `#${color}` }}/>
					)}
				</div>
				<Text size='small'>{palette.name}</Text>
				<div className='edit'>
					<FiEdit3 />
				</div>
			</div>
		)
	})

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-user-profile.svg')` }}>
			<div className='beige-bg'>
				<Heading className='heading'>
					{user && user.name}
				</Heading>
				<div className='profile-info'>
					<div className='profile-img'>
						<div>
							{!profilePicture ? <div className='no-img' /> :
								<img src={`${URL}/upload/${user._id}.jpg`}></img>
							}
						</div>
						<div className='profile-picture-buttons show-on-hover'>
							<label htmlFor='file'><FiEdit3/></label>
							<FiTrash2 onClick={() => deleteProfilePicture(user)} display={!profilePicture && 'none'}/>
							<input id='file' type='file' accept='image/png, image/jpeg' onChange={handleFileChange} />
						</div>
					</div>
					<div className='outer'>
						<div className='row'>
							<Text>Skintype:</Text>
							{skinType == null ?
								<Text>Start test <Link to='/skintype-test' className='link'>here</Link></Text> :
								<Text>{skinType}</Text>
							}
						</div>
						<div className='row'>
							<Text>Saved palettes:</Text>
							<Text>{savedPalettes && savedPalettes.length}</Text>
						</div>
						<div className='row'>
							<Text>Saved cosmetics:</Text>
							<Text>{savedCosmetics && savedCosmetics.length}</Text>
						</div>

					</div>
				</div>
			</div>
			<div className='green-bg'>
				<Heading>Saved cosmetics:</Heading>
				{savedCosmetics && savedCosmetics.length > 0 ?
					<div className='container'>
						{cosmeticsList}
					</div> :
					<Heading size="x-large" style={{ color: "#5F8874" }} className="empty" >No cosmetics saved</Heading>
				}
			</div>
			<div className='beige-palette-bg'>
				<Heading>Saved palettes:</Heading>
				{savedPalettes && savedPalettes.length > 0 ?
					<div className='container'>
						{paletteList}
					</div> :
					<Heading size="x-large" style={{ color: "#F3B4C5" }} className="empty" >No palettes saved</Heading>
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state, props) => {
	return {
		savedCosmetics: getSavedCosmetics(state, props.router.params.userId),
		savedPalettes: getSavedPalettes(state, props.router.params.userId)
	};
}

const mapDispatchToProps = {
	getUserSavedCosmetics,
	getUserSavedPalettes,
	deleteProfilePicture,
	deleteCosmetic,
	deletePalette
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage));
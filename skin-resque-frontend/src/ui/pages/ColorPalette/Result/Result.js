import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { getUploadedImage, getUploadedPalettes, getUploadedSkinTone } from '../../../../ducks/UploadImage/selectors';
import { addPalette } from '../../../../ducks/User/actions';
import { getUser } from '../../../../ducks/User/selectors';
import { connect } from "react-redux";
import { Arrow, Heading, Modal } from "../../../components";
import './Result.scss';

function CollorPalletResults({ skin, palettes, image, addPalette, user }) {
	const id = Cookies.get('userId');
	const token = Cookies.get('accessToken');
	const [isOpen, setIsOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const handleNext = () => {
		setIndex(index => (index + 1) % palettes.length);
	  };
	
	  const handlePrev = () => {
		setIndex(index => (index - 1 + palettes.length) % palettes.length);
	  };

	return (
		<div className='page'>
			<div className='title'>
				<Heading className="heading">Color palette finder</Heading>
				<Heading size="large" className="justified">RESULTS</Heading>
			</div>
			<div className='results-container'>
				<div className='uploaded-photo'>
					<img src={image} alt="Uploaded image"/>
				</div>
				<div className='results-save'>
					<div className='results'>
					<Arrow left onClick={() => handlePrev()}/>
					<div className='color-palletes'>
						<div className='color-container'>
							<Heading>Your color</Heading>
							<div className='color' style={{ background: "#" + skin}}/>
						</div>
						<div className='palletes-container'>
							<Heading>Palletes</Heading>
							<ul className='palletes-list'>
								<li style={{ background: "#" + palettes[index][0]}} />
								<li style={{ background: "#" +palettes[index][1]}} />
								<li style={{ background: "#" +palettes[index][2]}} />
								<li style={{ background: "#" +palettes[index][3]}} />
							</ul>
						</div>
					</div>
					<Arrow right onClick={() => handleNext()}/>
					</div>
					{ Object.keys(user).length > 0 ? <div className='save' onClick={() => setIsOpen(true)}>
						<FiSave size={25}/>
					</div>: null}
					{isOpen && <Modal setIsOpen={setIsOpen} onSave={() => addPalette(id, {name: 'Summer', colors: [palettes[index][0], palettes[index][1], palettes[index][2], palettes[index][3]]}, token)}/>}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) =>{
    return{
        palettes: getUploadedPalettes(state),
		skin: getUploadedSkinTone(state),
		image: getUploadedImage(state),
		user: getUser(state)
    }
}

const mapDispatchToProps = {
	addPalette
}

export default connect(mapStateToProps, mapDispatchToProps)(CollorPalletResults);

import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { getUploadedImage, getUploadedPalettes } from '../../../../ducks/UploadImage/selectors';
import { connect } from "react-redux";
import { Arrow, Heading, Modal } from "../../../components";
import './Result.scss';

function CollorPalletResults({palettes, image}) {
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
							<div className='color' style={{ background: "#" + palettes[index].colors[0]}}/>
						</div>
						<div className='palletes-container'>
							<Heading>Palletes</Heading>
							<ul className='palletes-list'>
								<li style={{ background: "#" + palettes[index].colors[1]}} />
								<li style={{ background: "#" +palettes[index].colors[2]}} />
								<li style={{ background: "#" +palettes[index].colors[3]}} />
								<li style={{ background: "#" +palettes[index].colors[4]}} />
							</ul>
						</div>
					</div>
					<Arrow right onClick={() => handleNext()}/>
					</div>
					<div className='save' onClick={() => setIsOpen(true)}>
					<FiSave size={25}/>
					</div>
					{isOpen && <Modal setIsOpen={setIsOpen} />}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) =>{
    return{
        palettes: getUploadedPalettes(state),
		image: getUploadedImage(state)
    }
}

export default connect(mapStateToProps, null)(CollorPalletResults);

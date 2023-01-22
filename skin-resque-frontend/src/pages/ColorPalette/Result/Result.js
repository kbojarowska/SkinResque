import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { Arrow, Heading } from "../../../components";
import './Result.scss';

function CollorPalletResults() {
	const colorPallets = [
		['#5BDCE1', '#E73BA5', '#F4975B','#F9D8CE'],
		['#95d126', '#fade3d', 'f35b05', '#f595a9']
	]
	const [currentPallete, setCurrentPalette] = useState(colorPallets[0])

	return (
		<div className='page'>
			<div className='title'>
				<Heading className="heading">Color palette finder</Heading>
				<Heading size="large" className="justified">RESULTS</Heading>
			</div>
			<div className='results-container'>
				<div className='uploaded-photo'>
					<img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW4lMjBzbWlsaW5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80' />
				</div>
				<div className='results-save'>
					<div className='results'>
					<Arrow left onClick={() => setCurrentPalette(colorPallets[0])}/>
					<div className='color-palletes'>
						<div className='color-container'>
							<Heading>Your color</Heading>
							<div className='color' />
						</div>
						<div className='palletes-container'>
							<Heading>Palletes</Heading>
							<ul className='palletes-list'>
								<li style={{ background: currentPallete[0]}} />
								<li style={{ background: currentPallete[1]}} />
								<li style={{ background: currentPallete[2]}} />
								<li style={{ background: currentPallete[3]}} />
							</ul>
						</div>
					</div>
					<Arrow right onClick={() => setCurrentPalette(colorPallets[1])}/>
					</div>
					<div className='save'>
					<FiSave size={25}/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CollorPalletResults;
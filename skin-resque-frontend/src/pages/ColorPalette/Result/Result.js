import { Arrow, Heading } from "../../../components"
import './Result.scss'

function CollorPalletResults() {
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
				<div className='results'>
					<Arrow left />
					<div className='color-palletes'>
						<div className='color-container'>
							<Heading>Your color</Heading>
							<div className='color' />
						</div>
						<div className='palletes-container'>
							<Heading>Palletes</Heading>
							<ul className='palletes-list'>
								<li className='blue' />
								<li className='pink' />
								<li className='orange' />
								<li className='beige' />
							</ul>
						</div>
					</div>
					<Arrow right />
				</div>
			</div>
		</div>
	);
}

export default CollorPalletResults;
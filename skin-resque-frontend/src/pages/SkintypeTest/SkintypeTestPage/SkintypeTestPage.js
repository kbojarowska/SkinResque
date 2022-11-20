import Heading from '../../../components/Heading/Heading';
import './SkintypeTestPage.scss';
import Info from '../Info/Info';

function CosmeticsCatalogue() {

	return (
		<div className='skintype-test-page'>
			<div className='page-title'>
				<Heading size='large'>Skintype test</Heading>
			</div>
			<div className='pink' />
			<img src='/images/pink-spot.png' className='pink-spot'></img>
			<img src='/images/small-pink-dots.png' className='small-pink-dots'></img>
			<img src='/images/yellow-spot.png' className='yellow-spot'></img>
			<div className='skintype-test'>
				<Info />
			</div>
			<div className='white'>
			</div>
		</div>
	);
}

export default CosmeticsCatalogue;
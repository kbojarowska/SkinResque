import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';
import { Arrow, Heading, Text } from "../../../components"
import './Result.scss';

function Results() {

	const URL = 'http://localhost:5000';
	const skinTypes = {
		'dry': {
			'info': `Dry skin, or xerosis, is a common complaint that accounts for nearly half of all dermatologist visits. Dry skin can be a result of genetics or environmental factors. People with a dry skin may lack some of the natural moisturizing factors that help the skin retain water and may produces less sebum than other skin types. Sebum is the oil that builds a skin barrier that shields against environmental factors, such as temperature, dirt, and humidity.
			Women are more prone to dry skin than men, and all skin, regardless of type or ethnicity, gets dryer as it ages. Certain areas of the body are more prone to dry skin including the hands, arms, legs, palms, and soles of the feet.`
		},
		'mixed': {
			'info': `This skin type is characterized by non-uniform oil production: more active oil glands in the T-zone and less active oil glands elsewhere. Typically the oily area is the T-zone, which goes across the forehead and down the bridge of the nose to the tip of the chin. This is where you'll find sebaceous glands on the face, as well as bigger pores, which cause this area to be more oily`
		},
		'oily': {
			'info': `Oily skin type is caused by overactive sebaceous glands, producing too much sebum. Individuals with an oily skin type are more prone to certain skin blemishes and skin issues, especially acne.
			Like most skin types, oily skin is heavily influenced by genetics. However other factors such as hormonal changes (such as pregnancy or puberty,) stress, certain medications, diet, and choice of skincare products can contribute to oily skin. This skin type is more common in men than women and is more frequent during adolescence and young adulthood.`
		},
		'normal': {
			'info': `Normal skin, or eudermic skin, is well-balanced skin. Moisture content, sebum production, and other factors that affect the health of your skin are all within normal ranges.
			Normal skin is less likely to suffer from skin conditions and appears clear, radiant, and healthy. normal skin is more likely to occur in younger people.`
		}
	};

	const { skintype } = useParams();
	const skin = skinTypes[skintype];
	const [infoPage, setInfoPage] = useState(true);
	const [bestMatch, setBestMatch] = useState([]);

	useEffect(() => {
		axios.get(`${URL}/cosmetics?size=3&page=1&type=${skintype}`).then((response) => {
			setBestMatch(response.data);
		})
		.catch(() => {
			alert('Something went wrong while downloading cosmetic propositions.');
		})

	}, []);

	return (
		<div className='page'>
			<div className='title'>
				<Heading size='large' className='page-title'>Skintype test</Heading>
				<Heading className='results'>RESULTS</Heading>
			</div>
			<div className='results-container'>
				<div className='uploaded-photo'>
					<img src={`/images/skin-${skintype}.jpg`} className='img-skin'></img>
				</div>
				<div className='results-save'>
					<Heading className='title'>{skintype.toUpperCase()} SKIN</Heading>
					{infoPage ? <Text className='text'>{skin.info}</Text> :
						<div>
							<Heading size='small' className='sub-skin-type-text'>Natural cosmetics proposition</Heading>
							<div className='best-match'>
								{bestMatch.map((el) => {
									return (
										<div key={el.id} className='cosmetics-container-col'>
											<img className='cosmetics' src={el.photo}></img>
											<Text className='centered-div'>{el.name}</Text>
										</div>
									)
								})}
							</div>
						</div>
					}
					{infoPage ? null : <Link to={`/cosmetics/page/1?type=${skintype}`}><Text size='small' className='view-more'>View more <FiArrowRight style={{ position: 'relative', top: '2px' }} /></Text></Link>}
					{infoPage ? null : <Arrow className='arrow-left' left onClick={() => setInfoPage(!infoPage)} />}
					{infoPage ? <Arrow className='arrow-right' right onClick={() => setInfoPage(!infoPage)} /> : null}
				</div>
			</div>
		</div>
	);
}

export default Results;
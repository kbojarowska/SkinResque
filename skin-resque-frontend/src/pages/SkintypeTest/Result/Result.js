import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Arrow, Heading, Text } from "../../../components"
import './Result.scss';

function Results() {

    const skin = {
        'type': "dry skin",
        'info': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }

    const bestMatch = [
        {
            'id': 1,
            'name': 'rosemary cream',
            'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            'photo': '/images/cream.png',
        },
        {
            'id': 2,
            'name': 'thyme peeling',
            'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            'photo': '/images/blue-cream.png',
        },
        {
            'id': 3,
            'name': 'rose hydrolat',
            'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            'photo': '/images/pink-cream.png',
        }
    ]

    const [infoPage, setInfoPage ] = useState(true)

	return (
        <div className='page'>
            <div className='title'>
                <Heading size='large' className='page-title'>Skintype test</Heading>
                <Heading className='results'>RESULS</Heading>
            </div>
            <div className='results-container'>
                <div className='uploaded-photo'>
                    <img src='/images/skin.jpg' className='img-skin'></img>
                </div>
                <div className='results-save'>
                        <Heading className='title'>{skin.type.toUpperCase()}</Heading>
                    {infoPage ? <Text className='text'>{skin.info}</Text> :
                    <div>
                        <Heading size='small' className='sub-skin-type-text'>Natural cosmetics proposition</Heading>
                        {/* <img src='/images/shadow.png' className='shadow'></img> */}
                        <div className='best-match'>
                            {bestMatch.map((el)=>{
                                return(
                                <div key={el.id} className='cosmetics-container-col'>
                                    <img className='cosmetics' src={el.photo}></img>
                                    <Text className='centered-div'>{el.name}</Text>
                                </div>
                                )
                            })}
                        </div>
                        <Link to='/cosmetics/page/1'><Text size='small' className='view-more'>View more <FiArrowRight style={{position: 'relative', top: '2px'}}/></Text></Link>
                    </div>
                    }
                        {infoPage ? null : <Arrow className='arrow-left' left onClick={() => setInfoPage(!infoPage)}/>}
                       {infoPage ? <Arrow className='arrow-right' right onClick={() => setInfoPage(!infoPage)}/> : null}
                </div>
            </div>
        </div>
	);
}

export default Results;
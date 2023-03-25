import { Link } from 'react-router-dom';
import { Button, Heading, Text, UploadFile } from "../../../components"
import './Test.scss'

function Test() {
  return (
	<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
        <Heading className="heading">Color palette finder</Heading>
        <div className="beige-bg">
            <div className='info'>
                <Text className="txt">
                    When taking a photo of someones face, it is important to have them look directly into the camera. This will help to ensure that the persons features are properly visible. It is also important to have them smile slightly, as this will make the photo look more natural.
                    When taking a photo of someone with a darker skin tone, it is important to avoid taking photos in direct sunlight. The best time to take a photo is in the early morning or evening when the sun is not as bright. If taking a photo in direct sunlight is unavoidable, try to have the person stand in the shade. It is also important to use a flash if taking a photo indoors.
                </Text>
                <img src='/images/person.svg' alt="Person" />
            </div>
            <div className="btns">
                <UploadFile/>
                <div className='btn'>
                    <Button><Link to='/color-test/results'>Find it!</Link></Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Test
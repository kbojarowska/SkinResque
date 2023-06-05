import { Link } from 'react-router-dom';
import { Button, Heading, Text } from "../../components"
import './Info.scss'

function Info() {
  return (
	<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
    <Heading className="heading">Color palette finder</Heading>
      <div className="beige-bg">
        <Text className="txt">You dont know what color of clothes you should wear? Do you want to go wild doing your makeup? We will help you! Just this color pallete test!
        The color finder test is allows you to upload a photo of your skin in order to receive color palettes that match your skin color.
        We provide a list of colors that are said to be flattering for the your skin tone.
        </Text>
        <div className="btns">
          <Button><Link to='/color-test/test'>Try it!</Link></Button>
        </div>
      </div>
    </div>
  )
}

export default Info
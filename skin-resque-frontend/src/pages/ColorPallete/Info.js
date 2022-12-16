import { Link } from 'react-router-dom';
import { Button, Heading, Text } from "../../components"
import './Info.scss'

function Info() {
  return (
	<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
            <Heading className="heading">Color pallete finder</Heading>
        <div className="beige-bg">
            <Text className="txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <div className="btns">
                <Button><Link to='/color-test/try'>Example</Link></Button>
                <Button><Link to='/color-test/example'>Try it</Link></Button>
            </div>
        </div>
    </div>
  )
}

export default Info
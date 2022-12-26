import { Heading, Text } from '../../components';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import './Userpage.scss';

function Userpage() {
  const user ={
    name: "Username",
    skintype: 'Dry',
    savedPalette: [
      {
        'id': 1,
        'name': 'Summer vibes',
        'colors': ['#F9D8CE', '#E73BA5', '#F4975B', '#5BDCE1']
      },
      {
        'id': 2,
        'name': 'Summer vibes',
        'colors': ['#F9D8CE', '#E73BA5', '#F4975B', '#5BDCE1']
      },
    ],
    savedCosmetics: 
    [
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
        'name': 'rosemary cream',
        'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        'photo': '/images/cream.png',
      },
      {
        'id': 3,
        'name': 'rosemary cream',
        'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        'photo': '/images/cream.png',
      }
    ],
  }

  const cosmeticsList = user.savedCosmetics.map((cosmetic) => {
		return (
			<Link to={`/cosmetics/${cosmetic.id}`} key={cosmetic.id}>
				<div className='cosmetic' >
          <div className='bin'>
              <FiTrash2/>
          </div>
					<img src={cosmetic.photo} className='cosmetic-img'/>
					<Text size='small'>{cosmetic.name}</Text>
				</div>
			</Link >
		)
	})

  const paletteList = user.savedPalette.map((palette) => {
		return (
			<div className='palette' key={palette.id}>
        <div className='bin'>
          <FiTrash2/>
        </div>
        <div className='color-container'>
        {palette.colors.map((color, index) => (
            <div className='palette-element' key={index} style={{'background-color': color}}></div>
        ))}
        </div>
				<Text size='small'>{palette.name}</Text>
        <div className='edit'>
          <FiEdit3/>
        </div>
			</div>
		)
	})

  return (
    <div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-user-profile.svg')` }}>
      <div className='beige-bg'>
        <Heading className='heading'>{user.name}</Heading>
        <div className='profile-info'>
          <div className='profile-img'></div>
          <div className='outer'>
            <div className='row'>
              <Text>Skintype:</Text>
              {user.skintype == null ? 
                <Text>Start test <Link to='/skintype-test' className='link'>here</Link></Text>:
                <Text>{user.skintype}</Text>
              }
              
            </div>
            <div className='row'>
              <Text>Saved palette:</Text>
              <Text>{user.savedPalette.length}</Text>
            </div>
            <div className='row'>
              <Text>Saved cosmetics:</Text>
              <Text>{user.savedCosmetics.length}</Text>
            </div>
          </div>
        </div>
      </div>
      <div className='green-bg'>
        <Heading>Saved cosmetics:</Heading>
        {user.savedCosmetics.length > 0 ?
          <div className='container'>
            {cosmeticsList}
          </div>:
          <Heading size="x-large" style={{ color: "#5F8874"}} className="empty" >No cosmetics saved</Heading>
        }
      </div>
      <div className='beige-palette-bg'>
        <Heading>Saved palette:</Heading>
        {user.savedPalette.length > 0 ?
          <div className='container'>
            {paletteList}
          </div>:
          <Heading size="x-large" style={{ color: "#F3B4C5"}} className="empty" >No palette saved</Heading>
        }
      </div>
    </div>
  )
}

export default Userpage
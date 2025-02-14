import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Navbar from '../common/Navbar'
import { UserData } from '../../models/UserData'
import Submitbtn from '../common/Submitbtn'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux-store/hooks'
import { setSubmitBtnLoading } from '../../redux-store/slices/loadingSlice'
import { getUserDetails } from '../../api-services/user/userDetailsApi'
import { UserDetails } from '../../models/UserDetails'
import { logoutUser } from '../../api-services/auth/logoutApi'

interface Props{
    darkTheme: boolean,
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>,
    handleTheme: () => void
}

const Profile = ({darkTheme, setDarkTheme, handleTheme}:Props) => {

  const [userData, setUserData] = useState((): UserData | null => {
    const userDataString = localStorage.getItem('user')
    let userData: UserData | null = userDataString ? JSON.parse(userDataString) : null
    return userData;
  })

  const [userDetails,setUserDetails] = useState<UserDetails | null>({profile:{
    address: "NA",
    city: "NA",
    country: "NA",
    image: "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png",
    profession: "NA"
}})

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [])

  let navigate = useNavigate()
  let dispatch = useAppDispatch()

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{
      await logoutUser()

      sessionStorage.removeItem('accessToken')
      localStorage.removeItem('user')

      dispatch(setSubmitBtnLoading(false))
      navigate('/login')
    }
    catch(error){
      console.log("something went wrong.");
    }
    
  }

  return (
    <div>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} handleTheme={handleTheme} />
      <Container className='mt-3 px-5'>
      <Row>
        <Col md='6'>
            <Card className="mb-4 text-center">
              <Card.Header>
                <h4>My Profile Details</h4>
              </Card.Header>
              <Card.Body>
                <img src={userDetails?.profile.image} alt="avatar"
                  className="rounded-circle img-fluid" style={{ width: '150px' }} />
                <h5 className="my-3">{userData?.name}</h5>
                <p className="mb-1">{userData?.email}</p>
                <p className="mb-1">{userDetails?.profile.profession}</p>
                <p className="mb-4">{userDetails?.profile.address + ", " + userDetails?.profile.city + ", " + userDetails?.profile.country}</p>
                <Form onSubmit={handleLogout}>
                <Submitbtn name='Log out' variant='danger'/>
                </Form>
              </Card.Body>
            </Card>
        </Col>
        <Col md='6'>
        
        </Col>
      </Row>
      </Container>
    </div>
  )
}

export default Profile

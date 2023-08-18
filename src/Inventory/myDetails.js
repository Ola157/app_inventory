import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiRightArrow } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyDetails = ({ handle_Changes, handleMyDetails, handleUserLogged }) => {
    let [email, setEmail] = useState('')
    let [conEmail, setConEmail] = useState('')
    let [epassword, setEpassword] = useState('');
    let [newPassword, setNpassword] = useState('')
    let [conPassword, setConpassword] = useState('')
    let [alterNumber, setAltNumber] = useState('')
    let [inputErrStyle, setIES] = useState({})
    const navigate = useNavigate()
    let myDetails = useSelector(state => state.personalDetails)
    let [title, setTitle] = useState(myDetails.title)
    let [firstName, setFirstName] = useState(myDetails.firstName)
    let [lastName, setlastName] = useState(myDetails.lastName)
    let [mobNumber, SetmobNumber] = useState(myDetails.mobNumber)
    let style = {
        errorStyle: { border: '2px solid red' },
        save: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', width: '70%', borderRadius: '2px', border: 'none' },
        cancel: { color: 'white', backgroundColor: 'gray', width: '70%', border: 'none', fontWeight: 'bold', borderRadius: '2px' },
        address: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', borderRadius: '2px', border: 'none' }

    }

    let userLogged = useSelector(state => state.userLoggedIn)

    useEffect(() => {
        if (!myDetails) {
            handleMyDetails();
        }

        if (!userLogged) {
            navigate('/signup')
        }
    }, [userLogged, myDetails]);

    const handleChanges = () => {
        if (epassword && email === conEmail && newPassword === conPassword && alterNumber) {
            handle_Changes({ any: 'details', title, firstName, lastName, email, epassword, newPassword, mobNumber, alterNumber })
            setAltNumber('')
            setConpassword('')
            setConEmail('')
            setNpassword('')
            setEpassword('')
            setEmail('')
        }
        else {
            setIES({ ...inputErrStyle, errorStyle: style.errorStyle })
            setTimeout(() => { setIES({}) }, 2000)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
        navigate('/')
    }

    return (<Container fluid className='display pb-5'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end text-white px-4'>

                {userLogged && (
                    <button className='border-0 bg-transparent d-flex justify-content-end align-items-center mx-1' onClick={() => navigate("/useraccount")}>
                        <BiUserCircle style={{ color: 'black' }} />
                        <span style={{ fontWeight: 'bold' }} className='text-black navaccount m-1'>My account</span>
                    </button>
                )}

                <button
                    className='border-0 bg-transparent navaccount text-black d-flex justify-content-center align-items-center me-2 mx-1'
                    onClick={userLogged ? () => handleLogout() : () => navigate("/signIn")}
                    style={{ fontWeight: 'bold' }}
                >
                    {userLogged ? 'Logout' : 'Login/register'}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                <button className='border-0 bg-transparent' onClick={() => navigate('/')}>
                    <h2 style={{ color: 'blueviolet' }}>Express</h2>
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='p-0 mx-3 my-1' lg={2} md={2} sm={2} xs={2}>
                <button onClick={() => navigate('/useraccount')} className='p-0 border-0 my-1 mx-0 me-0 bg-transparent' style={{ fontSize: '1.3em' }}><PiArrowSquareLeftFill className='my-0 mx-1 me-0 p-0' /><span className='backBtn'>My Account</span></button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>

            <Col className='text-center' lg={5} md={6} sm={12} xs={12}>
                <span className='personal_Address'>Personal details</span>
                <p className='text-start'>Here's where you can view, update or add to your personal account details.</p>

                <p className='text-start'> To keep your details secure, we'll ask for your password whenever you make any changes.</p>
            </Col>
        </Row >

        <Row className='d-flex justify-content-center'>
            <Col className='bg-white d-flex justify-content-center py-3 my-5' lg={10} md={10} sm={12} xs={12}>
                <Col lg={4} md={4} sm={12} xs={12}>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor="title">Title</label>

                        <select onChange={(event) => setTitle(event.target.value)} value={title} name="title" id="title" style={{ width: '40%' }} className='personalInput'>
                            <option value="Mx">Mx</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Mr">Mr</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                            <option value="Capt">Capt</option>
                            <option value="Sir">Sir</option>
                        </select>
                    </div>


                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='firstName'>First Name</label>
                        <input style={inputErrStyle.errorStyle} value={firstName} onInput={(event) => setFirstName(event.target.value)} id='firstName' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='lastName'>Last Name</label>
                        <input style={inputErrStyle.errorStyle} value={lastName} onInput={(event) => setlastName(event.target.value)} id='lastName' className='w-100 personalInput' />
                    </div>

                    <div className='my-4'>
                        <span className='d-block dlabel'>Existing email address</span>
                        <span className='d-block'> {myDetails.email}</span>
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='email'>Email Address</label>
                        <input style={inputErrStyle.errorStyle} type='email' onInput={(event) => setEmail(event.target.value)} id='email' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='conemail'>Confrim Email Address</label>
                        <input style={inputErrStyle.errorStyle} type='email' onInput={(event) => setConEmail(event.target.value)} id='conemail' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='epassword'>Existing password <span style={{ fontWeight: 'lighter' }}>(required for changes)</span></label>
                        <input style={inputErrStyle.errorStyle} type='password' onInput={(event) => setEpassword(event.target.value)} id='epassword' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='npassword'>New Password</label>
                        <input style={inputErrStyle.errorStyle} type='password' onInput={(event) => setNpassword(event.target.value)} id='npassword' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='conpassword'>Confrim New Password</label>
                        <input style={inputErrStyle.errorStyle} type='password' onInput={(event) => setConpassword(event.target.value)} id='conpassword' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='mobNumber'>Mobile Number</label>
                        <input style={inputErrStyle.errorStyle} value={`+44 ${mobNumber}`} onInput={(event) => SetmobNumber(event.target.value)} id='mobNumber' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='altNum'>Alternate Number<span style={{ fontWeight: 'lighter' }}>(optional)</span></label>
                        <input style={inputErrStyle.errorStyle} onInput={(event) => setAltNumber(event.target.value)} id='altNum' className='w-100 personalInput' />
                    </div>

                    <div className='my-3 text-center'>
                        <button className='py-1' style={style.save} onClick={() => handleChanges()}>Save</button>
                    </div>

                    <div className='my-3 text-center'>
                        <button className='py-1' style={style.cancel} onClick={() => navigate('/useraccount')}>Cancel changes</button>
                    </div>
                </Col>
            </Col>
        </Row>
    </Container >)
}
export default MyDetails
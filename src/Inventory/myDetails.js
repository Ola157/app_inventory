import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyDetails = ({ handleUpdateUser, handlePersonalDetails, handleNavigation }) => {
    let [email, setEmail] = useState('')
    let [confirmEmail, setConfirmEmail] = useState('')
    let [existingPassword, setExistingPassword] = useState('');
    let [newPassword, setNewpassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    const myDetails = useSelector(state => state.personalDetails)
    let [title, setTitle] = useState(myDetails.title)
    let [firstName, setFirstName] = useState(myDetails.firstName)
    let [lastName, setLastName] = useState(myDetails.lastName)
    let [mobileNumber, SetMobileNumber] = useState(`+44 ${myDetails.mobileNumber} `)
    let [alternativeNumber, setAlternativeNumber] = useState(`+44 ${myDetails.alternativeNumber} `)

    useEffect(() => {
        handlePersonalDetails();
    }, []);

    const handleChanges = () => {
        if (existingPassword && email === confirmEmail && newPassword === confirmPassword) {
            handleUpdateUser({ title, firstName, lastName, email, existingPassword, newPassword, mobileNumber, alternativeNumber })
            setAlternativeNumber('')
            setConfirmPassword('')
            setConfirmEmail('')
            setNewpassword('')
            setExistingPassword('')
            setEmail('')
        }
    }

    return (<Container fluid className='inventory'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                <button className='trolley-title-btn' onClick={() => handleNavigation('/')}>
                    Express
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/useraccount')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>My Account</span>
                </button>
            </Col>
        </Row>

        <Row className='centered-row'>
            <Col className='centered-text' lg={5} md={6} sm={12} xs={12}>
                <span className='header-title'>Personal Information</span>
                <p className='info-text'>Review and modify your personal account details here.</p>
                <p className='info-text'>For security, we'll require your password to confirm any modifications.</p>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col className='bg-white d-flex justify-content-center py-3 my-5' lg={10} md={10} sm={12} xs={12}>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <div className='input-section'>
                        <label className='d-block my-2 mx-1 input-label' htmlFor="title">Title</label>
                        <select onChange={(event) => setTitle(event.target.value)} value={title} name="title" id="title" style={{ width: '40%' }} className='personalInput'>
                            <option value="">Select</option>
                            <option value="Mx">Mx</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Mr">Mr</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                            <option value="Capt">Capt</option>
                            <option value="Sir">Sir</option>
                        </select>
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='firstName'>First Name</label>
                        <input value={firstName} onInput={(event) => setFirstName(event.target.value)} id='firstName' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='lastName'>Last Name</label>
                        <input value={lastName} onInput={(event) => setLastName(event.target.value)} id='lastName' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <span className='input-label'>Existing email address</span>
                        <span className='d-block'>{myDetails.email}</span>
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='email'>Email Address</label>
                        <input value={email} type='email' onInput={(event) => setEmail(event.target.value)} id='email' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='confirmEmail'>Confrim Email Address</label>
                        <input type='email' value={confirmEmail} onInput={(event) => setConfirmEmail(event.target.value)} id='confirmEmail' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='existingPassword'>Existing password <span style={{ fontWeight: 'lighter' }}>(required for changes)</span></label>
                        <input type='password' value={existingPassword} onInput={(event) => setExistingPassword(event.target.value)} id='existingPassword' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='npassword'>New Password</label>
                        <input type='password' value={newPassword} onInput={(event) => setNewpassword(event.target.value)} id='npassword' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='confirmPassword'>Confrim New Password</label>
                        <input type='password' value={confirmPassword} onInput={(event) => setConfirmPassword(event.target.value)} id='confirmPassword' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='mobileNumber'>Mobile Number</label>
                        <input value={mobileNumber} onInput={(event) => SetMobileNumber(event.target.value)} id='mobileNumber' className='w-100 personalInput' />
                    </div>

                    <div className='input-section'>
                        <label className='input-label' htmlFor='altNum'>Alternate Number<span style={{ fontWeight: 'lighter' }}>(optional)</span></label>
                        <input value={alternativeNumber} onInput={(event) => setAlternativeNumber(event.target.value)} id='altNum' className='w-100 personalInput' />
                    </div>

                    <div className='centered-button-section'>
                        <button className='action-button save-button' onClick={() => handleChanges()}>Save</button>
                    </div>

                    <div className='centered-button-section'>
                        <button className='action-button cancel-button' onClick={() => handleNavigation('/useraccount')}>Cancel</button>
                    </div>
                </Col>
            </Col>
        </Row>
        <footer className="inventory__footer">
            <Container>
                <Row>
                    <Col lg={12} className='text-center'>
                        <p className="inventory__footer-text">
                            &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container >)
}
export default MyDetails
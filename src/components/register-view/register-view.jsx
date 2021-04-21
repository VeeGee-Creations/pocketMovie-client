import React, {useState} from 'react';
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';

export default function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(true);
        console.log(username, email, password, birthday);
    };

    return (
        <form>
            <div>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Birthday:
                    <input type="date" placeholder="dd/mm/yyyy" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                </label>
            </div>
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    )
}

RegisterView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: emailPropType.isRequired,
        password: PropTypes.string.isRequired,
        birthday: PropTypes.instanceOf(Date).isRequired
    }),
    onRegister: PropTypes.func.isRequired
};
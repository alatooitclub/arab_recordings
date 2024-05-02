import React, { useState } from 'react';
import axios from 'axios';

const DelateAdminExpert = ({classes}) => {
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    const handleInputChange = (e) => {
        setIdentifier(e.target.value);
    };

    const deleteUserRoles = async () => {
        try {
        const response = await axios.put(`/users/${identifier}`);
        setUser(response.data.user);
        setMessage(response.data.message);
        } catch (error) {
        setMessage('The role had not delated because of the error');
        }
    };
    return ( 
        <div className={classes.section_content}>
            <h1 className={classes.title}>Delete role</h1>
            <div className={classes.form}>
                <div className={classes.word_info}>
                    <input
                        type="text"
                        placeholder="Enter nickname or e-mail"
                        value={identifier}
                        onChange={handleInputChange}
                    />
                    <button onClick={deleteUserRoles}>Delete role</button>
                </div>
                <div>
                    {message && <p>{message}</p>}
                    {user && (
                        <div>
                            <h2>User info:</h2>
                            <p>nickname: {user.username}</p>
                            <p>e-mail: {user.email}</p>
                            <p>role: {user.roles.join(', ')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default DelateAdminExpert;

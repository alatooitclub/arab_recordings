import React from 'react';
import classes from './SuperAdmin.module.css';
import AddWord from './AddWord';
import RegistAdminExpert from './RegistAdminExpert';
import DelateAdminExpert from './/DelateAdminExpert';
import ListenWords from './ListenWords/ListenWords';


const SuperAdmin = () => {
    

    return ( 
        <div className={classes.SuperAdmin}>
            <RegistAdminExpert classes={classes} />
            <AddWord  classes={classes} />
            <DelateAdminExpert classes={classes} />
            
        </div>
     );
}
 
export default SuperAdmin;
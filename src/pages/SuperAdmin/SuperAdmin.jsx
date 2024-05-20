import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './SuperAdmin.module.css';
import DelateSA from './components/DelateSA/DelateSA';
import GiveRole from './components/GiveRole/GiveRole';
import AddWord from './components/AddWord/AddWord';
import RatingWords from './components/RatingWords/RatingWords';
import { TotalCorrectRecordings } from './components/Statistics/TotalCorrectRecordings/TotalCorrectRecordings';
import { TotalWords } from './components/Statistics/TotalWords/TotalWords';
import { TasksProgress } from './components/Statistics/TotalProgress/TaskProgress';
import { TotalCustomers } from './components/Statistics/TotalCustomers/TotalCustomers';
import AudioDownloader from './components/AudionDownload/AudioDownload';


const SuperAdmin = () => {
    const [stats, setStats] = useState({
        customers: {},
        taskProgress: {},
        totalWords: {},
        correctRecordings: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://your-api-url.com/stats'); 
                setStats({
                    customers: response.data.customers,
                    taskProgress: response.data.taskProgress,
                    totalWords: response.data.totalWords,
                    correctRecordings: response.data.correctRecordings
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    

    return ( 
        <div className={classes.SAdmin}>
            <div className={classes.formContainer}>
                <AddWord />
                <GiveRole />
                <DelateSA />
            </div>
            <div>
                <RatingWords />
            </div>
            <div className={classes.statsContainer}>
                <TotalCustomers data={stats.customers} />
                <TasksProgress data={stats.taskProgress} />
                <TotalWords data={stats.totalWords} />
                <TotalCorrectRecordings data={stats.correctRecordings} />
            </div>
        </div>
     );
}
 
export default SuperAdmin;